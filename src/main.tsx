import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { InstructorSocketProvider } from './context/socketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <InstructorSocketProvider>
      <App />
      </InstructorSocketProvider>
    </Provider>
  </StrictMode>,
)
