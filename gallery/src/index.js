import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import { configureStore } from '@reduxjs/toolkit';
import authReducers from "./state/index"
import postReducers from './state/posts'
import friendsReducers from './state/friends'



const store = configureStore(
  {reducer :{
    auth : authReducers,
    posts :postReducers,
    friends : friendsReducers
  }})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store} >
    <App />
    </Provider>
  
  
);


