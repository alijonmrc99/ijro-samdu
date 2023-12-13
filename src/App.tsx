import { useState } from 'react'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
import { MakePdf } from './components/make-pdf/MakePdf'
function App() {
  const [count, setCount] = useState(0)

  // return useRoutes([
  //   ...routes()
  // ])

  return (
    <><MakePdf /></>
  )
}

export default App
