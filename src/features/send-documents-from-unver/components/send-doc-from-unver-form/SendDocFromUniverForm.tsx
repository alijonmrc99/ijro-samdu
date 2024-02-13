import { FC, useEffect } from "react";
import { useExecutiveOrders } from "../../hooks/useExecutiveOrders";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { FetchSendDocById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ROUTE_EXECUTIVE_ORDER } from "../../../../common/constants";

export const SendDocsFromUniverForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useExecutiveOrders();
    const { data: sendDoc } = useAppSelector(state => state.sendDoc);

    useEffect(() => {
        if (id) {
            dispatch(FetchSendDocById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (sendDoc) {
            setValue('id', sendDoc.id);
            setValue('sent_place', sendDoc.sent_place);
            setValue('number', sendDoc.number);
            setValue('summary', sendDoc.summary);
            setValue('file_name', sendDoc.file_name)
        }
    }, [sendDoc])

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>

                    <TextFieldController
                        control={control}
                        name={'sent_place'}
                        label={t('sent_place')}
                        placeholder={t('sent_place')} />

                    <TextFieldController control={control}
                        name={'number'}
                        label={t('number')}
                        placeholder={t('number')} />

                    <TextFieldController control={control}
                        name={'summary'}
                        inputCompound={'TextArea'}
                        label={t('summary')}
                        placeholder={t('summary')} />

                    <DatePickerController
                        control={control}
                        style={{ width: "100%", height: "38px" }}
                        name={'createdAt'}
                        label={t('date')}
                        setValue={setValue}
                        placeholder={t('placeholder_date')}
                    />
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