import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/login'
import Register from '../Pages/Register'
import Projects from '../Pages/Projects'
import UserAuth from '../auth/UserAuth'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<UserAuth><Home /></UserAuth>} />
                 <Route path='/project' element={<UserAuth><Projects /></UserAuth>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes