import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup';

import { DOC_BODY, DOC_TITLE } from "../constants";
import { LoginSchema } from "../schema";
import { message } from "antd";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_AUTH_LOGIN } from "../endpoints";
import { setBearerToken } from "../../../common/axios/axios.instance";
import { ROUTE_DASHBOARD } from "../../../common/constants";
import { IDocuments } from "../models";

const httpApi = new HttpApi;

export const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {
            [DOC_TITLE]: '',
            // [DOC_BODY]: ''
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

    const onSubmit = (values: any) => {
        setIsLoading(true);


    };

    const handleLogin = handleSubmit(onSubmit);
    return { control, register, setValue, isLoading, handleLogin, contextHolder };

};



