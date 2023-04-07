import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import CustomerHomePage from '~/components/CustomerHome/CustomerHomePage';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));

const Login = lazy(() => import('~/components/auth/Login'));
const Register = lazy(() => import('~/components/auth/Register'));

const ServiceCreatorPage = lazy(() => import('~/components/serviceCreator/ServiceCreatorPage'));

const ServicePage = lazy(() => import('~/components/services/ServicePage'));

const ServiceDetailPage = lazy(() => import('~/components/serviceDetail/ServiceDetailPage'));

const UserSettingPage = lazy(() => import('~/components/user/UserSettingPage'));

const CommentCard = lazy(() => import('~/components/comments/Comment'));

const AdminPage = lazy(() => import('~/components/admin/VerifyPage'));

const RequestHistoryPage = lazy(() => import('~/components/requestService/RequestHistoryPage'));

const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <div>
      <nav className="p-4 flex items-center justify-between">
        <span>Header</span>
      </nav>
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

/* Note from Oushuo: When creating a new page, add route at here */
const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
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
          element: <CommentCard uid="111" name="Annie" time={new Date()} rating={2} comment="very good" />,
        },
        {
          path: '/admin', // debug only
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
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
