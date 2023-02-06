import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import rightsideImg from "././../assets/images/about_right.png"

const About = (props) => {
  return (
    <section className="more_about">
      <Container>
          <Row>
              <Col md={6} className="center_align">
                  <div className="about_content">
                      <p className="h-head">"More About" <b>KISAN GATEWAY</b></p>
                      <p className="d-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                      
                    <button type="button">EXPLORE</button>
                      
                  </div>
              </Col>
              <Col md={6} >
                  <div className="">
                    <img width="100%" src={rightsideImg} />
                  </div>
              </Col>
          </Row>
      </Container>
    </section>
  );
};

export default About;
