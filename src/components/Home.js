import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import LandingPageCarousel from './LandingPageCarousel';
import Services from './Services';
import Posts from './Posts';
import About from './About';

import OfferZone from './OfferZone';

const Home = (props) => {
  return (
   <>
    <LandingPageCarousel></LandingPageCarousel>
     <Services></Services>
     <Posts></Posts>
     <About></About>
     <OfferZone></OfferZone>
     {/* <Newsevents></Newsevents> */}
   </>
  );
};

export default Home;
