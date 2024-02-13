import { FC, useEffect } from "react";
import { useExecutiveOrders } from "../../hooks/useAppeals";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { fetchAppealById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ROUTE_EXECUTIVE_ORDER } from "../../../../common/constants";

export const AppealForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useExecutiveOrders();
    const { data: executiveOrder } = useAppSelector(state => state.appeal);

    useEffect(() => {
        if (id) {
            dispatch(fetchAppealById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (executiveOrder) {
            setValue('id', executiveOrder.id);
            setValue('creator', executiveOrder.creator);
            setValue('executed_sign', executiveOrder.executedSign);
            setValue('index_and_created_at', executiveOrder.indexAndCreatedAt);
            setValue('hand_over_date', executiveOrder.handOverDate);
            setValue('performer_and_given_date', executiveOrder.performerAndGivenDate);
            setValue('resolution', executiveOrder.resolution);
            setValue('title_or_summary', executiveOrder.titleOrSummary);
            setValue('file_name', executiveOrder.file_name);
        }
    }, [executiveOrder])

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <TextFieldController control={control}
                        name={'index_and_created_at'}
                        label={t('index_and_date')}
                        placeholder={t('index_and_date')} />

                    <DatePickerController
                        control={control}
                        style={{ width: "100%" }}
                        setValue={setValue}
                        label={t('date')}
                        placeholder={t('placeholder_date')}
                        name={'hand_over_date'}
                    />

                    <TextFieldController control={control}
                        name={'creator'}
                        label={t('creator')}
                        placeholder={t('creator')} />

                    <TextFieldController control={control}
                        name={'title_or_summary'}
                        label={t('title_or_summary')}
                        inputCompound={'TextArea'}
                        placeholder={t('title_or_summary')} />

                    <TextFieldController control={control}
                        name={'resolution'}
                        label={t('resolution')}
                        placeholder={t('resolution')} />

                    <TextFieldController control={control}
                        name={'performer_and_given_date'}
                        label={t('performer_date')}
                        placeholder={t('performer_date')} />

                    <TextFieldController
                        control={control}
                        name={'executed_sign'}
                        label={t('executed_sign')}
                        placeholder={t('executed_sign')} />

                    <FileUploader
                        errorsMassage={errors?.file_name?.message || ""}
                        setValue={setValue}
                        name={"file_name"}
                        filePath={ROUTE_EXECUTIVE_ORDER} />
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