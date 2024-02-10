import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { IUser } from "../models"
import { message } from "antd";
import { useState } from "react";
import { http } from "../../../pages/vise-reactor-docs";
import { ENDPOINT_AUTH_ME } from "../../auth/endpoints";
import { ENDPOINT_ME_SETTINGS } from "../endpoints";

export const useProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleSubmit, setValue, control, register } = useForm<IUser>({
        mode: 'onBlur',
        // resolver: yupResolver()
    });

    const [messageApi, contextHolder] = message.useMessage();

    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.response?.data?.message || "Error message for user",
        })
    };

    const onSubmit = (values: IUser) => {
        setIsLoading(true);
        values._method = "PUT"
        http.post(`${ENDPOINT_AUTH_ME}/${ENDPOINT_ME_SETTINGS}`, values).then(_res => {
            // navigate(`${ROUTE_DASHBOARD}/${ROUTE_USERS}/`)
            messageApi.open({
                type: "success",
                content: "Password has been updated"
            })

        }).catch(handleErrors)
            .finally(() => setIsLoading(false))
    };

    const hadleUser = handleSubmit(onSubmit)


    return { control, setValue, hadleUser, register, isLoading, contextHolder, setIsLoading }

}