import React, { Component,useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { CCardText, CCol, CLink } from '@coreui/react';
import axios from 'axios'
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ResuableCard from './Common/ResuableCard';
import topBanner from "././../assets/images/page_top_banner.png"
import {signUp, confirmSignUp, signIn, getCurrentSession} from "../endpoints/amplify/auth"
import {TfiExchangeVertical} from 'react-icons/tfi';
import{FaChevronLeft, FaChevronRight,FaPlus,FaTag} from 'react-icons/fa';
import {API_PUBLIC_HOST} from './Common/Constants'
import { Col } from "react-bootstrap";
import Postings from './Postings';
import Utils from '../common/utils';
import { setGeneralListings } from "./action"

const data=[
  {
    id:1,
    price:10000,
    thumbnailUrl:"https://thumbs.dreamstime.com/z/indian-farmer-holding-crop-plant-his-wheat-field-indian-farmer-holding-crop-plant-his-wheat-field-123557695.jpg",
  },
  {
    id:2,
    price:20000,
    thumbnailUrl:"https://thumbs.dreamstime.com/z/indian-farmer-holding-crop-plant-his-wheat-field-indian-farmer-holding-crop-plant-his-wheat-field-123557695.jpg",
  },
  {
    id:3,
    price:30000,
    thumbnailUrl:"https://thumbs.dreamstime.com/z/indian-farmer-holding-crop-plant-his-wheat-field-indian-farmer-holding-crop-plant-his-wheat-field-123557695.jpg",
  },
  // {
  //   id:4,
  //   price:10000,
  //   thumbnailUrl:"https://thumbs.dreamstime.com/z/indian-farmer-holding-crop-plant-his-wheat-field-indian-farmer-holding-crop-plant-his-wheat-field-123557695.jpg",
  // },
  // {
  //   id:5,
  //   price:20000,
  //   thumbnailUrl:"https://thumbs.dreamstime.com/z/indian-farmer-holding-crop-plant-his-wheat-field-indian-farmer-holding-crop-plant-his-wheat-field-123557695.jpg",
  // },
  // {
  //   id:6,
  //   price:30000,
  //   thumbnailUrl:"https://thumbs.dreamstime.com/z/indian-farmer-holding-crop-plant-his-wheat-field-indian-farmer-holding-crop-plant-his-wheat-field-123557695.jpg",
  // }
];
const Listings = (props) => {
const [listingsList,setlistingsList] = useState([]);
const [langList,setLangList] = useState([]);
const [planData,setPlanData] = useState([]);
const [dealer,setDealer] = useState(false);

const loadListingdata = () => {
  getCurrentSession((success, user, jwtToken) => {
    const url = `${API_PUBLIC_HOST}/listing/listListingWithAddons`;
    var values = {
      // _active: true,
      // category_id: 0,
      // listing_id: "",
      // plan_id: "",
      // user_id: user.phone_number,
      _active: true,
      category_id: 0,
      listing_id: "",
      plan_id: "",
      user_id: user.phone_number,
      accessType: "OTHERS",
      status: "DRAFT",
      sort: {
        columnName: "Price",
        sortOrder:"desc"
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
        let arr  = JSON.parse(localStorage.getItem('cardIds'))
        let finalArr=[]
        let intermediate=[]
        setlistingsList(response.data.response.listings) 
          setPlanData(response.data.response.planData)
          props.setGeneralListings(response.data.response.listings)
        // if(arr && arr.length > 0 ) {
        //   for (let i =0;i<arr?.length;i++) {
        //     finalArr.push(arr[i].id)
        //   }
        //   for (let j =0; j < response.data.response.listings?.length; j++) {
        //     if(!finalArr.includes(response.data.response.listings[j].id) ) {
        //       intermediate.push(response.data.response.listings[j])
        //     }
        //   }
        //   setlistingsList(intermediate) 
        //   setPlanData(response.data.response.planData)
        // } else {
        //   setlistingsList(response.data.response.listings) 
        //   setPlanData(response.data.response.planData)
        // }
        
      })
      .catch((error) => {
        console.log(error)
      });  
    })
}
  useEffect(() => {
    loadListingdata()
    // loadLangdata()
      }, []);

    const test = (e) => {
      e.preventDefault()
      Utils.refreshPage('sub/#/Listings');
    }

    const test1 =(event) => {
      event.preventDefault()
      Utils.refreshPage('sub/#/Dealer');
    }
    const ServiceListing = (event) => {
      event.preventDefault()
      Utils.refreshPage('sub/#/ServiceProvider');
    }
  
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
                    <span>My </span> Listings
                    {/* <span id="listingcountid"></span> */}
                    <span>{' '}({' '}{props.generalListings?.length}{' '})</span>  
                  </h2>
                </div>
                <div class="flex-jce-aic">
                  <a class="top_link_box" href="" onClick={e=>test(e)}>Genreal </a>
                  <a class="top_link_box" href="" onClick={e=>test1(e)}>Dealer </a>
                  <a class="top_link_box" href="" onClick={e=>ServiceListing(e)}>Service Providers 
                  </a>
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

                    {props.generalListings && props.generalListings.length > 0 ?
                         
                         <ResuableCard  type={'General'}
                         planData={planData}
                          listingsList = {listingsList}  />
                         :''
                    
                   }
                    {/* {listingsList && listingsList.length > 0 &&
                        listingsList.map((item) => {
                        return (
                         
                            <ResuableCard key={item.id} type={'General'}
                            planData={planData}
                            categoryId={item.categoryId} listingsList = {listingsList} item={item} />
                        )
                      })} */}
                      
                        <div class="add_more_listing">
                          <div>
                            <h3><FaPlus/></h3>
                            <p>Add more listing</p>
                          </div>
                        </div>
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
    {/* price- section */}
    <div class="paymrnt_form">
      <div class="payment_total">
        <form class="">
          <div class="row p-0" style={{display:'flex',padding:'5px 0'}}>
            <div class="form_div col-md-6" style={{width:'30%',paddingRight:'20px'}}>
              <label for="harvester" class="form-label"
                >Apply Coupon</label
              >
              <select class="form-select" style={{width:'100%'}}  id="harvester">
                <option selected>
                 <FaTag /> Apply Coupon
                </option>
                <option value="1">Swaraj</option>
                <option value="2">Jone Deere</option>
                <option value="3">Swaraj</option>
              </select>
            </div>

            <div class="form_div col-md-6" style={{width:'30%'}}>
              <label for="modal" class="form-label"
                >Choose billing name
                <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="modal"
                placeholder="Select billing name "
                style={{width:'100%'}}
              />
            </div>
          </div>

          <div class="d-flex payment_total_main">
            <div class="w-100 text-left" style={{padding:'10px 0px'}}>
              <p class="price_head">
                <b  style={{fontSize:'larger'}}>Price Details</b> <span>(4 Items)</span>
              </p>
            </div>
          <div style={{display:'flex',padding:'5px 0',width:'100%'}}>
            <div class="w-50 payment_total text-left" >
              <p>
                Total Price <br />Coupon Discount
                <span class="green_color" >(KISAN-55)</span>
              </p>
            </div>
            <div class="w-50 payment_total text-right">
              <p>
                ₹ 17,450 <br />
                <span class="green_color">- ₹ 2000</span>
              </p>
            </div>
            </div>
            <div style={{display:'flex',padding:'10px 0',width:'100%'}}>
              <div class="w-50 text-left">
                <p class="price_head" style={{fontSize:'larger'}}><b>Total AMOUNT</b></p>
              </div>
              <div class="w-50 text-right">
                <p class="price_head" style={{fontSize:'larger'}}><b>₹ 15450</b></p>
              </div>
            </div>
            <div class="w-100">
              <div class="agree_c" style={{display:'flex',justifyContent:'space-between'}}>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    I Agree to the terms & conditions
                  </label> 
                </div>
                <div>
                <a class="text-right" href="">
                  <button class="green-btn text-right">
                  proceed <FaChevronRight/>
                  </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>          
                
    {/* price section end */}

      
    </section>
  </main>
  

</>
  
  );
};

{/* export default Listings; */}
const mapStateToProps = (state) => {
  return {
    generalListings:state.dealer.generalListings
  };
};

export default connect(mapStateToProps, {
  setGeneralListings,
})(Listings);