import { FC, useEffect } from "react";
import { useDocuments } from "../../hooks/useDocuments";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { DOC_TITLE } from "../../constants";
import { useTranslation } from "react-i18next";
import { Editor } from "../../../../components/editor";
import { useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd";
export const DocumentForm: FC = () => {
    const { t } = useTranslation()
    const { handleLogin, isLoading, control, contextHolder, setValue } = useDocuments();
    const { data: doc } = useAppSelector(state => state.vrDoc)

    useEffect(() => {
        if (doc) {
            setValue('body', doc.body)
            setValue('title', doc.title),
                setValue('id', doc.id)
        }
    }, [doc])

    return (
        <div className="document-form">
            <form onSubmit={handleLogin}>
                <div>
                    <TextFieldController control={control}
                        name={DOC_TITLE}
                        label={t('title')}
                        placeholder={t('title')} />
                    <Editor hasValue={doc?.body} setValue={setValue} />
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