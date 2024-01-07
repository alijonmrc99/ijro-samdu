import { FC, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { DOC_TITLE } from "../../constants";
import { useTranslation } from "react-i18next";
import { Editor } from "../../../../components/editor";
import { useAppSelector } from "../../../../store";

export const DocumentForm: FC = () => {
    const { t } = useTranslation()
    const { handleLogin, isLoading, control, contextHolder, setValue } = useLogin();
    const { data } = useAppSelector(state => state.document)
    useEffect(() => {
        if (data) {
            setValue('title', data.title)
        }
    }, [t])
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <TextFieldController control={control}
                        name={DOC_TITLE}
                        placeholder={t('title')} />
                    <Editor />
                </div>
                {contextHolder}
                <div>
                    <button disabled={isLoading} type="submit">Kirish</button>
                </div>
            </form>
        </div>
    )
}               