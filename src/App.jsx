import React from 'react';
import { Routes, Route} from 'react-router-dom'; 
import { ListProvider } from './Context/ListProvider';
import './App.css';
import { FormMarket } from './Page/Home/FormMarket'; 
import { HistoryProduct } from './Page/ListProduct/HistoryProduct';
import { Login } from './Page/Login/Login';
import { Register } from './Page/Register/Register';
import { Comparative } from './Page/Comparative/Comparative';
import { Resume } from './Page/Resume/Resume';





export const App = () => {
  return (
    <ListProvider>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<FormMarket />} />
        <Route path="/History" element={<HistoryProduct />} />
        <Route path="/Comparative" element={<Comparative />} />
        <Route path="/Resume" element={<Resume />} />
      </Routes>
    </ListProvider>
  );
};
