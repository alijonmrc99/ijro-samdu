import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../store";
import { BASE_AUTH_TOKEN, ROUTE_LOGIN } from "../../../common/constants";
import { meSlice } from "../sclices";

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        localStorage.removeItem(BASE_AUTH_TOKEN);
        dispatch(meSlice.actions.emptyState());
        navigate(ROUTE_LOGIN)
    };

    return { handleLogout };
}