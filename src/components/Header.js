import React, { useEffect, useState } from 'react'
// import { useLocation,useNavigate  } from 'react-router-dom'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../scss/style.scss'
import axios from 'axios';
import logo from '../assets/images/new/company-logo.png'
import profile from '../assets/images/profile.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fas } from '@fortawesome/fontawesome-free-solid'
import { FaCaretDown} from "react-icons/fa";
import Listings from './Listings';
import {API_PUBLIC_HOST} from './Common/Constants'
import {signUp, confirmSignUp, signIn, getCurrentSession} from "../endpoints/amplify/auth"
import Utils from '../common/utils';

const Header = (props) => {
  // const navigate = useNavigate();
  const [country, setCountry] = useState([]);
  const [loadListing, setloadListing] = useState(false);
  const [langList,setLangList] = useState([]);
 
  
const countryList = () => {
  getCurrentSession((success, user, jwtToken) => {
    const url = `${API_PUBLIC_HOST}/lookup/language`;
    
    axios({
      method: 'GET',
      url: url,
      // data: values,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: jwtToken,
      },
    })
      .then((response) => {
        console.log(response.data.response)
        setCountry(response.data.response) 
      })
      .catch((error) => {
        console.log(error)
      });  
    })
}

const ListingsLink =(event) => {
  event.preventDefault()
  setloadListing(true)
  Utils.refreshPage('sub/#/Listings');
  //  return <Route path="/Listings" component={<Listings />} />
  // navigate(`/Listings`);
}
const PostingsLink =(event) => {
  event.preventDefault()
  // setloadListing(true)
  Utils.refreshPage('sub/#/Postings');
}
  useEffect(() => {
   

  // event.preventDefault();
 


    }, []);

    return (
        <>
    {/* <div id="preloader">
    <div className="preloader-container">
      <div className="preloader-animation"></div>
    </div>
  </div> */}
  {/* {loadListing===true ? <Listings></Listings>:''} */}
  <header className="kg-navbar">
    <div className="container">
    <div className="logo-holder" onClick={() => Utils.refreshPage('/')}>
        <img src={logo} alt="" />
      </div>
      <div className="nav-container">
        <div className="topnav">
          <div className="kg-top-menu location-holder no-under">
            <i className="mr-2 fas fa-map-marker-alt"></i>
            Manglore
            {/* <i className="ml-2 fas fa-caret-down"></i> */}
            <FaCaretDown></FaCaretDown>
          </div>
          <ul className="left-list">
            <li className="kg-top-menu">
              <i className="mr-2 fas fa-mobile-alt"></i>
              download
            </li>
            <li className="kg-top-menu" onClick={() => Utils.refreshPage('#contactus')}>
              contact us
            </li>
            <li className="kg-top-menu" id="loginregisterdiv" lang="en" data-bs-toggle="modal" data-bs-target="#login_popup"
              onclick="loadCountryCodes()">
              LOGIN & REGISTER
            </li>
            <li className="kg-top-menu no-under list-dd" id="navLang">
              {/* <span className="disp">english</span> */}
              {/* <i className="ml-2 fas fa-caret-down"></i> */}
              <FaCaretDown onClick={countryList}></FaCaretDown>
              <ul key="favorites-list">
                {
                    country.map((favorite, idx) => {
                        return (<li key={`favorite-${idx}`}>
                          {favorite.display}
                        </li>);
                    })
                }
            </ul>
              <ul className="sub-list" id="language_selection"></ul>
            </li>
            <li id="header_notifications" className="kg-top-menu notification-bell no-under">
              <i className="ml-2 fas fa-bell"></i>
            </li>
            <li id="header_profile" className="kg-top-menu user-profile-cont no-under">
              <a className="user_p">
                <div id="header_name"></div>
                <img className="home_profile" style={{width: '2.25rem', height: '2.25rem', objectFit: 'cover', borderRadius: '50%',  borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgb(255, 255, 255)', borderImage: 'initial'}} src={profile} />
              </a>
              <div className="user_profile">
                <div className="nm_user">
                  <div id="header_name_popup"></div>
                  <span id="header_phone_number_popup"></span>
                </div>
                <div className="user_sort">
                  <p lang="en">My_Profile_Settings</p>
                </div>

                <div className="user_bttn">
                  <a href="">
                    <div lang="en" className="user_link">
                      <i className="fas fa-credit-card"></i>
                      My_transctions
                    </div>
                  </a>

                  <a href="">
                    <div lang="en" className="user_link">
                      <i className="fas fa-map-marker-alt"></i>
                      My_Address
                    </div>
                  </a>

                  <a href="">
                    <div lang="en" className="user_link">
                      <i className="fas fa-question-circle"></i>Support
                    </div>
                  </a>
                  <a href="javascript:getCurrentSession(printJWT)">
                    <div className="user_link"><i className="fas fa-key"></i>JWT</div>
                  </a>
                  <a href="javascript:refreshPage('#change_password')">
                    <div lang="en" className="user_link">
                      <i className="fas fa-key"></i>Change_Password
                    </div>
                  </a>
                </div>

                <a href="javascript:signOut(handleLogout);">
                  <div lang="en" className="log_out_user">Logout</div>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="bottomnav">
          <ul className="">
          <li className="" onClick={() => Utils.refreshPage("/")}>Home</li>
            <li className="no-under list-dd" id="navSell">
              Sell
              {/* <FontAwesomeIcon icon="fas fa-caret-down" /> */}
              <FaCaretDown></FaCaretDown>
              <ul className="sub-list">
                <li onclick="openCategorySellBuy(event,'sell',1)">
                  Machinery
                </li>
                <li onclick="openCategorySellBuy(event,'sell',97)">
                  Livestock
                </li>
                <li onclick="openCategorySellBuy(event,'sell',106)">Crop</li>
                <li onclick="openCategorySellBuy(event,'sell',113)">
                  Property Sale / contract
                </li>
                <li onclick="openCategorySellBuy(event,'sell',170)">
                  Biomass
                </li>
                <li lang="en" onclick="openCategorySellBuy(event,'sell',182)">
                  category.horse_dealer
                </li>
                <li lang="en" onclick="openCategorySellBuy(event,'sell',125)">
                  category.fruits_and_vegetables
                </li>
                <li onclick="openCategorySellBuy(event,'sell',175)">
                  Silage
                </li>
              </ul>
            </li>
            <li className="no-under list-dd" id="navBuy">
              Purchase
              {/* <i className="fas fa-caret-down"></i> */}
              <FaCaretDown></FaCaretDown>
              <ul className="sub-list">
                <li onclick="openCategorySellBuy(event,'buy',1)">
                  Machinery
                </li>
                <li onclick="openCategorySellBuy(event,'buy',97)">
                  Livestock
                </li>
                <li onclick="openCategorySellBuy(event,'buy',106)">Crop</li>
                <li onclick="openCategorySellBuy(event,'buy',113)">
                  Property Sale / contract
                </li>
                <li onclick="openCategorySellBuy(event,'buy',170)">
                  Biomass
                </li>
                <li lang="en" onclick="openCategorySellBuy(event,'buy',182)">
                  category.horse_dealer
                </li>
                <li lang="en" onclick="openCategorySellBuy(event,'buy',125)">
                  category.fruits_and_vegetables
                </li>
                <li onclick="openCategorySellBuy(event,'buy',126)">
                  Motor/ Water pumps
                </li>
                <li onclick="openCategorySellBuy(event,'buy',166)">
                  Pesticide/ fertilizer/ seeds
                </li>
                <li onclick="openCategorySellBuy(event,'buy',139)">
                  Live stock feed
                </li>
                <li onclick="openCategorySellBuy(event,'buy',79)">Tyre</li>
                <li onclick="openCategorySellBuy(event,'buy',175)">Silage</li>
              </ul>
            </li>
            <li className="no-under list-dd" id="navServ">
              Services
              {/* <i className="fas fa-caret-down"></i> */}
              <FaCaretDown></FaCaretDown>
              <ul className="sub-list">
                <li>Machinery Service</li>
                <li>Harvesting</li>
                <li>Veterinary Doctor</li>
                <li>Transportation</li>
                <li>Ambulance</li>
                <li>Spraying</li>
                <li>Borewell</li>
                <li>Water/ Soil Testing</li>
                <li>Motor/ Water Pump Services</li>
                <li>Horse Breading</li>
                <li>Livestock Breeding</li>
                <li>Horse & Dog Trainer</li>
                <li>Welding Works</li>
              </ul>
            </li>
            <li className="">Offer Zone</li>
            <li className="">Ad Zone</li>
            <li className="" onClick={e=>ListingsLink(e)}>My Listing</li>
            <li className="">Payment Summary</li>
            <li className="" onClick={e=>PostingsLink(e)}>My Posting</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
        </>
    )
}
export default  Header