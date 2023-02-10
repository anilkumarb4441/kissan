import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {getCurrentSession} from "../../endpoints/amplify/auth"
import {API_PUBLIC_HOST} from '../Common/Constants'

//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import { FaExchangeAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'

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
    const [deleteConfirm, setDeleteConfirm] = useState(false); //delete popup
    const [appomtList, setAppontList] = useState([]) //appointmentList

    const [statusdropdown, setStatusDropdown ] = useState({open:false, id:''});

        console.log(statusdropdown, 'statusdropdown')

    const tableData = [
        {
            name: 'Rakesh singh',
            ContactNo: '8865956532',
            Time: '3.00pm',
            location: 'R R Nagar, Bangalore',
            typeofLead: 'Mahendra, YUVO 415 D,',
            status: 'open',
            assignName: 'Kishan Kumar',
            time: '3:00 pm',
        },
        {
            name: 'Rakesh singh',
            ContactNo: '8867656532',
            Time: '3.00pm',
            location: 'R R Nagar, 2nd Phase Bangalore Karnataka',
            typeofLead: 'Mahendra, YUVO 415 D,',
            status: 'open',
            assignName: 'Kishan Kumar',
            time: '3:00 pm',
        },
        {
            name: 'Rakesh singh',
            ContactNo: '8865636532',
            Time: '3.00pm',
            location: 'R R Nagar, Bangalore',
            typeofLead: 'R R Nagar, 2nd Phase Bangalore Karnataka',
            status: 'copleated',
            assignName: 'Kishan Kumar',
            time: '3:00 pm',
        },
        {
            name: 'Rakesh singh',
            ContactNo: '8862656532',
            Time: '3.00pm',
            location: 'R R Nagar, Bangalore',
            typeofLead: 'Mahendra, YUVO 415 D,',
            status: 'open',
            assignName: 'Kishan Kumar',
            time: '3:00 pm',
        },
    ]

    const columns = [
        {
            Header: 'Name',
            accessor: 'name',

        },
        {
            Header: 'Contact No',
            accessor: 'ContactNo',

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
            Cell:(props)=>{
                // {props.cell.row.original.name}
               return <div className='apoointTable_status'>
                <div className='appStatus_head' onClick={()=>{setStatusDropdown({open:true, id:props.cell.row.original.ContactNo})}}> <p>{props.cell.row.original.status}</p><IoMdArrowDropdown /></div>
                {statusdropdown.open &&statusdropdown.id === props.cell.row.original.ContactNo?
                <div className='statusDropdown_tabel' onClick={()=>{setStatusDropdown({open:false, id:''})}}>
                    <p>open</p>
                    <p>confirm</p>
                    <p>compleate</p>
                </div>:
                null

                }
               </div>
            }

        },
        {
            Header: '.',
            accessor: '',
            Cell: (props) => {
                // {props.cell.row.original.name}
                return <div className='apooinTable_icon' onClick={() => { submitEditAppointment(); }}><MdEdit /></div>
            }
        },
        {
            Header: ',',
            accessor: '',
            Cell: (props) => {
                return <div className='apooinTable_icon' onClick={() => { setDeleteConfirm({ ...deleteConfirm, open: true }); }}><MdDelete /></div>
            }
        },



    ]
    const columns1 = [
        {
            Header: 'Name',
            accessor: 'name',

        },
        {
            Header: 'Contact No',
            accessor: 'ContactNo',
            Cell: (props) => {
                // {props.cell.row.original.name}

                return <div className='' style={{ cursor: 'pointer' }} onClick={() => { setShowContact(true); setContNumLead(props.cell.row.original.ContactNo) }}> <p>{showContact && contNumLead === props.cell.row.original.ContactNo ? props.cell.row.original.ContactNo : '**********'}</p></div>
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
            Cell: (props) => {
                // {props.cell.row.original.name}

                return <div className='' style={{ cursor: 'pointer' }} onClick={() => { setShowContact(true); setContNumLead(props.cell.row.original.ContactNo) }}> <p>{showContact && contNumLead === props.cell.row.original.ContactNo ? props.cell.row.original.ContactNo : '**********'}</p></div>
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


    const fetchAppointmentList = ()=>{
        getCurrentSession((success, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/listAppointments`;
            var data = {
                buyerUserId: "string",
                endDate: "2023-02-09T12:14:39.442Z",
                listingId: "string",
                sellerUserId: "string",
                startDate: "2023-02-09T12:14:39.442Z",
                status: "Open"
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
                        setAppontList(response.data.response.leads)
                        console.log(response.data.response.leads)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }

    const listAppointWithMetaData = ()=>{
        getCurrentSession((success, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/listAppointmentsWithMetadata`;
            var data = {
                buyerUserId: "string",
                endDate: "2023-02-09T12:23:13.173Z",
                listingId: "string",
                sellerUserId: "string",
                startDate: "2023-02-09T12:23:13.173Z",
                status: "Open"
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
                        setAppontList(response.data.response.leads)
                        console.log(response.data.response.leads)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }

    const changeStatusOfLeads = (str='string', val="Active")=>{
        getCurrentSession((success, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/changeStatusOfLead?${str}&${val}`
            var data = {
                buyerUserId: "string",
                endDate: "2023-02-09T12:23:13.173Z",
                listingId: "string",
                sellerUserId: "string",
                startDate: "2023-02-09T12:23:13.173Z",
                status: "Open"
              };
                axios({
                    method: 'get',
                    url: url,
                    // data: data,
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                       Authorization: jwtToken,
                    },
                  })
                    .then((response) => {
                        // setAppontList(response.data.response.leads)
                        console.log(response.data.response.leads)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }

    useEffect(()=>{
        fetchAppointmentList();
        listAppointWithMetaData();
        changeStatusOfLeads();
    }, [])

    const deleteAppointMent = (ldId)=>{
    
        getCurrentSession((success, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/listAppointmentsWithMetadata?${ldId}`;

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
                        // setAppontList(response.data.response.leads)
                        console.log(response.data.response.leads)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
    }

    const submitEditAppointment = () => {

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
                                        data={tableData}
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
                addAppoinMent ? <AddAppointment setAppointmentForm={setAddAppoinMent} /> : null
            }
            {
                deleteConfirm.open ?
                    <div className='editConfirm_box'>
                        <div className='confilrmBox'>
                            <h5>Are you sure you want to delete this lead</h5>
                            <p>This Lead will delete permanently. you cannot undo this action</p>
                            <div className='deleteConfirm_btns'>
                                <button className='delCancel' onClick={() => setDeleteConfirm({ ...deleteConfirm, open: false })}>Cancel</button>
                                <button className='delOk' onClick={()=>deleteAppointMent('string')}>Ok</button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </section>
    );
};

export default MyAppoinment;