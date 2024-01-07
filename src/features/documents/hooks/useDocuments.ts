import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup';

import { DOC_BODY, DOC_TITLE } from "../constants";
import { DocumentSchema } from "../schema";
import { message } from "antd";
import { IDocuments } from "../models";
import { useAppDispatch } from "../../../store";
import { onDocuments } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS } from "../../../common/constants";


export const useDocuments = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, setValue } = useForm<IDocuments>({
        defaultValues: {
            [DOC_TITLE]: '',
            [DOC_BODY]: ''
        },
        // resolver: yupResolver(DocumentSchema),
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

        dispatch(onDocuments(values)).unwrap()
            .then((responseValues: any) => {
                console.log(responseValues);

                if (responseValues.success) {
                    navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/`)
                    // setOnSetSuccess(true);
                }
            })
            .catch(handleErrors)
            .finally(() => { setIsLoading(false) })

    };

    const handleLogin = handleSubmit(onSubmit);
    return { control, register, setValue, isLoading, handleLogin, contextHolder };

};



