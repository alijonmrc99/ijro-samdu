import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { notification } from "antd";
import { notificationSlice } from "./slices";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Notifications: FC = () => {

    const dispatch = useAppDispatch();
    const [api, contentHolder] = notification.useNotification()
    const { is_open, message } = useAppSelector(state => state.notification)

    useEffect(() => {
        if (is_open) {
            openNotificationWithIcon('warning')
        }

        setTimeout(() => dispatch(notificationSlice.actions.close(), 1000))
    }, [is_open])

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: "Diqqat",
            description: message
        })
    }
    return <span>{contentHolder}</span>
}