import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {getCurrentSession} from "../../endpoints/amplify/auth"
import {API_PUBLIC_HOST} from '../Common/Constants'

//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import { FaExchangeAlt, FaCalendarDay } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'
import { MdEdit, MdError, MdArrowBackIosNew } from 'react-icons/md'


//css 
import './myAppoinment.css';
import ReactTable from '../table/ReactTable';

//components
import AddAppointment from '../addAppoinment/addAppointment';

const MyAppoinment = () => {

    const [dropdownOptions, setDropdownOption] = useState('1 Day'); //dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addAppoinMent, setAddAppoinMent] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [contNumLead, setContNumLead] = useState('')
    const [showOPerator, setShowOperartor] = useState(false);
    const [chooseOPerator, setchooseOPerator] = useState('Choose Operators')
    const [masterAppointment, setMasterAppointment] = useState('') // master keyword for master appointmemts
    const [deleteConfirm, setDeleteConfirm] = useState({open:false, id:''}); //delete popup
    const [appomtList, setAppontList] = useState([]) //appointmentList

     const [appointmentState, setAppointmentState] = useState('')

    const [editObj, setEditObj] = useState({});
    
    
    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
      
      const onChangeTableStatus = (item, targetVal, index1)=>{
        let targetStatus = appomtList.find((val)=>val.id === item.id);
        let targIndex = {...targetStatus, status:targetVal.target.value}
        var matchtheArray = appomtList.filter(x => x.id !== item.id);
        matchtheArray.splice(index1, 0, targIndex)
        setAppontList(matchtheArray);
      }

    const tableData = [
        {
            name: 'Rakesh singh',
            ContactNo: '8865956532',
            Time: '03:00',
            location: 'R R Nagar, Bangalore',
            typeofLead: 'Mahendra, YUVO 415 D,',
            status: 'open',
            assignName: 'Kishan Kumar',
            time: '03:00',
            date:'12-05-2023'
        },
        {
            name: 'Rakesh singh',
            ContactNo: '8867656532',
            Time: '3:00pm',
            location: 'R R Nagar, 2nd Phase Bangalore Karnataka',
            typeofLead: 'Mahendra, YUVO 415 D,',
            status: 'open',
            assignName: 'Kishan Kumar',
            time: '03:00',
            date:'12-05-2023'
        },
        {
            name: 'Rakesh singh',
            ContactNo: '8865636532',
            Time: '03:00',
            location: 'R R Nagar, Bangalore',
            typeofLead: 'R R Nagar, 2nd Phase Bangalore Karnataka',
            status: 'copleated',
            assignName: 'Kishan Kumar',
            time: '3:00 pm',
            date:'12-05-2023'
        },
        {
            name: 'Rakesh singh',
            ContactNo: '8862656532',
            Time: '03:00',
            location: 'R R Nagar, Bangalore',
            typeofLead: 'Mahendra, YUVO 415 D,',
            status: 'open',
            assignName: 'Kishan Kumar',
            time: '3:00 pm',
            date:'12-05-2023'
        },
    ]

    const columns = [
        {
            Header: 'Name',
            accessor: 'assigneeUserName',

        },
        {
            Header: 'Contact No',
            accessor: 'ContactNo',

        },
        {
            Header: 'Time',
            accessor: 'appointmentDate',
            Cell: (props) => {
                let timeTake = props.cell.row.original.appointmentDate
                let hour = new Date(timeTake).getHours();
                let minuts = new Date(timeTake).getMinutes();
                return <div><p>{tConvert(`${hour=='00'?'00':hour}:${minuts}`)}</p></div>
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
            Cell:(props)=>{
                // {props.cell.row.id}
               return <div className='apoointTable_status'>
               <select className='statusDropdown_tabel' value={props.cell.row.original.status} onChange={(e)=>onChangeTableStatus(props.cell.row.original, e, props.cell.row.id)}>
                    <option  value='Open'>Open</option>
                    <option value='Completed'>Completed</option>
                    <option value='NotInterested'>NotInterested</option>
                    <option value='CancelledBySeller'>CancelledBySeller</option>
                    <option value='CancelledByBuyer'>CancelledByBuyer</option>
                </select>
               </div>
            }

        },
        {
            Header: '.',
            accessor: '',
            Cell: (props) => {
                return <div className='apooinTable_icon' onClick={() => {setEditObj(props.cell.row.original); setAddAppoinMent(true) }}><MdEdit /></div>
            }
        },
        {
            Header: ',',
            accessor: '',
            Cell: (props) => {
                return <div className='apooinTable_icon' onClick={() => { setDeleteConfirm({ open: true, id:props.cell.row.original.id }); }}><MdDelete /></div>
            }
        },



    ]
    const columns1 = [
        {
            Header: 'Name',
            accessor: 'buyerName',

        },
        {
            Header: 'Contact No',
            accessor: 'ContactNo',
            // Cell: (props) => {
            //     return <div className='' style={{ cursor: 'pointer' }} onClick={() => { setShowContact(true); setContNumLead(props.cell.row.original.ContactNo) }}> <p>{showContact && contNumLead === props.cell.row.original.ContactNo ? props.cell.row.original.ContactNo : '**********'}</p></div>
            // }
        },
        {
            Header: 'Time',
            accessor: 'appointmentDate',
            Cell: (props) => {
                let timeTake = props.cell.row.original.appointmentDate
                let hour = new Date(timeTake).getHours();
                let minuts = new Date(timeTake).getMinutes();
                return <div><p>{hour == '00'?'00':hour}:{minuts}</p></div>
            }

        },
        {
            Header: 'Location',
            accessor: 'location',

        },
        {
            Header: 'Type of Lead',
            accessor: 'typeofLead',

        },
        {
            Header: 'status',
            accessor: 'status',
            // Cell:(props)=>{
            //     // {props.cell.row.original.name}
            //    return <div className='apooinTable_icon'><MdEdit /></div>
            // }

        },
        {
            Header: '.',
            accessor: '',
            Cell: (props) => {
                // {props.cell.row.original.name}
                return <div className='apooinTable_icon'><MdEdit /></div>
            }
        },
        {
            Header: ',',
            accessor: '',
            Cell: (props) => {
                return <div className='apooinTable_icon'><MdDelete /></div>
            }
        },



    ]
    const columns2 = [
        {
            Header: 'Name',
            accessor: 'name',

        },
        {
            Header: 'Contact No',
            accessor: 'ContactNo',
            // Cell: (props) => {
              

            //     return <div className='' style={{ cursor: 'pointer' }} onClick={() => { setShowContact(true); setContNumLead(props.cell.row.original.ContactNo) }}> <p>{showContact && contNumLead === props.cell.row.original.ContactNo ? props.cell.row.original.ContactNo : '**********'}</p></div>
            // }
        },
        {
            Header: 'Location',
            accessor: 'location',

        },
        {
            Header: 'Type of Lead',
            accessor: 'typeofLead',

        },
        {
            Header: 'status',
            accessor: 'status',
            // Cell:(props)=>{
            //     // {props.cell.row.original.name}
            //    return <div className='apooinTable_icon'><MdEdit /></div>
            // }

        },
        {
            Header: '.',
            accessor: '',
            Cell: (props) => {
                // {props.cell.row.original.name}
                return <div className='apooinTable_icon'><MdEdit /></div>
            }
        },
        {
            Header: ',',
            accessor: '',
            Cell: (props) => {
                return <div className='apooinTable_icon'><MdDelete /></div>
            }
        },



    ]


    //  master leasd columns
    const columnsm1 = [
        {
            Header: 'Name',
            accessor: 'name',

        },
        {
            Header: 'Contact No',
            accessor: 'ContactNo',

        },
        {
            Header: 'Assign Name',
            accessor: 'assignName',

        },
        {
            Header: 'Time',
            accessor: 'time',

        },
        {
            Header: 'Location',
            accessor: 'location',

        },
        {
            Header: 'Type of Lead',
            accessor: 'typeofLead',

        },
        {
            Header: 'status',
            accessor: 'status',
            // Cell:(props)=>{
            //     // {props.cell.row.original.name}
            //    return <div className='apooinTable_icon'><MdEdit /></div>
            // }

        },

    ]


    // const fetchAppointmentList = ()=>{
    //     getCurrentSession((success, jwtToken)=>{
    //         const url = `${API_PUBLIC_HOST}/lead/listAppointments`;
    //         var data = {
    //             buyerUserId: "string",
    //             endDate: "2023-02-09T12:14:39.442Z",
    //             listingId: "string",
    //             sellerUserId: "string",
    //             startDate: "2023-02-09T12:14:39.442Z",
    //             status: "Open"
    //           };
    //             axios({
    //                 method: 'post',
    //                 url: url,
    //                 data: data,
    //                 headers: {
    //                   Accept: "application/json",
    //                   "Content-Type": "application/json",
    //                    Authorization: jwtToken,
    //                 },
    //               })
    //                 .then((response) => {
    //                     setAppontList(response.data.response.leads)
    //                     console.log(response.data.response.leads)
    //                 })
    //                 .catch((error) => {
    //                   console.log(error)
    //                 }); 
    //     })
    // }

    const listAppointWithMetaData = ()=>{
        getCurrentSession((success, jwtToken)=>{
            console.log(success, 'success')
            const url = `${API_PUBLIC_HOST}/lead/listAppointmentsWithMetadata`;
            var data = {
                // buyerUserId: "string",
                // endDate: "",
                // listingId: "",
                sellerUserId: "",
                // startDate: "",
                // status: "Open"
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
                        console.log(response.data);
                        setAppontList(response.data.response.appointments)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }

    // const changeStatusOfLeads = (str='string', val="Active")=>{
    //     getCurrentSession((success, jwtToken)=>{
    //         const url = `${API_PUBLIC_HOST}/lead/changeStatusOfLead?${str}&${val}`
    //         var data = {
    //             buyerUserId: "string",
    //             endDate: "2023-02-09T12:23:13.173Z",
    //             listingId: "string",
    //             sellerUserId: "string",
    //             startDate: "2023-02-09T12:23:13.173Z",
    //             status: "Open"
    //           };
    //             axios({
    //                 method: 'get',
    //                 url: url,
    //                 // data: data,
    //                 headers: {
    //                   Accept: "application/json",
    //                   "Content-Type": "application/json",
    //                    Authorization: jwtToken,
    //                 },
    //               })
    //                 .then((response) => {
    //                     // setAppontList(response.data.response.leads)
    //                     console.log(response.data.response.leads)
    //                 })
    //                 .catch((error) => {
    //                   console.log(error)
    //                 }); 
    //     })
    // }

    useEffect(()=>{
        // fetchAppointmentList();
        listAppointWithMetaData();
        // changeStatusOfLeads();
    }, [])

    const deleteAppointMent = ()=>{
        getCurrentSession((success, jwtToken)=>{
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
                        setDeleteConfirm({open:false, id:''});
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
                                {masterAppointment === 'master' ?
                                    <div className="filterWraper" onClick={() => setShowOperartor(!showOPerator)} style={{ width: '200px' }}>
                                        <div className='filtrName'>
                                            <p>{chooseOPerator}</p>
                                            <IoMdArrowDropdown className={showOPerator ? 'iconRotateDrop' : ''} />
                                        </div>
                                        {showOPerator && <div className='filter_dropdown'>
                                            <p onClick={() => { setchooseOPerator('1 Day') }}>1 Day</p>
                                            <p onClick={() => { setchooseOPerator('2 Day') }}>2 Day</p>
                                            <p onClick={() => { setchooseOPerator('1 Week') }}>1 Week</p>
                                        </div>}
                                    </div>

                                    :
                                    <>
                                        {/* <div className='addAppoint_Btn' onClick={()=>setAddAppoinMent(true)}>+ Add Appointments</div> */}
                                        {null}
                                    </>
                                }
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
                        <div className='addAppoin_table'>
                            <div className='todayAppoinment'>
                                <h4>Today's <span>{`(${tableData.length})`}</span></h4>
                                <div className='appont_todayTable'>
                                    <ReactTable
                                        data={appomtList}
                                        columns={masterAppointment === 'master' ? columnsm1 : columns}
                                    />
                                </div>
                            </div>
                            <div className='todayAppoinment'>
                                <h4>Yesterday’s <span>{`(${tableData.length})`}</span></h4>
                                <div className='appont_yestardy_Table'>
                                    <ReactTable
                                        data={tableData}
                                        columns={masterAppointment === 'master' ? columnsm1 : columns1}
                                    />
                                </div>
                            </div>
                            <div className='todayAppoinment'>
                                <h4>26th Sep <span>{`(${tableData.length})`}</span></h4>
                                <div className='appont_datewise_Table'>
                                    <ReactTable
                                        data={tableData}
                                        columns={masterAppointment === 'master' ? columnsm1 : columns2}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='addTable_appoint'>
                            {masterAppointment === 'master' ?
                                <div className='masterAppoinChoose_ope'>
                                    <p>Choose Operators appointments</p>
                                    <div className="filterWraper" onClick={() => setDropdownOpen(!dropdownOpen)} >
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
                                </div>
                                :
                                null}
                        </div>
                    </div>
                </div>
                <div class="top_banner_img col-md-10 mx-auto">
                    <img class="" alt="top_banner_img" src={topBanner} />
                </div>
            </div>
            {
                addAppoinMent ? <AddAppointment setAppointmentForm={setAddAppoinMent} editForm='editForm'  editObj={editObj} /> : null
            }
            {
                deleteConfirm.open ?
                    <div className='deleteModal'>
                        <div className='deleteconfilrmBox'>
                            <h5> <MdError  className='deleteBoxIcon'/> DELETE APPOINTMENT</h5>
                            <div className='deletBoxContent'>
                            <p className=''>Are you sure you want to delete oppointments?</p>
                            <p>to <span>Kishan Kumar</span></p>
                            <p>Sugarcane harvesting for, <span>10 acres</span></p>
                            <div className='deleteConfirm_btns'>
                                <button className='delCancel' onClick={() => setDeleteConfirm({ open: false, id:'' })}> <MdArrowBackIosNew />  BACK</button>
                                <button className='delOk' onClick={()=>deleteAppointMent()}><FaCalendarDay className='deleteBoxIcon'/> DELETE APPOINTMENT</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </section>
    );
};

export default MyAppoinment;