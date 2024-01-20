import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { withGUest } from '../../features/auth/hocs'
import { useTranslation } from 'react-i18next'
import './sytles.scss'
import { Col, Row } from 'antd'

export const HomePage: FC = withGUest(() => {
    const { t } = useTranslation();
    return (
        <Row className='guest-home'>
            <Col xs={24} sm={20} md={16} lg={10} xl={8} className='guest-content'>
                <h1 className='guest-header'>{t('welcome')}</h1>
                <div className='site-name'>{t('site_name')}</div>
                <div>
                    <Outlet></Outlet>
                </div>
            </Col>
        </Row>
    )
})
