import {
  Navigate,
  RouterProvider as BaseRouterProvider,
  createBrowserRouter,
} from 'react-router';

import ComponentsPage from '@/features/components-preview/ComponentsPage';
import DashboardPage from '@/features/dashboard/DashboardPage';

const router = createBrowserRouter([
  { path: '/', element: <DashboardPage /> },
  { path: '/design-system', element: <ComponentsPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function RouteProvider() {
  return <BaseRouterProvider router={router} />;
}
