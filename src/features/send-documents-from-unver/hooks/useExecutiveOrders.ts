import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { ROUTE_DASHBOARD, ROUTE_SEND_FROM_UNIVER } from "../../../common/constants";
import { ENDPOINT_SEND_DOCS_FROM_UNVER } from "../endpoints";
import { ISendDoc } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";

import { onSendDoc } from "../thunks";
import { formSchema } from "../schema";

export const useExecutiveOrders = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: ISendDoc = {
        sent_place: '',
        number: '',
        summary: '',
        file_name: '',
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<ISendDoc>({
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

    const onSubmit = (values: ISendDoc) => {
        setIsLoading(true);
        console.log(values);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onSendDoc({ values: values, route: `${ENDPOINT_SEND_DOCS_FROM_UNVER}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_SEND_FROM_UNIVER}`)
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onSendDoc({ values: values, route: `${ENDPOINT_SEND_DOCS_FROM_UNVER}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_SEND_FROM_UNIVER}`)
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



