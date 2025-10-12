import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter ,Routes ,Route} from "react-router";
import Details from './components/Basic_Com/Details/Details.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/d/:id" element={<Details />} />
    </Routes>
  </BrowserRouter>,
)
