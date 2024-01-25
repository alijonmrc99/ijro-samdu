import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useProfile } from "../../hooks/useProfile";
import { JOB, LOGIN, PASSWORD, USER_NAME } from "../../constants";
import { Button } from "antd";
import { useAppSelector } from "../../../../store";

export const ProfileForm: FC = () => {
    const { t } = useTranslation();
    const { control, setValue, hadleUser, contextHolder, isLoading } = useProfile();
    const { data: me } = useAppSelector(state => state.me);

    useEffect(() => {
        if (me) {
            setValue('fullName', me.fullName)
            setValue('username', me.username)
            setValue('job', me.job)
        }
    }, [me])

    console.log(me);


    useEffect(() => {
        setValue('password', "")
    }, [isLoading])
    return (
        <div className="document-form">
            <form onSubmit={hadleUser}>
                <div>
                    <TextFieldController control={control}
                        name={USER_NAME}
                        label={t('user_name')}
                        disabled={true}
                        readOnly={true}
                        placeholder={t('user_name')} />
                    <TextFieldController control={control}
                        name={LOGIN}
                        label={t('user_nick')}
                        disabled={true}
                        readOnly={true}
                        placeholder={t('user_nick')} />
                    <TextFieldController
                        control={control}
                        name={JOB}
                        disabled={true}
                        readOnly={true}
                        label={t('job')}
                        placeholder={t('job')} />
                    <TextFieldController
                        control={control}
                        name={PASSWORD}
                        inputCompound="Password"
                        label={t('password')}
                        placeholder={t('password')}
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