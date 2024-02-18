import { FC, useEffect } from "react";
import { useFinancialOrders } from "../../hooks/useFinancialOrders";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { fetchFinancialOrderById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ENDPOINT_FINANCIAL_ORDERS } from "../../endpoints";

export const FinancialOrdersForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useFinancialOrders();
    const { data: financialOrders } = useAppSelector(state => state.financialOrder);

    useEffect(() => {
        if (id) {
            dispatch(fetchFinancialOrderById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (financialOrders) {
            setValue('id', financialOrders.id);
            setValue('number', financialOrders.number);
            setValue('date', financialOrders.date);
            setValue('comment', financialOrders.comment);
            setValue('summary', financialOrders.summary);;
            setValue('file_name', financialOrders.file_name);
        }
    }, [financialOrders])

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <TextFieldController control={control}
                        name={'number'}
                        label={t('number')}
                        placeholder={t('number')} />

                    <DatePickerController
                        control={control}
                        style={{ width: "100%" }}
                        setValue={setValue}
                        label={t('date')}
                        placeholder={t('placeholder_date')}
                        name={'date'}
                    />

                    <TextFieldController control={control}
                        name={'comment'}
                        label={t('comment')}
                        placeholder={t('comment')} />

                    <TextFieldController control={control}
                        name={'summary'}
                        label={t('summary')}
                        inputCompound={'TextArea'}
                        placeholder={t('summary')} />

                    <FileUploader
                        errorsMassage={errors?.file_name?.message || ""}
                        setValue={setValue}
                        name={"file_name"}
                        filePath={ENDPOINT_FINANCIAL_ORDERS} />
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