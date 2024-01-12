import { FC } from "react";
import { useLogin } from "../../hooks/useLogin";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { AUTH_FIELD_PASSWORD, AUTH_FIELD_USER_NAME } from "../../constants";
import { useTranslation } from "react-i18next";
import './style.scss'
import { LoadingOutlined } from "@ant-design/icons";
export const LoginForm: FC = () => {
    const { t } = useTranslation()
    const { handleLogin, isLoading, control, contextHolder, setValue } = useLogin()
    return (
        <div className="login-form">
            <div className='form-title'>{t('login_title')}</div>
            <form onSubmit={handleLogin}>
                <div>
                    <TextFieldController control={control}
                        className="login-input"
                        name={AUTH_FIELD_USER_NAME}
                        label={t('username')}
                        placeholder={t('username')} />
                    <TextFieldController control={control}
                        className="login-input"
                        name={AUTH_FIELD_PASSWORD}
                        inputCompound={'Password'}
                        label={t('password')}
                        placeholder={t('password')} />
                </div>
                {contextHolder}
                <div>
                    <button className="login-submit-btn" disabled={isLoading} type="submit">{isLoading && <LoadingOutlined />}  Kirish</button>
                </div>
            </form>
        </div>
    )
}               