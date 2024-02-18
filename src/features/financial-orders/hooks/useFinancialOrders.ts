import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onFinancialOrder } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_FINANCIAL_ORDER } from "../../../common/constants";
import { IFinancialOrders } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../schema";
import { ENDPOINT_FINANCIAL_ORDERS } from "../endpoints";

export const useFinancialOrders = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IFinancialOrders = {
        number: "",
        comment: "",
        date: "",
        summary: ""
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IFinancialOrders>({
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

    const onSubmit = (values: IFinancialOrders) => {
        setIsLoading(true);
        console.log(values);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onFinancialOrder({ values: values, route: `${ENDPOINT_FINANCIAL_ORDERS}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_FINANCIAL_ORDER}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onFinancialOrder({ values: values, route: `${ENDPOINT_FINANCIAL_ORDERS}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_FINANCIAL_ORDER}`)
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



