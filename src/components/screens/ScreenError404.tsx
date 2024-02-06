import { FC } from "react";
import { useNavigate } from "react-router-dom";
import './styles.scss'
import { useTranslation } from "react-i18next";
import { Button } from "antd";
export const ScreenError404: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation()
    return (
        <div className="page-404">
            <h3 className="page-404-header">{t('not_found')}</h3>
            <Button size="large" type="primary" onClick={() => navigate(-1)}>{t('back')}</Button>
        </div>
    )
}