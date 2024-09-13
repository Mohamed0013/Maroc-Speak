import {Navigate, createBrowserRouter} from "react-router-dom"; 
import Login from "./components/guest/login.jsx"
import Signup from "./components/guest/Signup.jsx"
import Users from "./components/admin/Users.jsx"
import Notfound from "./views/notfound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx"
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx"
import UserForm from "./views/UserForm.jsx";
import RootLayout from "./layouts/RouteLayout.jsx";
import Profile from "./components/user/profile.jsx";
import AdminLayout from '../src/layouts/AdminLayout.jsx'
import Admin_dashboard from './components/admin/Admin_dashboard.jsx'
import Adminprofile from './views/Adminprofile.jsx'
import Edituser from "./views/EditUser.jsx";
import Home from "./components/user/home.jsx";
import Categories from "./components/user/categories/Categories.jsx";
import Profcourses from "./components/user/prof/courses.jsx";
import Mycourses from "./components/user/prof/mycourses.jsx";
import Profquiz from "./components/user/prof/Quiz/quiz.jsx";
import Profactivities from "./components/user/prof/Activities/activities.jsx";
import Addcourse from "./components/addcourse.jsx"
import CourseDetails from "./components/user/prof/course_details.jsx";

const router = createBrowserRouter([
    {
        path : '/',
        element : <RootLayout />,
    children : [
        {
            path : '/',
            element : <Home />
        }
    ]
},
    {
        path : '/',
        element : <GuestLayout />,
        children : [
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '/signup',
                element : <Signup />
            }
        ]
    },
    {
        path : '/',
        element : <DefaultLayout />,
        children : [
            {
                path : '/',
                element : <Navigate to={'/'} />
                // element : <RootLayout />
            },
            {
                path : '/dashboard',
                element : <Dashboard />
            },
            {
                path : '/Edit/account/:id',
                element : <Edituser />
            },
            {
                path : '/usersinfo/profile/:id',
                element : <Profile />
            },
            {
                path : '/users',
                element : <Navigate to={'/admin'} />
            },
            {
                path : '/new user',
                element : <Navigate to={'/admin'} />
            },
            {
                path : '/users/:id',
                element : <Navigate to={'/admin'} />
            },
            {
                path : '/categories',
                element : <Categories />
            },
            {
                path : '/prof_courses',
                element : <Profcourses />
            },
            {
                path : '/my_courses',
                element : <Mycourses />
            },
            {
                path : '/addcourse/:id',
                element : <Addcourse />
            },
            {
                path : '/Profquiz',
                element : <Profquiz />
            },
            {
                path : '/Profactivities',
                element : <Profactivities />
            },
            {
                path : '/course_details',
                element : <CourseDetails />
            }
        ]
    },
    {
        path : '/admin',
        element : <AdminLayout />,
        children : [
            {
                path : '',
                element : <Admin_dashboard />
                // element : <Navigate to={'/'} />
            },
            {
                path : 'users',
                element : <Users />
            },
            {
                path : 'new/user',
                element : <UserForm key={"userCreate"}/>
            },
            {
                path : 'users/:id',
                element : <UserForm key={"userUpdate"}/>
            },
            {
                path : 'users/profile/:id',
                element : <Adminprofile />
            },
            { 
                path : 'dashboard',
                element : <Admin_dashboard />
            }
        ]
    },
    {
        path : '*',
        element : <Notfound />
    }
])

export default router;