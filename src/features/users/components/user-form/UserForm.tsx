import { FC, useEffect, useState } from "react";
import { useDocuments } from "../../hooks/useUsers";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { JOB, LOGIN, PASSWORD, USER_NAME } from "../../constants";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store";
import './style.scss'
import { Button } from "antd";
import { SelectContreoller } from "../../../../common/inputs/select-conroller";
import { IRole } from "../../../auth/models";
import { http } from "../../../../pages/vise-reactor-docs";
import { ENDPOINT_ROLES } from "../../endpoints";
export const UserForm: FC = () => {
    const { t } = useTranslation()
    const { handleLogin, isLoading, control, contextHolder, setValue } = useDocuments();
    const { data: user } = useAppSelector(state => state.user);
    const [roles, setRoles] = useState<IRole[]>([]);

    useEffect(() => {
        http.get(`${ENDPOINT_ROLES}`, {})
            .then((response: any) => setRoles(response?.data))
    }, [user])

    useEffect(() => {
        if (user) {
            setValue('id', user.id);
            setValue('full_name', user.fullName);
            setValue('username', user.username);
            setValue('job', user.job);
            setValue('role', user.roles[0].id);
        }
    }, [user])

    return (
        <div className="document-form">
            <form onSubmit={handleLogin}>
                <div>
                    <TextFieldController control={control}
                        name={USER_NAME}
                        label={t('user_name')}
                        placeholder={t('user_name')} />
                    <TextFieldController control={control}
                        name={LOGIN}
                        label={t('user_nick')}
                        placeholder={t('user_nick')} />
                    <TextFieldController
                        control={control}
                        name={JOB}
                        label={t('job')}
                        placeholder={t('job')} />
                    <TextFieldController
                        control={control}
                        name={PASSWORD}
                        label={t('password')}
                        inputCompound="Password"
                        placeholder={t('password')} />

                    <div>
                        <SelectContreoller
                            disabled={user?.job ? true : false}
                            style={{ width: "100%" }}
                            setValue={setValue}
                            control={control}
                            placeholder={t('choose')}
                            label={t('choose_role')}
                            items={roles?.map(role => ({ value: role.id, label: t(role.name) })) || []}
                            name="role"
                        />
                    </div>
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