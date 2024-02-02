import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {StoreProvider} from "./services/StoreProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <App />
    </StoreProvider>
)
