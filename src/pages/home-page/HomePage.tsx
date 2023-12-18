import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { withGUest } from '../../features/hocs'


export const HomePage: FC = withGUest(() => {
    return (
        <div>
            Xush kelibsiz

            <div>Tizimga kirish</div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
})
