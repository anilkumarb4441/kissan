import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import leftArrow from "././../assets/images/new/left-arrow.svg";
import rightArrow from "././../assets/images/new/right-arrow.svg";

const OfferZone = (props) => {
  return (
    <section className="home-offerzone">
      <Container className="text-center">
        <h4 className="kg-title">OFFER ZONE</h4>
        <div
          className="card-container slick-initialized slick-slider slick-dotted"
          id="offer-zone-home"
          role="toolbar"
        >
          <button
            className="prev-arr off-arr slick-arrow"
            style={{ display: "block" }}
          >
            <img src={leftArrow} />
          </button>
          <div className="slick-list draggable">
            <div
              className="slick-track"
              role="listbox"
              // style={{opacity: '1', width: '13332px', transform: 'translate3d(-2424px, 0px, 0px)'}}
            >
              <div
                className="kg-card slick-slide slick-cloned"
                data-slick-index="-3"
                aria-hidden="true"
                tabindex="-1"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/tyres.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/tyres.png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-cloned"
                data-slick-index="-2"
                aria-hidden="true"
                tabindex="-1"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/veterinary_services.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/veterinary_services.png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-cloned"
                data-slick-index="-1"
                aria-hidden="true"
                tabindex="-1"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/wholesale_grocery.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/wholesale_grocery.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="0"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide00"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/biomass.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/biomass.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="1"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide01"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/borewell .png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/borewell .png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="2"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide02"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/catering.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/catering.png"
                />
              </div>

              <div
                class="kg-card slick-slide slick-current slick-active"
                data-slick-index="3"
                aria-hidden="false"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide03"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/cloths_and_handlooms.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/cloths_and_handlooms.png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-active"
                data-slick-index="4"
                aria-hidden="false"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide04"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/constructions.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/constructions.png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-active"
                data-slick-index="5"
                aria-hidden="false"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide05"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/crops.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/crops.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="6"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide06"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/fruits_and_vegetables.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/fruits_and_vegetables.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="7"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide07"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/harvesting.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/harvesting.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="8"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide08"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/home_appliances.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/home_appliances.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="9"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide09"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/horse_breeding.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/horse_breeding.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="10"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide010"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/horses.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/horses.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="11"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide011"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/interior_and_furnitures.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/interior_and_furnitures.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="12"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide012"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/livestock.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/livestock.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="13"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide013"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/livestock_breeding.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/livestock_breeding.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="14"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide014"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/livestock_feed.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/livestock_feed.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="15"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide015"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/machinery.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/machinery.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="16"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide016"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/pesticides.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/pesticides.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="17"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide017"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/photography.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/photography.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="18"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide018"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/property.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/property.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="19"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide019"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/pump_motor.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/pump_motor.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="20"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide020"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/pump_motor_repairs.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/pump_motor_repairs.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="21"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide021"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/silage.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/silage.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="22"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide022"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/spraying.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/spraying.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="23"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide023"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/transportation.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/transportation.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="24"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide024"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/tyres.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/tyres.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="25"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide025"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/veterinary_services.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/veterinary_services.png"
                />
              </div>
              <div
                class="kg-card slick-slide"
                data-slick-index="26"
                aria-hidden="true"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide026"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/wholesale_grocery.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/wholesale_grocery.png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-cloned"
                data-slick-index="27"
                aria-hidden="true"
                tabindex="-1"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/biomass.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/biomass.png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-cloned"
                data-slick-index="28"
                aria-hidden="true"
                tabindex="-1"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/borewell .png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/borewell .png"
                />
              </div>
              <div
                class="kg-card slick-slide slick-cloned"
                data-slick-index="29"
                aria-hidden="true"
                tabindex="-1"
                style={{ width: "364px" }}
              >
                <img
                  src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/catering.png"
                  alt="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/offers/catering.png"
                />
              </div>
            </div>
          </div>
          <button
            className="next-arr off-arr slick-arrow"
            style={{ display: "block" }}
          >
            <img src={rightArrow} />
          </button>
          <ul class="slick-dots" style={{ display: "block" }} role="tablist">
            <li
              class=""
              aria-hidden="true"
              role="presentation"
              aria-selected="true"
              aria-controls="navigation00"
              id="slick-slide00"
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                1
              </button>
            </li>
            <li
              aria-hidden="false"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation01"
              id="slick-slide01"
              class="slick-active"
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                2
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation02"
              id="slick-slide02"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                3
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation03"
              id="slick-slide03"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                4
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation04"
              id="slick-slide04"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                5
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation05"
              id="slick-slide05"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                6
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation06"
              id="slick-slide06"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                7
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation07"
              id="slick-slide07"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                8
              </button>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              aria-selected="false"
              aria-controls="navigation08"
              id="slick-slide08"
              class=""
            >
              <button type="button" data-role="none" role="button" tabindex="0">
                9
              </button>
            </li>
          </ul>
        </div>

        <p className="vw-all">View all</p>
      </Container>
    </section>
  );
};

export default OfferZone;
