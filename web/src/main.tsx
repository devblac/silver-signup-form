import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/tokens.css";
import "./styles/layout.css";
import "./styles/form.css";
import "./styles/utilities.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
