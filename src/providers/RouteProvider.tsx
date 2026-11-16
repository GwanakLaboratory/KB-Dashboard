import { useTranslation } from 'react-i18next';
import {
  Navigate,
  RouterProvider as BaseRouterProvider,
  createBrowserRouter,
} from 'react-router';

function HomePage() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface">
      <h1 className="text-3xl font-bold text-primary">{t('home.title')}</h1>
    </main>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function RouteProvider() {
  return <BaseRouterProvider router={router} />;
}
