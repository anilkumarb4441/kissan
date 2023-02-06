import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import sell from "././../assets/images/new/sell-services.svg"
import buy from "././../assets/images/new/purchase.svg"
import services from "././../assets/images/new/services.svg"
import offerzone from "././../assets/images/new/offer-zone.svg"
import adzone from "././../assets/images/new/ad-zone.svg"

const Services = (props) => {
  // render() {
  return (
    <section className="offer_frist">
      <div className="container">
        <h3 className="section_head">SERVICES</h3>
        <p className="section_des">AREAS WHAT WE SERV</p>
        <div className="service-card-contianer">
          <div className="service_category" id="sell" data-info="sell">
            <div>
              <img src={sell} />
              {/* <img src="./images/new/sell-services.svg" /> */}
              <p>SELL</p>
            </div>
          </div>

          <div className="service_category" id="purchase" data-info="purchase">
            <div>
            <img src={buy} />
              {/* <img src="./images/new/purchase.svg" /> */}
              <p>BUY</p>
            </div>
          </div>

          <div className="service_category" id="services" data-info="services">
            <div>
            <img src={services} />
              {/* <img src="./images/new/services.svg" /> */}
              <p>SERVICES</p>
            </div>
          </div>

          <div className="service_category" id="offerzone" data-info="offerzone">
            <div>
            <img src={offerzone} />
              {/* <img src="./images/new/offer-zone.svg" /> */}
              <p>OFFER ZONE</p>
            </div>
          </div>
          <div className="service_category" id="adzone" data-info="adzone">
            <div>
            <img src={adzone} />
              {/* <img src="./images/new/ad-zone.svg" /> */}
              <p>AD ZONE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
