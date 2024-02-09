import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onExecutiveOrders } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_EXECUTIVE_ORDER } from "../../../common/constants";
import { ENDPOINT_EXECUTIVE_ORDERS } from "../endpoints";
import { IExecutiveOrders } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../schema";

export const useExecutiveOrders = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IExecutiveOrders = {
        date: '',
        number: '',
        summary: '',
        owner: '',
        executor: '',
        file_name: '',
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IExecutiveOrders>({
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

    const onSubmit = (values: IExecutiveOrders) => {
        setIsLoading(true);
        console.log(values);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onExecutiveOrders({ values: values, route: `${ENDPOINT_EXECUTIVE_ORDERS}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_EXECUTIVE_ORDER}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onExecutiveOrders({ values: values, route: `${ENDPOINT_EXECUTIVE_ORDERS}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_EXECUTIVE_ORDER}`)
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



