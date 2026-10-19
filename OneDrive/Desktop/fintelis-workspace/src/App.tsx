// Replace: src/App.tsx
import { useRoute } from './lib/router';
import { Shell } from './components/Shell';
import { CustomCursor } from './components/CustomCursor';
import { PageSwitcher } from './components/PageSwitcher';
import Entry from './pages/Entry';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { SheetPage } from './pages/Sheet';
import { Placeholder } from './pages/Placeholder';

export default function App() {
  const route = useRoute();

  let body;
  if (route === '/' || route === '/login') body = <Entry />;            // Welcome <-> Login
  else if (route === '/signup') body = <Auth mode="signup" />;           // legacy page, kept reachable
  else {
    const page = route === '/home' ? <Dashboard /> : route.startsWith('/sheet') ? <SheetPage /> : <Placeholder route={route} />;
    body = <Shell route={route}>{page}</Shell>;                          // nav bar + page
  }

  return (
    <>
      <CustomCursor />
      {body}
      <PageSwitcher route={route} />
    </>
  );
}
