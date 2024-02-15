import { FC, useEffect } from "react";
import { useExecutiveOrders } from "../../hooks/useExecutiveOrders";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { FetchExecutiveOrderById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ENDPOINT_EXECUTIVE_ORDERS } from "../../endpoints";

export const ExecutiveOrderForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useExecutiveOrders();
    const { data: executiveOrder } = useAppSelector(state => state.executiveOrder);

    useEffect(() => {
        if (id) {
            dispatch(FetchExecutiveOrderById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (executiveOrder) {
            setValue('id', executiveOrder.id);
            setValue('date', executiveOrder.date);
            setValue('number', executiveOrder.number);
            setValue('summary', executiveOrder.summary);
            setValue('owner', executiveOrder.owner);
            setValue('executor', executiveOrder.executor);
            setValue('file_name', executiveOrder.file_name)
        }
    }, [executiveOrder])

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <DatePickerController
                        control={control}
                        style={{ width: "100%", height: "38px" }}
                        name={'date'}
                        label={t('date')}
                        setValue={setValue}
                        placeholder={t('placeholder_date')}
                    />
                    <TextFieldController control={control}
                        name={'number'}
                        label={t('number')}
                        placeholder={t('number')} />

                    <TextFieldController control={control}
                        name={'summary'}
                        inputCompound={'TextArea'}
                        label={t('summary')}
                        placeholder={t('summary')} />

                    <TextFieldController
                        control={control}
                        name={'owner'}
                        label={t('project_introducer')}
                        placeholder={t('project_introducer')} />
                    <TextFieldController
                        control={control}
                        name={'executor'}
                        label={t('executor')}
                        placeholder={t('executor')} />

                    <FileUploader
                        errorsMassage={errors?.file_name?.message || ""}
                        setValue={setValue}
                        name={"file_name"}
                        filePath={ENDPOINT_EXECUTIVE_ORDERS} />
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