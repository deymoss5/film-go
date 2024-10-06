import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Подключение стилей
import App from './App' // Подключение главного компонента

// Рендерим корневой компонент <App /> в div#root

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
