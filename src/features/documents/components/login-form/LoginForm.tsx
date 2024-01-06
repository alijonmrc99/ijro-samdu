import { FC } from "react";
import { useLogin } from "../../hooks/useLogin";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { AUTH_FIELD_PASSWORD, AUTH_FIELD_USER_NAME } from "../../constants";

export const LoginForm: FC = () => {
    const { handleLogin, isLoading, control, contextHolder, setValue } = useLogin()
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <TextFieldController control={control}
                        name={AUTH_FIELD_USER_NAME}
                        placeholder="Login" />
                    <TextFieldController control={control}
                        name={AUTH_FIELD_PASSWORD}
                        inputCompound={'Password'}
                        placeholder="Parol" />
                </div>
                {contextHolder}
                <div>
                    <button disabled={isLoading} type="submit">Kirish</button>
                </div>
            </form>
        </div>
    )
}               