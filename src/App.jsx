import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/User.context'
const App = () => {
  return (
    <UserProvider>
      <div>
        <AppRoutes />
      </div>
    </UserProvider>
  )
}

export default App