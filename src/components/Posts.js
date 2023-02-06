import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Posts = (props) => {
  return (
    <section className="login_div">
      <div className="container">
        <h3 className="section_head theme_color">WHY KISAN GATWAY</h3>

        <p className="section_des">SOME REASONS</p>
        <Row>
            <Col md={4}>
                <div className="login_counter" >
                    <h3>250k+</h3>
                    <p>Happy Users</p>
                </div>
            </Col>
            <Col md={4}>
                <div className="login_counter" >
                <h3>800+</h3>
              <p>Verified Experts</p>
                </div>
            </Col>
            <Col md={4}>
                <div className="login_counter" >
                <h3>200+</h3>
              <p>categories</p>
                </div>
            </Col>
        </Row>
        <hr className="mt-5"/>
        <h3 className="section_head mt-5">Login & Post a AdS & OFFERS</h3>
        <p className="section_des">SOME REASONS</p>
        <div className="text-center">
            <button className="button send_otp_reg ">Login</button>
        </div>
        <p className="des_offer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
        
      </div>
    </section>
  );
};

export default Posts;
