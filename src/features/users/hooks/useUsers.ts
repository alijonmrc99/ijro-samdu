import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onUsers } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_USERS, } from "../../../common/constants";
import { ENDPOINT_REGISTER, ENDPOINT_USERS } from "../endpoints";
import { IUserSend } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentSchema } from "../schema";

export const useDocuments = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, setValue } = useForm<IUserSend>({
        resolver: yupResolver(DocumentSchema),
        mode: 'onBlur'
    })

    const [messageApi, contextHolder] = message.useMessage();

    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.response?.data?.message || "Error message for user",
        })
    };

    const onSubmit = (values: IUserSend) => {
        setIsLoading(true);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onUsers({ values: values, route: `${ENDPOINT_USERS}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    console.log(responseValues.success);

                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_USERS}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onUsers({ values: values, route: `${ENDPOINT_REGISTER}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_USERS}`)
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



