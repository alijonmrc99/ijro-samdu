import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { withGUest } from '../../features/auth/hocs'
import { useTranslation } from 'react-i18next'


export const HomePage: FC = withGUest(() => {
    const { t } = useTranslation();
    return (
        <div>

            <div>{t('welcome')}</div>
            <div>Tizimga kirish</div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
})
