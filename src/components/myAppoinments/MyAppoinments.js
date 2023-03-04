import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { getCurrentSession } from "../../endpoints/amplify/auth"
import { API_PUBLIC_HOST } from '../Common/Constants'

//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import { FaExchangeAlt, FaCalendarDay } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'
import { MdEdit, MdError, MdArrowBackIosNew } from 'react-icons/md'
import {BiCheck} from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai';


//css 
import './myAppoinment.css';
import ReactTable from '../table/ReactTable';

//components
import AddAppointment from '../addAppoinment/addAppointment';
import Pagination from '../pagination/pagination';

export const DateObjectToString = (dateObj) => {
    let date = new Date(dateObj.getTime() + 19800000).toISOString().split("T")[0];
    return date;
};


const MyAppoinment = () => {

    const [dropdownOptions, setDropdownOption] = useState('lastOneWeek'); // filter dropdownState
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addAppoinMent, setAddAppoinMent] = useState(false);
    const [showOPerator, setShowOperartor] = useState(false);
    const [chooseOPerator, setchooseOPerator] = useState('Choose Operators')
    const [masterAppointment, setMasterAppointment] = useState('') // master keyword for master appointmemts
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: '' }); //delete popup
    const [appomtList, setAppontList] = useState([]) //appointmentList
    const [succMsg, setSuccMsg] = useState('')
    const [sort, setSort] = useState({show:false, status:''});
    const [currentPage,setCurrentPage] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [totalCount, setTotalCount] = useState(20);


    const [editObj, setEditObj] = useState({});
    const [assignee, setAssignee] = useState('');


    function tConvert(timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }

    const onChangeTableStatus = (item, targetVal, index1) => {
        let targetStatus = appomtList.find((val) => val.id === item.id);
        let targIndex = { ...targetStatus, status: targetVal.target.value }
        var matchtheArray = appomtList.filter(x => x.id !== item.id);
        matchtheArray.splice(index1, 0, targIndex)
        setAppontList(matchtheArray);
    }

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



    const columns = [
        {
            Header: 'Name',
            accessor: 'buyerName',

        },
        {
            Header: 'Contact No',
            accessor: 'buyerId',

        },
        {
            Header: 'Assigne Name',
            accessor: 'AssigneName',

        },
        {
            Header: 'Time',
            accessor: 'appointmentDate',
            Cell: (props) => {
                let timeTake = props.cell.row.original.appointmentDate
                let hour = new Date(timeTake).getHours();
                let minuts = new Date(timeTake).getMinutes();
                return <div><p>{tConvert(`${hour}:${minuts}`)}</p></div>
            }

        },
        {
            Header: 'Location',
            accessor: 'location',

        },
        {
            Header: 'Type of Lead',
            accessor: '',

        },
        {
            Header: 'status',
            accessor: 'status',
            Cell: (props) => {
                // {props.cell.row.id}
                return <div className='apoointTable_status'>
                    {assignee === props.cell.row.original.sellerId ?<p>{props.cell.row.original.status}</p>
                    :
                    <select className='statusDropdown_tabel' value={props.cell.row.original.status} onChange={(e) => onChangeTableStatus(props.cell.row.original, e, props.cell.row.id)}>
                        <option value='Open'>Open</option>
                        <option value='Completed'>Completed</option>
                        <option value='NotInterested'>NotInterested</option>
                        <option value='CancelledBySeller'>CancelledBySeller</option>
                        <option value='CancelledByBuyer'>CancelledByBuyer</option>
                    </select>}
                </div>
            }

        },
        {
            Header: '.',
            accessor: '',
            Cell: (props) => {
                return <>{assignee === props.cell.row.original.sellerId ?null: <div className='apooinTable_icon' onClick={() => { setEditObj(props.cell.row.original); setAddAppoinMent(true) }}><MdEdit /></div>}</>
            }
        },
        {
            Header: ',',
            accessor: '',
            Cell: (props) => {
                return <>{assignee === props.cell.row.original.sellerId ?null:<div className='apooinTable_icon' onClick={() => { setDeleteConfirm({ open: true, id: props.cell.row.original.id }); }}><MdDelete /></div>}</>
            }
        },
    ] 


  


    const listAppointWithMetaData = () => {
        getCurrentSession((success, user, jwtToken) => {
            setAssignee(user.phone_number);
            const url = `${API_PUBLIC_HOST}/lead/listAppointmentsWithMetadata`;
            var data = {
                sellerUserId: "",
                assigneeUserId: user.phone_number,
                startDate: setStartDate,
                endDate: setEndDate,
                page: {
                    pageNumber: currentPage,
                    pageSize: pageSize,
                },
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
                    // console.log(response.data);
                    setAppontList(response.data.response.appointments);
                    // for master user.mob === sellerId
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }

    useEffect(() => {
        listAppointWithMetaData();
    }, [dropdownOptions, currentPage])

    const deleteAppointMent = () => {
        getCurrentSession((success, jwtToken) => {
            const url = `${API_PUBLIC_HOST}/lead/deleteAppointment?appointmentId=${deleteConfirm.id}`;

            axios({
                method: 'delete',
                url: url,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: jwtToken,
                },
            })
                .then((response) => {
                    console.log(response.data.response.leads);
                    setSuccMsg(response.data.message)
                    setTimeout(() => {
                        setSuccMsg('');
                        listAppointWithMetaData()
                        setDeleteConfirm({ open: false, id: '' });
                    }, 3000)

                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }


    return (
        <section className='myAppoinment'>
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
            <div className='myAppoinment_container'>
                <div className="container">
                    <div className='myAppoinment_main'>
                        <div className='myAppoinment_head laed_head'>
                            <h2>
                                <span>My </span>APPOINTMENTS
                            </h2>
                            <div className='appoinmentFilter'>
                                
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
                                <FaExchangeAlt className='leadsExchange_Icon' onClick={()=>setSort({...sort, show:true})}/>
                            </div>
                        </div>
                        <div className='addAppoin_table'>
                            <div className='todayAppoinment'>
                                <h4>Today's <span>{`(${appomtList.length})`}</span></h4>
                                <div className='appont_todayTable'>
                                    <ReactTable
                                        data={appomtList}
                                        columns={columns}
                                    />
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
                      
                    </div>
                </div>
                <div class="top_banner_img col-md-10 mx-auto">
                    <img class="" alt="top_banner_img" src={topBanner} />
                </div>
            </div>
            {
                addAppoinMent ? <AddAppointment setAppointmentForm={setAddAppoinMent} editForm='editForm' editObj={editObj} listAppointWithMetaData={listAppointWithMetaData} /> : null
            }
            {
                deleteConfirm.open ?
                    <div className='deleteModal'>
                        <div className='deleteconfilrmBox'>
                            <h5> <MdError className='deleteBoxIcon' /> DELETE APPOINTMENT</h5>
                            {succMsg === '' ? <div className='deletBoxContent'>
                                <p className=''>Are you sure you want to delete oppointment?</p>
                                {/* <p>to <span></span></p> */}
                                {/* <p>Sugarcane harvesting for, <span>10 acres</span></p> */}
                                <div className='deleteConfirm_btns'>
                                    <button className='delCancel' onClick={() => setDeleteConfirm({ open: false, id: '' })}> <MdArrowBackIosNew />  BACK</button>
                                    <button className='delOk' onClick={() => deleteAppointMent()}><FaCalendarDay className='deleteBoxIcon' /> DELETE APPOINTMENT</button>
                                </div>
                            </div> :
                                <div className='deleteBoxafetrOK'>
                                    <p>{succMsg}</p>
                                    {/* <button onClick={()=>{listAppointWithMetaData(); setDeleteConfirm({open:false, id:''}); setSuccMsg('')}}>OK</button> */}
                                </div>
                            }
                        </div>
                    </div>
                    : null
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

export default MyAppoinment;