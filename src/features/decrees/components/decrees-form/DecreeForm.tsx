import { FC, useEffect } from "react";
import { useDecree } from "../../hooks/useDecree";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd"; import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { fetchDecreeById } from "../../thunks";
import { FileUploader } from "../../../../common/inputs/file-uploader";
import { ROUTE_DECREE } from "../../../../common/constants";

export const DecreeForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, errors, contextHolder, setValue } = useDecree();
    const { data: decree } = useAppSelector(state => state.executiveOrder);

    useEffect(() => {
        if (id) {
            dispatch(fetchDecreeById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (decree) {
            setValue('id', decree.id);
            setValue('date', decree.date);
            setValue('number', decree.number);
            setValue('summary', decree.summary);
            setValue('owner', decree.owner);
            setValue('file_name', decree.fileName)
        }
    }, [decree])

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