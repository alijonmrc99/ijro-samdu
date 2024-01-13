import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup';
import { DOC_BODY, DOC_TITLE } from "../constants";
import { DocumentSchema } from "../schema";
import { message } from "antd";
import { IDocumentsSend } from "../models";
import { useAppDispatch } from "../../../store";
import { onRegDocuments } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS, } from "../../../common/constants";
import { ENDPOINT_DOCUMENTS } from "../endpoints";


export const useDocuments = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, setValue } = useForm<IDocumentsSend>({
        defaultValues: {
            [DOC_TITLE]: '',
            [DOC_BODY]: ''
        },
        resolver: yupResolver(DocumentSchema),
        mode: 'onBlur'
    })

    const [messageApi, contextHolder] = message.useMessage();

    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.response?.data?.message || "Error message for user",
        })
    }

    const onSubmit = (values: IDocumentsSend) => {
        setIsLoading(true);

        if (values.id) {
            console.log(values.id);

            values["_method"] = "PUT";
            dispatch(onRegDocuments({ values: values, route: `${ENDPOINT_DOCUMENTS}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    console.log(responseValues);

                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onRegDocuments({ values: values, route: `${ENDPOINT_DOCUMENTS}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }


    };

    const handleLogin = handleSubmit(onSubmit);
    return { control, register, setValue, isLoading, handleLogin, contextHolder };

};



