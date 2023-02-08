import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {getCurrentSession} from "../../endpoints/amplify/auth"
import {API_PUBLIC_HOST} from '../Common/Constants'

//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import { FaExchangeAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoMdCalendar } from 'react-icons/io';


//css
import './myLeads.css';
import OfferZone from '../OfferZone';
import AddAppointment from '../addAppoinment/addAppointment';

const MyLeads = () => {

    const [dropdownOptions, setDropdownOption] = useState('1 Day');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState(false);
    const [openPhoneNum, setOpenPhoneNum] = useState({open:false, phoneNum:''});
    const [leadType, setLeadType] = useState(''); //masterLead

    //api state
    const [listLeads, setListLeads] = useState([]);

    console.log(listLeads, 'listLeads')

    const fetchListLeads = ()=>{
        getCurrentSession((success, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/listLeads`;
            var data = {
                
                    accessType: "OTHERS",
                    listingId: "string",
                    page: {
                      pageNumber: 0,
                      pageSize: 0
                    },
                    sellerUserId: "string",
                    status: ["Active" ],
                    visitorUserId: "string"
                };
                axios({
                    method: 'post',
                    url: url,
                    data: data,
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                       Authorization: jwtToken,
                    },
                  })
                    .then((response) => {
                        setListLeads(response.data.response.leads)
                        console.log(response.data.response.leads)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }

    useEffect(()=>{
        fetchListLeads();
    },[dropdownOptions])

    const cardData = [
        {
            name: 'Rakesh Singh',
            typeOfVehicle: 'Tractor',
            address: `R R Nagar, south Bangalore Karnataka`,
            InTime: ' 2 Hours back',
            regNum: '241 DIS 48',
            distance: '18km away',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU',
            price: '5,54,000',
            brand: 'Mahidra',
            specification: ' YUVO 415 D, 45 HP',
            regNo: 'KA 09 N 2121 - 2018',
            phone: '9898656536'
        },
        {
            name: 'Rakesh Singh',
            typeOfVehicle: 'tractor',
            address: `R R Nagar, south Bangalore Karnataka`,
            InTime: ' 2 Hours back',
            regNum: '241 DIS 48',
            distance: '18km away',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU',
            price: '5,54,000',
            brand: 'Mahidra',
            specification: ' YUVO 415 D, 45 HP',
            phone: '9898651532'
        },
        {
            name: 'Rakesh Singh',
            typeOfVehicle: 'tractor',
            address: `R R Nagar, south Bangalore Karnataka`,
            InTime: ' 2 Hours back',
            regNum: '241 DIS 48',
            distance: '18km away',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU',
            price: '5,54,000',
            brand: 'Mahidra',
            specification: ' YUVO 415 D, 45 HP',
            phone: '9898956532'
        },
        {
            name: 'Rakesh Singh',
            typeOfVehicle: 'tractor',
            address: `R R Nagar, south Bangalore Karnataka`,
            InTime: ' 2 Hours back',
            regNum: '241 DIS 48',
            distance: '18km away',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU',
            price: '5,54,000',
            brand: 'Mahidra',
            specification: ' YUVO 415 D, 45 HP',
            phone: '9894656532'
        },
        {
            name: 'Rakesh Singh',
            typeOfVehicle: 'tractor',
            address: `R R Nagar, south Bangalore Karnataka`,
            InTime: ' 2 Hours back',
            regNum: '241 DIS 48',
            distance: '18km away',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU',
            price: '5,54,000',
            brand: 'Mahidra',
            specification: ' YUVO 415 D, 45 HP',
            phone: '9898256532'
        },
    ]


    return (

        <section className="My_leads">
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
            <div className='myLeads_container'>
                <div className="container">
                    <div className='myLeads_main'>
                        <div className='myLeads_head laed_head'>
                            <h2>
                                <span>My </span>Leads
                            </h2>
                            <div className="myleads_filter">
                                <p className='filt_Leads'>{cardData.length<10 ?`0${cardData.length}`:cardData.length} leads in</p>
                                <div className="filterWraper" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <div className='filtrName'>
                                        <p>{dropdownOptions}</p>
                                        <IoMdArrowDropdown className={dropdownOpen ? 'iconRotateDrop' : ''} />
                                    </div>
                                    {dropdownOpen && <div className='filter_dropdown'>
                                        <p onClick={() => { setDropdownOption('1 Day') }}>1 Day</p>
                                        <p onClick={() => { setDropdownOption('2 Day') }}>2 Day</p>
                                        <p onClick={() => { setDropdownOption('1 Week') }}>1 Week</p>
                                    </div>}
                                </div>
                                <FaExchangeAlt className='leadsExchange_Icon' />
                            </div>
                        </div>
                        <div className='myLeads_cards_container'>
                            {cardData && cardData.length > 0 &&
                                cardData.map((item, idx) => {
                                    return (
                                        <div className='leadsCard' key={idx}>
                                            <div className='lead_info'>
                                                <div>
                                                    <h6>{item.name}</h6>
                                                    <p>Type of Vehicel: <span className='vehicleName'>{item.typeOfVehicle}</span></p>
                                                    <p>{item.address}</p>
                                                </div>
                                                <div>
                                                    <p>{item.InTime}</p>
                                                    <p>{item.regNum}</p>
                                                    <div className='leadDistance'>
                                                        <MdLocationPin />
                                                        <p>{item.distance}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='leadVehicle_info'>
                                                <div>
                                                    <img src={item.img} alt="img" />
                                                </div>
                                                <div>
                                                    <p><span className='rupeeIcon'>₹ </span> <span className='leadsVehicle_price'>{item.price}</span></p>
                                                    <p><span className='vehicleName'>{item.brand}- </span>{item.typeOfVehicle}</p>
                                                    <p>{item.specification}</p>
                                                    <p style={{ visibility: item.regNo ? 'visible' : 'hidden' }}>Reg no: {item.regNo}</p>
                                                </div>
                                            </div>
                                           {leadType === 'masterLead'?
                                            <div className='leads_call' style={{flexDirection:'column'}}>
                                                <p className='masterLead_det'>Sheduled by: <span>{item.name}</span></p>
                                                <p className='masterLead_det'>Date: <span>24/11/2021 - 9:00pm</span></p>

                                            </div>
                                           :
                                           <div className='leads_call'>
                                                {/* <a href={`tel:${item.phone}`}> */}
                                                    <div onClick={()=>setOpenPhoneNum({open:true, phoneNum:item.phone})}>
                                                        <BsTelephoneFill />
                                                        {openPhoneNum.open && openPhoneNum.phoneNum ===  item.phone ? <p>{item.phone}</p>:  <p>CALL NOW</p>}
                                                    </div>
                                                {/* </a> */}
                                                <div onClick={()=>setAppointmentForm(true)}>
                                                    <IoMdCalendar />
                                                    <p>ADD APPOINMENT</p>
                                                </div>
                                            </div>
                                           }
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
                <div class="top_banner_img col-md-10 mx-auto">
                    <img class="" alt="top_banner_img" src={topBanner} />
                </div>
            </div>
            <OfferZone />
            { appointmentForm?
                <AddAppointment setAppointmentForm={setAppointmentForm} />
                :
                null
            }

        </section>

    );
};

export default MyLeads;