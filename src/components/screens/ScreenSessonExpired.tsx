import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { meSlice } from "../../features/auth/sclices";
import { BASE_AUTH_TOKEN, ROUTE_LOGIN } from "../../common/constants";
import { useTranslation } from "react-i18next";

export const ScreenSessionExpired: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation()
    const handleLogout = () => {
        dispatch(meSlice.actions.emptyState());
        localStorage.removeItem(BASE_AUTH_TOKEN);
        navigate(ROUTE_LOGIN)
    }

    return (
        <div>
            <p>Your session is expired. Please, go to login page</p>
            <button onClick={handleLogout}>{t('exit')}</button>
        </div>
    )
}