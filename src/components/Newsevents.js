import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import righAdImg from "././../assets/images/new/add-board.png"
import News from "././../assets/images/new/ad-news.png"
import Events from "././../assets/images/new/ad-events.png"

const Newsevents = (props) => {
  return (
    <section className="home-newsevents">
      <Container className="text-center">
          <div className="top-sec">
            <div className="text-content">
                <h2>lets build your ad</h2>
                  <p>to get more cutomers with kisangateways 
                  <b> Ad Zone</b>
                </p>
                <button type="button" className="get-sted">Get started</button>
            </div>
            <div className="ad-img-cntr">
              <img  src={righAdImg} />
            </div>            
          </div>
          <div className="btm-sec">
                <div className="lts img-sec">
                    <h4>Latest news & events</h4>
                      <div className="imgs">
                      <img  src={News} alt="News"/>
                      <img  src={Events} alt="Events" />
                      </div>
                </div>
                <div className="lts info-sec">
                    <h4>Farmers guide and information</h4>
                      <div className="imgs">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam culpa nobis ad.</p>
                      <button type="button" className="read-more">Read More</button>
                      </div>
                </div>
            </div>

      </Container>
    </section>
  );
};

export default Newsevents;
