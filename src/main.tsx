import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import MainProvider from './providers/MainProvider/MainProvider'
import Main from './layout/Main/Main.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainProvider>
      <Main />
    </MainProvider>
  </React.StrictMode>,
)
