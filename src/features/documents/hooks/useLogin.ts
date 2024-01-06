import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup';

import { AUTH_FIELD_USER_NAME, AUTH_FIELD_PASSWORD } from "../constants";
import { LoginSchema } from "../schema";
import { message } from "antd";
import { ILogin, ILoginQuery } from "../models/IDocuments";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_AUTH_LOGIN } from "../endpoints";
import { setBearerToken } from "../../../common/axios/axios.instance";
import { ROUTE_DASHBOARD } from "../../../common/constants";

const httpApi = new HttpApi;

export const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {
            [AUTH_FIELD_USER_NAME]: '',
            [AUTH_FIELD_PASSWORD]: '',
            // [AUTH_FIELD_REMEMBER]: false,
        },
        resolver: yupResolver(LoginSchema),
        mode: 'onBlur'
    })

    const [messageApi, contextHolder] = message.useMessage();
    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.response?.data?.message || "Error message for user",
        })
    }

    const onSubmit = (values: ILoginQuery) => {
        setIsLoading(true);

        login(values)
            .then(({ data: { accessToken } }) => {
                setBearerToken(accessToken);
                navigate(ROUTE_DASHBOARD);
            })
            .catch(handleErrors)
            .finally(() => setTimeout(() => setIsLoading(false), 20));
    };

    const handleLogin = handleSubmit(onSubmit);
    return { control, register, setValue, isLoading, handleLogin, contextHolder };

};
export const login = (body: ILoginQuery): Promise<ILogin> => {
    const loginData = new URLSearchParams();
    loginData.append('username', body.username);
    loginData.append('password', body.password);
    // console.log();


    return httpApi.post(ENDPOINT_AUTH_LOGIN, loginData.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((response) => response)
}