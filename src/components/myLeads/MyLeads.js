import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import { getCurrentSession } from "../../endpoints/amplify/auth"  // its from amplify
import { API_PUBLIC_HOST } from '../Common/Constants'

//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import { FaExchangeAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoMdCalendar } from 'react-icons/io';
import {BiCheck} from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai';

//css
import './myLeads.css';
import OfferZone from '../OfferZone';
import AddAppointment from '../addAppoinment/addAppointment';
import CustomDateRange from '../RangeCalender/rangeCalender';
import Pagination from '../pagination/pagination';

const tractorImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qEL8Y1O9QeC81SXnqtpKF8ed1ty7ewbwTw&usqp=CAU'

export const DateObjectToString = (dateObj) => {
    let date = new Date(dateObj.getTime() + 19800000).toISOString().split("T")[0];
    return date;
};


const MyLeads = () => {

    const [dropdownOptions, setDropdownOption] = useState('lastOneWeek');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState(false);
    const [openPhoneNum, setOpenPhoneNum] = useState({ open: false, phoneNum: '' });
    const [leadType, setLeadType] = useState(''); //masterLead
    const [rangeDate, setRangeDate] = useState(null); //date range
    const [currentPage,setCurrentPage] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [totalCount, setTotalCount] = useState(20);
    const [phoneNuList, setPhoneNuList] = useState([]);
    const [addAppObj, setAddAppObj] = useState({})
    const [assignee, setAssignee] = useState('');
    const [sort, setSort] = useState({show:false, status:''});

    //api state
    const [listLeads, setListLeads] = useState({});

    const listLeadsArry = useMemo(() => {
        let list = listLeads?.leads?.map((item) => {
            let listMapObj = listLeads.listDetailMap[item.listId]
            let adressMapObj = listLeads.addressMap[listMapObj.address];
            return {
                ...item, ...listMapObj, ...adressMapObj
            }
        })
        return list;
    }, [listLeads]);

    console.log(listLeadsArry, 'listLeadsArry')

    let todayDateRange = DateObjectToString(new Date());


    // yestarday date
    let date = new Date()
    date.setDate(date.getDate() - 1)
    let yestardayRange = DateObjectToString(date);

    //last one week date
    let lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 6)
    let lastOneWeekDate = DateObjectToString(lastWeek);

    //last one month Date
    let lastMonth = new Date();
    lastMonth.setDate(1);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    let lastMonthDate = DateObjectToString(lastMonth);


    let setStartDate = dropdownOptions === 'today' ? todayDateRange : dropdownOptions === 'yestarday' ? yestardayRange : dropdownOptions === 'lastOneWeek' ? lastOneWeekDate : lastMonthDate
    let setEndDate = dropdownOptions === 'yestarday' ? yestardayRange : todayDateRange

    const fetchListLeads = () => {
        getCurrentSession((success, user, jwtToken) => {
            
            setAssignee(user.phone_number)
            const url = `${API_PUBLIC_HOST}/lead/listLeads`;
            var data = {
                listingId: "",
                page: {
                    pageNumber: currentPage,
                    pageSize: pageSize,
                },
                status: ["Active"],
                // sort:sort.status,
                // assigneeUserId:user.phone_number,
                startDate: setStartDate,
                endDate: setEndDate,
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
                    setTotalCount(response.data.response)
                    console.log(response.data.response)
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }

    useEffect(() => {
        fetchListLeads();
    }, [dropdownOptions, currentPage, sort.status]);



    const hourCaluculation = (date) => {
        let currentDate = new Date().getHours();
        let newDate = new Date(date).getHours()
        return currentDate - newDate
    }

    const onChangePhoneNumber = (asId)=>{
        if(phoneNuList.includes(asId)){
            const removeListId = phoneNuList.filter((item)=>item !== asId);
            setPhoneNuList(removeListId);
        }else{
            setPhoneNuList([...phoneNuList, asId]);
        }
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

                                <p className='filt_Leads'>{listLeadsArry?.length < 10 ? `0${listLeadsArry?.length}` : listLeadsArry?.length} leads in</p>
                                <div className="filterWraper" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <div className='filtrName'>
                                        <p>{dropdownOptions}</p>
                                        <IoMdArrowDropdown className={dropdownOpen ? 'iconRotateDrop' : ''} />
                                    </div>
                                    {dropdownOpen && <div className='filter_dropdown'>
                                        <p onClick={() => { setDropdownOption('today') }}>Today</p>
                                        <p onClick={() => { setDropdownOption('yestarday') }}>Yestarday</p>
                                        <p onClick={() => { setDropdownOption('lastOneWeek') }}>last one Week</p>
                                        <p onClick={() => { setDropdownOption('lastOneMonth') }}>last One Month</p>
                                    </div>}
                                </div>
                                <FaExchangeAlt className='leadsExchange_Icon'onClick={()=>setSort({...sort, show:true})} />

                            </div>
                        </div>
                        <div className='myLeads_cards_container'>
                            {listLeadsArry && listLeadsArry.length > 0 ?
                                listLeadsArry.map((item, idx) => {
                                    return (
                                        <div className='leadsCard' key={idx}>
                                            <div className='lead_info'>
                                                <div>
                                                    <h6>{item.name}</h6>
                                                    <p>Type of Vehicle: <span className='vehicleName'>catagory&gt;subCatagory</span></p>
                                                    <p>{item.houseNoStreet}, {item.villageCity}, {item.districtName}, {item.stateName}, {item.countryName} -{item.pincode}</p>
                                                </div>
                                                <div>
                                                    <p>{hourCaluculation(item.createdDate)} Hours Back</p>
                                                    {/* <p>{item.regNum} Model No</p> */}
                                                    <div className='leadDistance'>
                                                        <MdLocationPin />
                                                        <p>{item.distance} KM away</p>
                                                    </div>
                                                </div>
                                            </div>
                                           <div className="leadVehicle_parent">
                                           <div className='leadVehicle_info'>
                                                <div>
                                                    <img src={item.thumbnailUrl} alt="img" />
                                                </div>
                                                <div>
                                                    <p><span className='rupeeIcon'>₹ </span> <span className='leadsVehicle_price'>{item.price}</span></p>
                                                    <p><span className='vehicleName'>{item.title}- </span>{item.typeOfVehicle}</p>
                                                    <p>{item.subtitle}</p>
                                                    {/* <p style={{ visibility: item.regNo ? 'visible' : 'hidden' }}>Reg no: {item.regNo}</p> */}
                                                </div>
                                                
                                            </div>
                                            {assignee === item.createdBy ?
                                                <div className='leads_call' style={{ flexDirection: 'column', backgroundColor: '#EC9C01' }}>
                                                    <p className='masterLead_det' >Sheduled by: <span>{item.name}</span></p>
                                                    <p className='masterLead_det'>Date: <span>24/11/2021 - 9:00pm</span></p>

                                                </div>
                                                :
                                                <div className='leads_call'>
                                                    {/* <a href={`tel:${item.phone}`}> */}
                                                    <div onClick={() => {onChangePhoneNumber(item.listId)}}>
                                                        <BsTelephoneFill />
                                                        {phoneNuList.includes(item.listId) ? <p>{item.phoneNumber}</p> : <p>CALL NOW</p>}
                                                    </div>
                                                    {/* </a> */}
                                                    <div onClick={() => setAppointmentForm(true)}>
                                                        <IoMdCalendar />
                                                        <p>ADD APPOINMENT</p>
                                                    </div>
                                                </div>
                                            }
                                           </div>
                                            
                                        </div>
                                    )
                                })
                                :
                                <div className='recordsNotFound'>
                                    <h1>Records Not Found</h1>
                                </div>
                            }
                        </div>
                    </div>
                    <Pagination
                    className="pagination-bar"
                     currentPage={currentPage}
                     totalCount={20}
                     pageSize={pageSize}
                     onPageChange={setCurrentPage}
      />
                </div>
                <div class="top_banner_img col-md-10 mx-auto">
                    <img class="" alt="top_banner_img" src={topBanner} />
                </div>
            </div>
            <OfferZone />
            {appointmentForm ?
                <AddAppointment setAppointmentForm={setAppointmentForm} listLeadsArry={listLeadsArry} addAppObj={addAppObj}/>
                :
                null
            }
            {
                sort.show?<div className='sortOpt_container'>
                
                    <div className='Sort_Container'>
                    <div className="sortCloseIcon" onClick={()=>setSort({...sort, show:false})}><AiOutlineCloseCircle /></div>
                    <div className='sortSelect'>
                        <div className='compleateIcon' onClick={()=>setSort({show:false, status:'priceWise'})}>
                        {sort.status=== 'priceWise' && <BiCheck />}
                        </div>
                        <p>PRICE WISE</p>
                    </div>
                    <div className='sortSelect' onClick={()=>setSort({show:false, status:'loationWise'})}>
                        <div className='compleateIcon'>
                         {sort.status=== 'loationWise' && <BiCheck />}
                        </div>
                        <p>LOCATION WISE</p>
                    </div>
                    <div className='sortSelect' onClick={()=>setSort({show:false, status:'stateWise'})}>
                        <div className='compleateIcon'>
                         {sort.status=== 'stateWise' && <BiCheck />}
                        </div>
                        <p>STATE WISH</p>
                    </div>
                    <div className='sortSelect' onClick={()=>setSort({show:false, status:'latesOffer'})}>
                        <div className='compleateIcon'>
                         {sort.status=== 'latesOffer' && <BiCheck />}
                        </div>
                        <p>LATEST OFFERS</p>
                    </div>
                    </div>
                </div>
                :null
            }

        </section>

    );
};

export default MyLeads;