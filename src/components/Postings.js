import React, { Component,useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { CCardText, CCol, CLink } from '@coreui/react';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PostingCard from './Common/PostingCard';
import topBanner from "././../assets/images/page_top_banner.png"
import {signUp, confirmSignUp, signIn, getCurrentSession} from "../endpoints/amplify/auth"
import {TfiExchangeVertical} from 'react-icons/tfi';
import{FaChevronLeft, FaChevronRight,FaPlus} from 'react-icons/fa';
import {API_PUBLIC_HOST} from './Common/Constants'

const Postings = (props) => {
const [listingsList,setlistingsList] = useState([]);
const [langList,setLangList] = useState([]);
const [postingData,setpostingData] = useState([]);

const loadPostingsData = () => {
  getCurrentSession((success, user, jwtToken) => {
    const url = `${API_PUBLIC_HOST}/listing/listListingWithAddons`;
    var values = {
    _active: true,
    category_id: 0,
    listing_id: "",
    plan_id: "",
    user_id: user.phone_number,
    accessType: "DEALER",
    status: "",
    sort: {
        columnName: "Price",
        sortOrder: "desc"
    }
	};
    axios({
      method: 'post',
      url: url,
      data: values,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: jwtToken,
      },
    })
      .then((response) => {
			 setpostingData(response.data.response.listings)
        
      })
      .catch((error) => {
        console.log(error)
      });  
    })
    // let arr = localStorage.getItem('cardIds')
    // arr = JSON.parse(arr)
    // setpostingData(arr)
}


  useEffect(() => {
      console.log(localStorage.getItem('cardIds'))
    loadPostingsData()
    // loadLangdata()
      }, []);
  
  return (
    <>
    <main class="main_content listing-page">
    <div class="pg_top_banner">
      <div class="pg_top_bg">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="top_banner_img">
                <img class="" alt="top_banner_img" src={topBanner} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="lead_section">
      <div class="lead_main">
        <div class="container">
          <div class="lead_bg">
            <div class="row">
              <div class="flex-jcb-aic mb-4">
                <div class="laed_head">
                  <h2>
                    <span>My </span> Postings
                    {/* <span id="listingcountid"></span> */}
                    <span>{' '}({' '}{postingData?.length}{' '})</span>  
                  </h2>
                </div>
                <div class="flex-jce-aic">
                  <a class="top_link_box" href="">Genreal </a>
                  <a class="top_link_box" href="">Dealer </a>
                  <a class="top_link_box" href="">Service Providers </a>
                  <a class="top_link_box" href="">Offer Zone </a>
                  <a class="top_link_box" href="">Ad Zone </a>
                  <a class="top_link_box light_green_bg" href="">More <TfiExchangeVertical/>
                  </a>
                </div>
              </div>
              <div class="search_result_content">
                <div class="row">
                  <div class="col-md-12">
                    <div id="listings_container" class="row p-0">
                    {postingData && postingData.length > 0 &&
                        postingData.map((item) => {
                        return (
                            <PostingCard key={item.id} 
                            // planData={planData}
                            categoryId={item.categoryId} postingData = {postingData} item={item} />
                        )
                      })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-right mt-3">
              <button class="plain-btn" onclick="javascript:history.back();">
              <FaChevronLeft/> Back
              </button>

              <button class="green-btn">
                PROCEED <FaChevronRight/>
              </button>
            </div>
          </div>

          <div class="row pb-4">
            <div class="col-md-12">
              <div class="top_banner_img">
                <img class="" alt="top_banner_img" src={topBanner} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  

</>
  
  );
};

export default Postings;
