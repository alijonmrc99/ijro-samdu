import { FC, useEffect } from "react";
import { useDocuments } from "../../hooks/useDocuments";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { DOC_TITLE } from "../../constants";
import { useTranslation } from "react-i18next";
import { Editor } from "../../../../components/editor";
import { useAppSelector } from "../../../../store";

export const DocumentForm: FC = () => {
    const { t } = useTranslation()
    const { handleLogin, isLoading, control, contextHolder, setValue } = useDocuments();
    const { data: doc } = useAppSelector(state => state.document)
    useEffect(() => {
        if (doc) {
            setValue('body', doc.body)
            setValue('title', doc.title)
        }
    }, [doc])

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <TextFieldController control={control}
                        name={DOC_TITLE}
                        label={t('title')}
                        placeholder={t('title')} />
                    <Editor setValue={setValue} />
                </div>
                {contextHolder}
                <div>
                    <button disabled={isLoading} type="submit">Kirish</button>
                </div>
            </form>
        </div>
    )
}               