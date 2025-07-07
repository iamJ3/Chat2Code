import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/User.context'
import { Analytics } from "@vercel/analytics/next"
const App = () => {
  return (
    <UserProvider>
      <div>
        <AppRoutes />
        <Analytics /> 
      </div>
    </UserProvider>
  )
}

export default App