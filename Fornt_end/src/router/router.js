import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Signup from '../pages/signup'
import MainPage from '../pages/main'
import Profile from '../pages/profile'


function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/mainPage' element={<MainPage />} />
                <Route path='/profile' element={<Profile />} />

            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes