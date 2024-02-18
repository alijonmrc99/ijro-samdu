import { FC, useEffect } from "react";
import { useInnerAppeals } from "../../hooks/useInnerAppeals";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { fetchInnerAppealById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ENDPOINT_INNER_APPEAL } from "../../endpoints";

export const InnerAppealForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useInnerAppeals();
    const { data: executiveOrder } = useAppSelector(state => state.innerAppeal);

    useEffect(() => {
        if (id) {
            dispatch(fetchInnerAppealById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (executiveOrder) {
            setValue('id', executiveOrder.id);
            setValue('accepted_date_and_index', executiveOrder.acceptedDateAndIndex);
            setValue('creator', executiveOrder.creator);
            setValue('given_date', executiveOrder.givenDate);
            setValue('title_or_summary', executiveOrder.titleOrSummary);
            setValue('resolution', executiveOrder.resolution);
            setValue('performer_and_date', executiveOrder.performerAndDate);
            setValue('performed_sign', executiveOrder.performedSign);
            setValue('file_name', executiveOrder.file_name);
        }
    }, [executiveOrder])

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <TextFieldController control={control}
                        name={'accepted_date_and_index'}
                        label={t('index_and_date')}
                        placeholder={t('index_and_date')} />

                    <DatePickerController
                        control={control}
                        style={{ width: "100%" }}
                        setValue={setValue}
                        label={t('date')}
                        placeholder={t('placeholder_date')}
                        name={'given_date'}
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
                        name={'performer_and_date'}
                        label={t('performer_date')}
                        placeholder={t('performer_date')} />

                    <TextFieldController
                        control={control}
                        name={'performed_sign'}
                        label={t('executed_sign')}
                        placeholder={t('executed_sign')} />

                    <FileUploader
                        errorsMassage={errors?.file_name?.message || ""}
                        setValue={setValue}
                        name={"file_name"}
                        filePath={ENDPOINT_INNER_APPEAL} />
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