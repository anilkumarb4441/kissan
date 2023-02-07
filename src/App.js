import React, { Component, Suspense, useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer';
import Home from './components/Home';
import Amplify, { API, graphqlOperation, Auth, Storage  } from "aws-amplify";
import {signUp, confirmSignUp, signIn, getCurrentSession} from "./endpoints/amplify/auth.js"
import awsconfig from "./aws-exports";
import './App.css';
import OfferZone from './components/OfferZone';
import Newsevents from './components/Newsevents';
Amplify.configure(awsconfig);


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Listings = React.lazy(() => import('./components/Listings'))
const Postings = React.lazy(() => import('./components/Postings'))
const Dealer = React.lazy(() => import('./components/Dealer'))
const ServiceProvider = React.lazy(() => import('./components/ServiceProvider'))
const MyLeads = React.lazy(()=>import('./components/myLeads/MyLeads'))
const MyAppoinments = React.lazy(()=>import('./components/myAppoinments/MyAppoinments'))

function App() {
  useEffect(() => {
		getCurrentSession((success, user, jwtToken) => {
      console.log(user);
      document.getElementById('header_name').innerHTML = user.name;
      // alert(user.phone_number + " is logged in.")
    })
	}, []);
  

  return (
    <div className="App">
      <Header></Header>
       <HashRouter>
        <Suspense fallback={loading}>
          <Routes>          
            <Route path="/Listings" element={<Listings />} /> 
            <Route path="/Postings" element={<Postings />} />
            <Route path="/Dealer" element={<Dealer />} />  
            <Route path="/ServiceProvider" element={<ServiceProvider />} />       
            <Route path="/" element={<Home />} />
            <Route path="/MyLeads" element={<MyLeads />}/> 
            <Route path="/MyAppoinments" element={<MyAppoinments />}/>         
          </Routes>
        </Suspense>
      </HashRouter>    
    <Newsevents></Newsevents>
     <Footer></Footer>
    

    </div>
  );
}

export default App;
