import React from 'react'
import ReactDOM from 'react-dom'
import './index.css' // Подключение стилей
import App from './App' // Подключение главного компонента

// Рендерим корневой компонент <App /> в div#root
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
