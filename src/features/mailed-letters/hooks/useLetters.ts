import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onLetters } from "../thunks";
import { ROUTE_DASHBOARD, ROUTE_MAILED_LETTER } from "../../../common/constants";
import { ENDPOINT_MAILED_LETTERS } from "../endpoints";
import { IMailledLetters } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { LettersSchema } from "../schema";

export const useDocuments = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IMailledLetters = {
        sent_place_person: "",
        sent_at: "",
        comment: "",
        cost: 0
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IMailledLetters>({
        resolver: yupResolver(LettersSchema),
        mode: 'onBlur'
    })



    const [messageApi, contextHolder] = message.useMessage();

    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.response?.data?.message || "Error message for user",
        })
    };

    const onSubmit = (values: IMailledLetters) => {
        setIsLoading(true);
        console.log(values);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onLetters({ values: values, route: `${ENDPOINT_MAILED_LETTERS}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_MAILED_LETTER}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onLetters({ values: values, route: `${ENDPOINT_MAILED_LETTERS}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_MAILED_LETTER}`)
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



