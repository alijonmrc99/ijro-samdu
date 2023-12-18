import { ScreenError404 } from './components/screens'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
function App() {


  return useRoutes([
    ...routes(),
    {
      path: '*',
      element: <ScreenError404 />
    }
  ])
}

export default App
