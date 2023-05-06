import { useAppState } from 'provider/hooks';

import { Login } from 'pages/login/Login';
import { Dashboard } from 'pages/dashboard/Dashboard';

export const App = () => {
    const { user } = useAppState();
    return <>{user ? <Dashboard /> : <Login />}</>;
};
