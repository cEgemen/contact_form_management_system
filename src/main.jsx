import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './management/store/store.jsx'
import "./index.css"
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App  />  
    </Provider>
)
