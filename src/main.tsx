import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { BlueprintProvider } from './context/BlueprintContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <BlueprintProvider>
          <App />
          <SpeedInsights />
          <Analytics />
        </BlueprintProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
