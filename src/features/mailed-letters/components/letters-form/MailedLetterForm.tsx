import { FC, useEffect } from "react";
import { useDocuments } from "../../hooks/useLetters";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { Button } from "antd";
import { DatePickerController } from "../../../../common/inputs/datepicker-controller";
import { useParams } from "react-router-dom";
import { fetchLetterById } from "../../thunks";
import './style.scss'

export const MailedLetterForm: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { handleTrip, isLoading, handleReset, control, contextHolder, setValue } = useDocuments();
    const { data: letter } = useAppSelector(state => state.letter);

    useEffect(() => {
        if (id) {
            dispatch(fetchLetterById(id))
        } else {
            handleReset()
        }
    }, [id])

    useEffect(() => {
        if (letter) {
            setValue('id', letter.id);
            setValue('sent_place_person', letter.sentPlacePerson);
            setValue('sent_at', letter.sentAt);
            setValue('cost', letter.cost);
            setValue('comment', letter.comment);
        } else {
            handleReset();
        }
    }, [letter])


    return (
        <div className="document-form">
            <form onSubmit={handleTrip}>
                <div>
                    <TextFieldController control={control}
                        name={'sent_place_person'}
                        label={t('place_person')}
                        inputCompound={'TextArea'}
                        placeholder={t('place_person')} />
                    <TextFieldController control={control}
                        name={'cost'}
                        type="number"
                        label={t('cost')}
                        placeholder={t('cost')} />
                    <TextFieldController
                        control={control}
                        name={'comment'}
                        label={t('comment')}
                        placeholder={t('comment')} />

                    <DatePickerController
                        control={control}
                        style={{ width: "100%" }}
                        name={'sent_at'}
                        label={t('date')}
                        setValue={setValue}
                        placeholder={t('placeholder_data')}
                    />
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