
import ReactDOM from 'react-dom/client';
import './style.css';
import reportWebVitals from './reportWebVitals';

import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { AppContextProvider } from './contexts/appContext';
import NewOrganizationScreen from './Screens/NewOrganizationScreen/NewOrganizationScreen';
import SignInScreen from './Screens/SignInScreen/SignInScreen';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div>  
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    <AuthProvider>
    <AppContextProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/signin" element={<SignInScreen/>}/>
    <Route path="/newOrganization" element={<NewOrganizationScreen/>}/>
    <Route path="/*" element={<Layout/>}/>
    </Routes>
    </BrowserRouter>
    </AppContextProvider>
    </AuthProvider>
    </div>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
