import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
    <ChakraProvider>                
    <BrowserRouter>
      <AuthProvider>
        <Routes>                      
            <Route path="/*" element={<App/>}/>          
        </Routes>
      </AuthProvider>
    </BrowserRouter>             
    </ChakraProvider>
  </React.StrictMode>
)

// reload page lost signin 