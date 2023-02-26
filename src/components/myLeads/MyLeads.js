import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import {getCurrentSession} from "../../endpoints/amplify/auth"  // its from amplify
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
import CustomDateRange from '../RangeCalender/rangeCalender';

const tractorImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU'

const MyLeads = () => {

    const [dropdownOptions, setDropdownOption] = useState('1 Day');
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [appointmentForm, setAppointmentForm] = useState(false);
    const [openPhoneNum, setOpenPhoneNum] = useState({open:false, phoneNum:''});
    const [leadType, setLeadType] = useState(''); //masterLead
    const [rangeDate, setRangeDate] = useState(null); //date range

    //api state
    const [listLeads, setListLeads] = useState({});

    const listLeadsArry = useMemo(()=>{
        // console.log(listLeads)
        let list = listLeads?.leads?.map((item)=>{
         let listMapObj = listLeads.listDetailMap[item.listId]
        let adressMapObj = listLeads.addressMap[listMapObj.address];
           return {
            ...item, ...listMapObj, ...adressMapObj
           }
        })
        // console.log(list, 'llllllllllllll');
return list;
    },[listLeads]);
    console.log(listLeadsArry);

    console.log(listLeads, 'listLeads');

    const fetchListLeads = ()=>{
        getCurrentSession((success, user, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/listLeads`;
            var data = {

                    // accessType: "OTHERS",
                    listingId: "",
                    page: {
                      pageNumber: 1,
                      pageSize: 10,
                    },
                    sellerUserId: "",
                    status: ["Active"],
                    visitorUserId: "",
                    sort:"LEAD_CREATED_DATE",
                    isAscendingSort:"false",
                    startDate:"2023-02-21",
                    endDate:"2023-02-25"
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
                        setListLeads(response.data.response);
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }
  
    useEffect(()=>{
        fetchListLeads();
    },[dropdownOptions]);

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

    const hourCaluculation = (date)=>{
      let currentDate = new Date().getHours();
      let newDate = new Date(date).getHours()
      return currentDate-newDate
    }

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
                            <CustomDateRange
                                range={rangeDate}
                                onChange={(arr) => {
                                setRangeDate(arr)
                                }} />
                                <p className='filt_Leads'>{listLeadsArry?.length<10 ?`0${listLeadsArry?.length}`:listLeadsArry?.length} leads in</p>
                                <div className="filterWraper" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <div className='filtrName'>
                                        <p>{dropdownOptions}</p>
                                        <IoMdArrowDropdown className={dropdownOpen ? 'iconRotateDrop' : ''} />
                                    </div>
                                    {dropdownOpen && <div className='filter_dropdown'>
                                        <p onClick={() => { setDropdownOption('1 Day') }}>1 Day</p>
                                        <p onClick={() => { setDropdownOption('2 Day') }}>yestarday</p>
                                        <p onClick={() => { setDropdownOption('1 Week') }}>last one Week</p>
                                        <p onClick={() => { setDropdownOption('1 Week') }}>last two Weeks</p>
                                    </div>}
                                </div>
                                <FaExchangeAlt className='leadsExchange_Icon' />
                            </div>
                        </div>
                        <div className='myLeads_cards_container'>
                            {listLeadsArry && listLeadsArry.length > 0 &&
                                listLeadsArry.map((item, idx) => {
                                    return (
                                        <div className='leadsCard' key={idx}>
                                            <div className='lead_info'>
                                                <div>
                                                    <h6>{item.name}</h6>
                                                    <p>Type of Vehicel: <span className='vehicleName'>{item.typeOfVehicle}</span></p>
                                                    <p>{item.houseNoStreet}, {item.villageCity}, {item.districtName}, {item.stateName}, {item.countryName} -{item.pincode}</p>
                                                </div>
                                                <div>
                                                    <p>{hourCaluculation(item.createdDate)} Hours Back</p>
                                                    <p>{item.regNum} Model No</p>
                                                    <div className='leadDistance'>
                                                        <MdLocationPin />
                                                        <p>{item.distance} KM away</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='leadVehicle_info'>
                                                <div>
                                                    <img src={item.thumbnailUrl !== null?item.thumbnailUrl:tractorImg} alt="img" />
                                                </div>
                                                <div>
                                                    <p><span className='rupeeIcon'>₹ </span> <span className='leadsVehicle_price'>{item.price}</span></p>
                                                    <p><span className='vehicleName'>{item.title}- </span>{item.typeOfVehicle}</p>
                                                    <p>{item.subtitle}</p>
                                                    <p style={{ visibility: item.regNo ? 'visible' : 'hidden' }}>Reg no: {item.regNo}</p>
                                                </div>
                                            </div>
                                           {leadType === 'masterLead'?
                                            <div className='leads_call' style={{flexDirection:'column', backgroundColor:'#EC9C01'}}>
                                                <p className='masterLead_det' >Sheduled by: <span>{item.name}</span></p>
                                                <p className='masterLead_det'>Date: <span>24/11/2021 - 9:00pm</span></p>

                                            </div>
                                           :
                                           <div className='leads_call'>
                                                {/* <a href={`tel:${item.phone}`}> */}
                                                    <div onClick={()=>setOpenPhoneNum({open:true, phoneNum:item.listId})}>
                                                        <BsTelephoneFill />
                                                        {openPhoneNum.open && openPhoneNum.phoneNum ===  item.listId ? <p>{item.phoneNumber}</p>:  <p>CALL NOW</p>}
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
                <AddAppointment setAppointmentForm={setAppointmentForm} listLeadsArry={listLeadsArry}/>
                :
                null
            }

        </section>

    );
};

export default MyLeads;