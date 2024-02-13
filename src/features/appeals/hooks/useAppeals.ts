import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onAppeals } from "../thunks";
import { ROUTE_APPEAL, ROUTE_DASHBOARD } from "../../../common/constants";
import { ENDPOINT_APPEAL } from "../endpoints";
import { IAppeals } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../schema";

export const useExecutiveOrders = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IAppeals = {
        performer_and_given_date: '',
        hand_over_date: '',
        executed_sign: '',
        creator: '',
        title_or_summary: '',
        resolution: '',
        index_and_created_at: '',
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
            dispatch(onAppeals({ values: values, route: `${ENDPOINT_APPEAL}/${values.id}` })).unwrap()
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
            dispatch(onAppeals({ values: values, route: `${ENDPOINT_APPEAL}` })).unwrap()
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



