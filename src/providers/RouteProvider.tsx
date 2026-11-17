import { useTranslation } from 'react-i18next';
import {
  Navigate,
  RouterProvider as BaseRouterProvider,
  createBrowserRouter,
} from 'react-router';

import ComponentsPage from '@/features/components-preview/ComponentsPage';

function HomePage() {
  const { t } = useTranslation();
  return (
    <main className="bg-surface flex min-h-screen items-center justify-center">
      <h1 className="text-primary text-3xl font-bold">{t('home.title')}</h1>
    </main>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/design-system', element: <ComponentsPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function RouteProvider() {
  return <BaseRouterProvider router={router} />;
}
