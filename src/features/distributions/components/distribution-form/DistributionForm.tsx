import { FC, useEffect } from "react";
import { useDistribution } from "../../hooks/useDistribution";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { fetchDistributionsById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ROUTE_DECREE } from "../../../../common/constants";

export const DistributionForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useDistribution();
    const { data: decree } = useAppSelector(state => state.distribution);

    useEffect(() => {
        if (id) {
            dispatch(fetchDistributionsById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (decree) {
            setValue('id', decree.id);
            setValue('date', decree.date);
            setValue('applicant', decree.applicant);
            setValue('recipent', decree.recipent);
            setValue('structure', decree.structure);
            setValue('file_name', decree.fileName);
        }
    }, [decree])

    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <TextFieldController control={control}
                        name={'applicant'}
                        label={t('applicant')}
                        placeholder={t('applicant')} />

                    <TextFieldController control={control}
                        name={'recipent'}
                        label={t('recipent')}
                        placeholder={t('recipent')} />

                    <TextFieldController
                        control={control}
                        name={'structure'}
                        label={t('structure')}
                        placeholder={t('structure')} />

                    <DatePickerController
                        control={control}
                        style={{ width: "100%", height: "38px" }}
                        name={'date'}
                        label={t('date')}
                        setValue={setValue}
                        placeholder={t('placeholder_date')}
                    />
                    <FileUploader
                        errorsMassage={errors?.file_name?.message || ""}
                        setValue={setValue}
                        name={"file_name"}
                        filePath={ROUTE_DECREE} />
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