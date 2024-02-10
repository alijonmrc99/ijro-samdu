import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onDecrees } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_DECREE } from "../../../common/constants";
import { ENDPOINT_DECREEE } from "../endpoints";
import { IDecree } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../schema";

export const useDecree = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IDecree = {
        date: '',
        number: '',
        summary: '',
        owner: '',
        file_name: '',
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IDecree>({
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

    const onSubmit = (values: IDecree) => {
        setIsLoading(true);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onDecrees({ values: values, route: `${ENDPOINT_DECREEE}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DECREE}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onDecrees({ values: values, route: `${ENDPOINT_DECREEE}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DECREE}`)
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



