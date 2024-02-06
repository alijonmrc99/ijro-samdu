import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../../store";
import { onTrips } from "../thunks";
import { ROUTE_BUS_TRIP, ROUTE_DASHBOARD } from "../../../common/constants";
import { ENDPOINT_BUS_TRIP } from "../endpoints";
import { IBusinessTrip } from "../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentSchema } from "../schema";

export const useDocuments = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues: IBusinessTrip = {
        full_name: '',
        travel_place: '',
        job: '',
        file_name: '',
        start_date: '',
        end_date: ''
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IBusinessTrip>({
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

    const onSubmit = (values: IBusinessTrip) => {
        setIsLoading(true);
        console.log(values);

        if (values.id) {
            values["_method"] = "PUT";
            dispatch(onTrips({ values: values, route: `${ENDPOINT_BUS_TRIP}/${values.id}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_BUS_TRIP}`)
                        // setOnSetSuccess(true);
                    }
                })
                .catch(handleErrors)
                .finally(() => { setIsLoading(false) })
        }
        else {
            dispatch(onTrips({ values: values, route: `${ENDPOINT_BUS_TRIP}` })).unwrap()
                .then((responseValues: any) => {
                    if (responseValues.success) {
                        navigate(`${ROUTE_DASHBOARD}/${ROUTE_BUS_TRIP}`)
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



