import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';

function RootLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
