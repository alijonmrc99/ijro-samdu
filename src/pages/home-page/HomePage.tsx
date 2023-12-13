import { Outlet } from 'react-router-dom'


export function HomePage() {
    return (
        <div>
            Salom
            <Outlet></Outlet>
        </div>
    )
}

export default HomePage
