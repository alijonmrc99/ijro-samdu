import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ENDPOINT_INCOMING } from "../endpoints";
import { IDocumentsSave } from "../models";
import { useAppDispatch } from "../../../store";
import { onRegDocuments } from "../thunks";

export const useConfirmModal = () => {
    const defaultValue = {};
    const { reset, control, handleSubmit, setValue, formState: { isSubmitting } } = useForm<IDocumentsSave>({
        defaultValues: defaultValue,
        // resolver: yupResolver(DocumentSchema),
        mode: 'onBlur'
    })

    const dispatch = useAppDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const [onSuccess, setOnSuccess] = useState(false);

    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors.response.data.message || "Error message"
        })
    };

    const handleReset = () => {
        reset()
    };

    const onSubmit = async (values: IDocumentsSave) => {
        console.log(
            values
        );
        setOnSuccess(false)
        values._method = "PUT"
        dispatch(onRegDocuments({ route: `${ENDPOINT_INCOMING}/${values.id}`, values })).then(_ => {
            setOnSuccess(true)
        }).catch(error => {
            handleErrors(error)
        })
    }

    const handleCheckDoc = handleSubmit(onSubmit);

    return {
        control, contextHolder, isSubmitting, handleReset, setValue, handleCheckDoc, onSuccess, setOnSuccess
    }

}