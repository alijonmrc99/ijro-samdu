import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store"
import { fetchMe } from "../thunks";

export const useMe = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.me);
    const isAuthorized = !!data;

    useEffect(() => {
        if (!data && !isLoading) {
            dispatch(fetchMe());
        }
    }, [dispatch]);

    return { data, isAuthorized, isLoading }
}