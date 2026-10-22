// Replace: src/App.tsx
import { useEffect } from 'react';
import { go, useRoute } from './lib/router';
import { useAuth } from './lib/auth';
import { Shell } from './components/Shell';
import { CustomCursor } from './components/CustomCursor';
import { PageSwitcher } from './components/PageSwitcher';
import { Mark } from './components/Backdrop';
import Entry from './pages/Entry';
import { Dashboard } from './pages/Dashboard';
import { SheetPage } from './pages/Sheet';
import { Placeholder } from './pages/Placeholder';

export default function App() {
  const route = useRoute();
  const { user, loading } = useAuth();
  const isEntry = route === '/' || route === '/login' || route === '/signup'; // Welcome, Login, Sign up

  // Guard: signed-out people can only see the front door; signed-in people skip login/sign-up.
  useEffect(() => {
    if (loading) return;
    if (!user && !isEntry) go('/login');
    if (user && (route === '/login' || route === '/signup')) go('/home');
  }, [loading, user, route, isEntry]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-brand-dark"><span className="animate-pulse"><Mark /></span></div>;
  }

  let body;
  if (isEntry) body = <Entry />;
  else if (!user) body = null; // redirecting to /login
  else {
    const page = route === '/home' ? <Dashboard /> : route.startsWith('/sheet') ? <SheetPage /> : <Placeholder route={route} />;
    body = <Shell route={route}>{page}</Shell>;
  }

  return (
    <>
      <CustomCursor />
      {body}
      <PageSwitcher route={route} />
    </>
  );
}
