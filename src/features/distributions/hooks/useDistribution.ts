import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onDistributions } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_DISTRIBUTION } from "../../../common/constants";
import { ENDPOINT_DISTRIBUTION } from "../endpoints";
import { IDistribution } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../schema";

export const useDistribution = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IDistribution = {
        date: '',
        structure: '',
        applicant: '',
        recipent: '',
        file_name: '',
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IDistribution>({
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

    const onSubmit = (values: IDistribution) => {
        setIsLoading(true);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onDistributions({ values: values, route: `${ENDPOINT_DISTRIBUTION}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DISTRIBUTION}`)
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onDistributions({ values: values, route: `${ENDPOINT_DISTRIBUTION}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DISTRIBUTION}`)
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



