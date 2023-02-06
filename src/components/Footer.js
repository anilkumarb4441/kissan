import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ReactDOM from "react-dom";

import compLogo from "././../assets/images/new/company-logo.png"
import gPlay from "././../assets/images/new/g-play.png"

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Footer = (props) => {
  return (
    <footer className="kg-footer">
    <section className="top-footer container">
      <div className="first-column">
        <div className="logo-holder">
          <img src={compLogo} alt="" />
        </div>
        <p className="descri">Download the KIsan Gateway app & enjoy features</p>
        <div className="g-play-holder">
          <img src={gPlay} alt="" />
        </div>
        <div>
          <h5 className="follow">Follow Us</h5>
          <ul className="social-icon-container">
            <li data-media="instagram">
              <a href=""><i className="fab fa-instagram"></i></a>
            </li>
            <li data-media="twitter">
              <a href=""><i className="fab fa-twitter"></i></a>
            </li>
            <li data-media="youtube">
              <a href=""><i className="fab fa-youtube"></i></a>
            </li>
            <li data-media="facebook">
              <a href=""><i className="fab fa-facebook-f"></i></a>
            </li>
          </ul>
        </div>
        <div>
          <button className="language-btn">
            English
            <i className="ml-2 fas fa-caret-down"></i>
          </button>
        </div>
      </div>
      <div className="last-column">
        <div className="pages child">
          <h5 className="footer-ttl">pages</h5>
          <ul>
            <li onclick="refreshPage('')">Home</li>
            <li onclick="refreshPage('#aboutus')">About</li>
            <li>Services</li>
            <li>Offer Zone</li>
            <li>Ad Zone</li>
            <li onclick="refreshPage('#listings')">My Listing</li>
            <li>Payment Summary</li>
            <li>My Posting</li>
            <li onclick="refreshPage('#contactus')">Contact Us</li>
          </ul>
        </div>
        <div className="categories child">
          <h5 className="footer-ttl">Categories</h5>
          <ul>
            <li onclick="openCategorySellBuy(event,'buy',1)">Machinery</li>
            <li onclick="openCategorySellBuy(event,'buy',97)">Livestock</li>
            <li onclick="openCategorySellBuy(event,'buy',106)">Crop</li>
            <li onclick="openCategorySellBuy(event,'buy',113)">
              Property sale / contract
            </li>
            <li onclick="openCategorySellBuy(event,'buy',170)">Biomass</li>
            <li lang="en" onclick="openCategorySellBuy(event,'buy',182)">
              category.horse_dealer
            </li>
            <li lang="en" onclick="openCategorySellBuy(event,'buy',125)">
              category.fruits_and_vegetables
            </li>
            <li onclick="openCategorySellBuy(event,'buy',175)">Silage</li>
            <li onclick="openCategorySellBuy(event,'buy',126)">
              Pump / Motor Dealer
            </li>
            <li onclick="openCategorySellBuy(event,'buy',166)">
              Pesticides/ Fertilizer/ Seeds
            </li>
          </ul>
        </div>
        <div className="add-sub child">
          <h5 className="footer-ttl">Get in touch</h5>
          <div className="address-sec">
            No.253/6 & 7, Vasanthapura main Road, Near BRV school, Bangalore
            560078 Phone : +91 9513400800 Email : support@kisangateway.com
          </div>
          <div className="subscribe">
            <h5 className="footer-ttl">subscribe</h5>
            <div className="subscribe-form">
              <input type="text" placeholder="Your Email" name="" id="" />
              <button>subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bottom-footer">
      <div className="container">
        <div className="copy-right">
          2021 © Kisan Gateway. All Rights Reserved.
        </div>
        <div className="terms-policy">
          <ul>
            <li>Terms And Conditions</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Ads Policy</li>
          </ul>
        </div>
      </div>
    </section>
  </footer>
  );
};

export default Footer;
