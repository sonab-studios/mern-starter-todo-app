import ReactDOM from 'react-dom/client';

import { Provider } from 'provider/Provider';
import { App } from 'pages/App';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider>
        <App />
    </Provider>,
);
