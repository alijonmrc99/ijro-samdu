import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onInnerAppeals } from "../thunks";
import { ROUTE_APPEAL, ROUTE_DASHBOARD } from "../../../common/constants";
import { ENDPOINT_INNER_APPEAL } from "../endpoints";
import { IAppeals } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../schema";

export const useInnerAppeals = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IAppeals = {
        accepted_date_and_index: '',
        given_date: '',
        performed_sign: '',
        creator: '',
        title_or_summary: '',
        resolution: '',
        performer_and_date: '',
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IAppeals>({
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    })



    const [messageApi, contextHolder] = message.useMessage();

    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.response?.data?.message || "Error message for user",
        })
    };

    const onSubmit = (values: IAppeals) => {
        setIsLoading(true);
        console.log(values);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onInnerAppeals({ values: values, route: `${ENDPOINT_INNER_APPEAL}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_APPEAL}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onInnerAppeals({ values: values, route: `${ENDPOINT_INNER_APPEAL}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_APPEAL}`)
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
    };

    const handleReset = () => reset(defaultValues)


    const handleTrip = handleSubmit(onSubmit);

    return { control, register, setValue, errors, handleReset, isLoading, handleTrip, contextHolder, getValues };

};



