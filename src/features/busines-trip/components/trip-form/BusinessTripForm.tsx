import { FC, useEffect } from "react";
import { useDocuments } from "../../hooks/useTtip";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { JOB, TRAVEL_PLACE, END_DATE, USER_NAME, START_DATE } from "../../constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button, Flex } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { FetchTripById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ENDPOINT_BUS_TRIP } from "../../endpoints";
;
export const BusinessTripForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, contextHolder, getValues, setValue } = useDocuments();
    const { data: trip } = useAppSelector(state => state.trip);

    useEffect(() => {
        if (id) {
            console.log(id);

            dispatch(FetchTripById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        console.log(trip);

        if (trip) {
            setValue('id', trip.id);
            setValue('full_name', trip.fullName);
            setValue('job', trip.job);
            setValue('travel_place', trip.travelPlace);
            setValue('end_date', trip.endDate);
            setValue('start_date', trip.startDate);
        } else {
            handleReset();
        }
    }, [trip])

    const disabledEndDate = (endValue: any) => {
        const startValue = dayjs(getValues('start_date'));
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <TextFieldController control={control}
                        name={USER_NAME}
                        label={t('user_name')}
                        placeholder={t('user_name')} />
                    <TextFieldController control={control}
                        name={TRAVEL_PLACE}
                        label={t('travel_place')}
                        placeholder={t('travel_place')} />
                    <TextFieldController
                        control={control}
                        name={JOB}
                        label={t('job')}
                        placeholder={t('job')} />
                    <Flex>
                        <DatePickerController
                            control={control}
                            name={START_DATE}
                            label={t('start_date')}
                            setValue={setValue}
                            placeholder={t('start_date')}
                        />
                        <DatePickerController
                            control={control}
                            disabledDate={disabledEndDate}
                            name={END_DATE}
                            label={t('end_date')}
                            setValue={setValue}
                            placeholder={t('end_date')}
                        />
                    </Flex>
                    <FileUploader setValue={setValue} name={"name"} filePath={'BusinessTrip'} />
                </div>
                {contextHolder}
                <div className="buttons-container">
                    <Button disabled={isLoading} className="submit-btn" type="primary" htmlType="submit">
                        {t('save')}
                    </Button>
                </div>
            </form>
        </div>
    )
}               