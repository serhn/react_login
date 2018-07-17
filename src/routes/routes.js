import Home from '../pages/home'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import NoMatch from '../pages/noMatch'
//MyListChannels
//import ListChannels from './ListChannels'

const routes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Home
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: '/playlist/:pls',
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: '/playlist/:pls/:channel',
        exact: false,
        auth: false,
        component: Home
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch
    }
];

export default routes;