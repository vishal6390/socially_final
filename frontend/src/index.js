import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider} from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { NewsDataContext } from './context/NewsDataContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContext>
      <NewsDataContext>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </NewsDataContext>
    </AuthContext>
  </BrowserRouter>
);
