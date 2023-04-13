import { Dialog } from '@headlessui/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom'
import { Head } from '~/components/Head'
import { AuthMap } from '~/services/lib/constants'
import { useAuthState } from '~/utils/hooks/UserContext'

const Loading = () => <p className='p-4 w-full h-full text-center'>Loading...</p>

// ! Please must use lazy import instead of direct import to avoid dependency error
const CustomerHomePage = lazy(() => import('~/pages/HomePage/CustomerHomePage/CustomerHomePage'))

const IndexScreen = lazy(() => import('~/pages/HomePage/IndexPage/Index'))

const Login = lazy(() => import('~/pages/AuthPage/LoginPage/LoginPage'))

const Register = lazy(() => import('~/pages/AuthPage/RegisterPage/RegisterPage'))

const ServiceCreatorPage = lazy(() => import('~/pages/ServicePage/ServiceCreatorPage/ServiceCreatorPage'))

const ServicePage = lazy(() => import('~/pages/ServicePage/ServiceListPage/ServicePage'))

const ServiceDetailPage = lazy(() => import('~/pages/ServicePage/ServiceDetailPage/ServiceDetailPage'))

const UserSettingPage = lazy(() => import('~/pages/SettingPage/UserSettingPage'))

const CommentCard = lazy(() => import('~/components/Card/CommentCard'))

const RequestHistoryPage = lazy(() => import('~/pages/RequestPage/RequestServicePage/RequestHistoryPage'))

const AdminPage = lazy(() => import('~/pages/AdminPage/VerifyProviderPage/VerifyProviderPage'))

const RequestListPage = lazy(() => import('~/pages/RequestPage/RequestManagementPage/RequestListPage'))

const ProviderHomePage = lazy(() => import('~/pages/HomePage/ProviderHomePage/ProviderHomePage'))

const Page404Screen = lazy(() => import('~/pages/ErrorPage/404'))

function Layout() {
    return (
        <div>
            <nav className='p-4 flex items-center justify-between'>
                <span>Header</span>
            </nav>
            <Outlet />
        </div>
    )
}

export const Router = () => {
    return (
        <BrowserRouter>
            <InnerRouter />
        </BrowserRouter>
    )
}

/* Note from Oushuo: When creating a new page, add route at here */
const InnerRouter = () => {
    const { state } = useAuthState()
    const pages = [
        {
            path: '/',
            element: <IndexScreen />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/service-creator',
            element: <ServiceCreatorPage />,
        },
        {
            path: '/customer-home',
            element: <CustomerHomePage />,
        },
        {
            path: '/services',
            element: <ServicePage />,
        },
        {
            path: '/service/:serviceId',
            element: <ServiceDetailPage />,
        },
        {
            path: '/setting', //  debug only
            element: <UserSettingPage />,
        },
        {
            path: '/comment', //  debug only
            element: <CommentCard uid='111' name='Annie' time={new Date()} rating={2} comment='very good' />,
        },
        {
            path: '/admin',
            element: <AdminPage />,
        },
        {
            path: '*',
            element: <Page404Screen />,
        },
        {
            path: '/requestHistory',
            element: <RequestHistoryPage />,
        },
        {
            path: '/request-list',
            element: <RequestListPage serviceId='5G7ltzuDxBVx47P8evXT' />, // TODO: add a father page, and pass serviceId to RequestListPage
        },
        {
            path: '/provider-home',
            element: <ProviderHomePage />,
        },
    ]

    const routes: RouteObject[] = [
        {
            path: '/',
            element: <Layout />,
            children: pages.map((page) => ({
                path: page.path,
                element: <>{AuthMap.get(state.userType) && page.element}</>,
            })),
        },
    ]
    const element = useRoutes(routes)
    return (
        <div>
            <Head />
            <Suspense fallback={<Loading />}>{element}</Suspense>
        </div>
    )
}
