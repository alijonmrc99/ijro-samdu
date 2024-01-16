import { message } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import { IngredientConsumptionSchema } from '../schema';
import { HttpApi } from '../../../common/http';
// import { IConsumption } from '../models/IConsumption';
// import { ENDPOINT_CONSUMPTION, ENDPOINT_RESTAURANT } from '../../../common/constants';
import { useMe } from '../../auth/hooks';
import { ENDPOINT_INCOMING } from '../endpoints';
import { IDocumentsSave } from '../models';
import { DocumentSchema } from '../schema';


export const useRegisterForm = () => {
    const http = new HttpApi();
    const defaultValues = {}
    const { register, control, handleSubmit, setValue, reset, getValues, watch, formState: { isSubmitting } } = useForm<IDocumentsSave>({
        defaultValues: defaultValues,
        resolver: yupResolver(DocumentSchema),
        mode: 'onBlur',
    });

    const [messageApi, contextHolder] = message.useMessage();
    const [onSuccess, setOnSetSuccess] = useState(false);


    const handleErrors = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors.response.data.message || 'Error messages'
        });
    };

    const onSubmit = async (values: IDocumentsSave) => {
        try {
            values.status = "approved"
            values._method = "PUT"
            await http.post(`${ENDPOINT_INCOMING}/${values.id}`, values);
            setOnSetSuccess(true)
        } catch (error) {
            handleErrors(error)
        }
    };

    const handleReset = () => {
        reset(defaultValues)
    }

    const handleCompanyForm = handleSubmit(onSubmit);

    return {
        control, register, setValue, getValues, handleReset,
        resetValues: reset, handleCompanyForm, contextHolder, onSuccess, setOnSetSuccess, watch, isSubmitting
    };
};
