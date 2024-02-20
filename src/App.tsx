import { useEffect, useState } from 'react'
import { RoleTypeEnums } from './common/constants'
import { ScreenError404 } from './components/screens'
import { RouteObjectType, routes } from './routes'
import { useRoutes } from 'react-router-dom'
import { useAppSelector } from './store'


const filterByPermission = (roles: RoleTypeEnums[], items: RouteObjectType[]) => {
  return items.map(item => {
    if (item.children?.length) {
      return ({
        ...item,
        children: item.children.filter(child => roles.some(role => child?.roles?.includes(role)) || !child.roles?.length),
      })
    } else {
      return item
    }
  })
}

function App() {

  const [filteredRoutes, setFilteredRoutes] = useState<RouteObjectType[]>(routes())
  const { data: user } = useAppSelector(state => state.me)

  useEffect(() => {
    if (user) {
      setFilteredRoutes(filterByPermission(user.roles.map(role => role.name) || [], routes()))
    }
  }, [user])
  return useRoutes([
    ...filteredRoutes,
    {
      path: '*',
      element: <ScreenError404 />
    }
  ])
}

export default App
