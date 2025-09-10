import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/User.context'
import { ToastProvider } from './context/Toast.context'

const App = () => {
  return (
    <UserProvider>
      <ToastProvider>
        <div>
          <AppRoutes />
        </div>
      </ToastProvider>
    </UserProvider>
  )
}

export default App