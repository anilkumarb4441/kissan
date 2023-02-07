import React, { useState } from 'react';


//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import { FaExchangeAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import {MdDelete} from 'react-icons/md'  
import {MdEdit} from 'react-icons/md' 

//css 
import './myAppoinment.css';
import ReactTable from '../table/ReactTable';

//components
import AddAppointment from '../addAppoinment/addAppointment';

const MyAppoinment = () => {

    const [dropdownOptions, setDropdownOption] = useState('1 Day');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addAppoinMent, setAddAppoinMent] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [contNumLead, setContNumLead] = useState('')


    const tableData = [
        {
            name:'Rakesh singh',
            ContactNo:'8865956532',
            Time:'3.00pm',
            location:'R R Nagar, Bangalore',
            typeofLead:'Mahendra, YUVO 415 D,',
            status:'open',
        },
        {
            name:'Rakesh singh',
            ContactNo:'8867656532',
            Time:'3.00pm',
            location:'R R Nagar, 2nd Phase Bangalore Karnataka',
            typeofLead:'Mahendra, YUVO 415 D,',
            status:'open',
        },
        {
            name:'Rakesh singh',
            ContactNo:'8865636532',
            Time:'3.00pm',
            location:'R R Nagar, Bangalore',
            typeofLead:'R R Nagar, 2nd Phase Bangalore Karnataka',
            status:'open',
        },
        {
            name:'Rakesh singh',
            ContactNo:'8862656532',
            Time:'3.00pm',
            location:'R R Nagar, Bangalore',
            typeofLead:'Mahendra, YUVO 415 D,',
            status:'open',
        },
    ]

    const columns = [
        {
            Header:'Name',
            accessor:'name',
    
        },
        {
            Header:'Contact No',
            accessor:'ContactNo',
            
        },
        {
            Header:'Location',
            accessor:'location',
    
        },
        {
            Header:'Type of Lead',
            accessor:'typeofLead',
    
        },
        {
            Header:'status',
            accessor:'status',
            // Cell:(props)=>{
            //     // {props.cell.row.original.name}
            //    return <div className='apooinTable_icon'><MdEdit /></div>
            // }
    
        },
        {
            Header:'.',
            accessor:'',
            Cell:(props)=>{
                // {props.cell.row.original.name}
               return <div className='apooinTable_icon'><MdEdit /></div>
            }
        },
         {
            Header:',',
            accessor:'',
            Cell:(props)=>{
               return <div className='apooinTable_icon'><MdDelete /></div>
            }
        },

       
        
    ]
    const columns1 = [
        {
            Header:'Name',
            accessor:'name',
    
        },
        {
            Header:'Contact No',
            accessor:'ContactNo',
            Cell:(props)=>{
                // {props.cell.row.original.name}
    
               return <div className='' style={{cursor:'pointer'}} onClick={()=>{setShowContact(true); setContNumLead( props.cell.row.original.ContactNo)}}> <p>{showContact && contNumLead ===  props.cell.row.original.ContactNo ?  props.cell.row.original.ContactNo:'**********'}</p></div>
            }
        },
        {
            Header:'Location',
            accessor:'location',
    
        },
        {
            Header:'Type of Lead',
            accessor:'typeofLead',
    
        },
        {
            Header:'status',
            accessor:'status',
            // Cell:(props)=>{
            //     // {props.cell.row.original.name}
            //    return <div className='apooinTable_icon'><MdEdit /></div>
            // }
    
        },
        {
            Header:'.',
            accessor:'',
            Cell:(props)=>{
                // {props.cell.row.original.name}
               return <div className='apooinTable_icon'><MdEdit /></div>
            }
        },
         {
            Header:',',
            accessor:'',
            Cell:(props)=>{
               return <div className='apooinTable_icon'><MdDelete /></div>
            }
        },

       
        
    ]
    const columns2 = [
        {
            Header:'Name',
            accessor:'name',
    
        },
        {
            Header:'Contact No',
            accessor:'ContactNo',
            Cell:(props)=>{
                // {props.cell.row.original.name}
    
               return <div className='' style={{cursor:'pointer'}} onClick={()=>{setShowContact(true); setContNumLead( props.cell.row.original.ContactNo)}}> <p>{showContact && contNumLead ===  props.cell.row.original.ContactNo ?  props.cell.row.original.ContactNo:'**********'}</p></div>
            }
        },
        {
            Header:'Location',
            accessor:'location',
    
        },
        {
            Header:'Type of Lead',
            accessor:'typeofLead',
    
        },
        {
            Header:'status',
            accessor:'status',
            // Cell:(props)=>{
            //     // {props.cell.row.original.name}
            //    return <div className='apooinTable_icon'><MdEdit /></div>
            // }
    
        },
        {
            Header:'.',
            accessor:'',
            Cell:(props)=>{
                // {props.cell.row.original.name}
               return <div className='apooinTable_icon'><MdEdit /></div>
            }
        },
         {
            Header:',',
            accessor:'',
            Cell:(props)=>{
               return <div className='apooinTable_icon'><MdDelete /></div>
            }
        },

       
        
    ]
    
     // {
        //     Header:'Contact No',
        //     accessor:'ContactNo',
        //     Cell:(props)=>{
        //        return <div><p style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>{helloword(props.cell.row.original)}}>{props.cell.row.original.name}</p></div>
        //     }
        // },

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
                                <div className='addAppoint_Btn' onClick={()=>setAddAppoinMent(true)}>+ Add Appointments</div>
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
                            columns={columns}
                        />
                        </div>
                       </div>
                       <div className='todayAppoinment'>
                        <h4>Yesterday’s <span>{`(${tableData.length})`}</span></h4>
                        <div className='appont_yestardy_Table'>
                        <ReactTable
                            data={tableData}
                            columns={columns1}
                        />
                        </div>
                       </div>
                       <div className='todayAppoinment'>
                        <h4>26th Sep <span>{`(${tableData.length})`}</span></h4>
                        <div className='appont_datewise_Table'>
                        <ReactTable
                            data={tableData}
                            columns={columns2}
                        />
                        </div>
                       </div>
                       
                    </div>
                  <div className='addTable_appoint'>
                  <div className='addAppoint_Btn' onClick={()=>setAddAppoinMent(true)}>+ Add Appointments</div>
                  </div>
                    </div>
                 </div>
                 <div class="top_banner_img col-md-10 mx-auto">
                    <img class="" alt="top_banner_img" src={topBanner} />
                </div>
            </div>
            {
                addAppoinMent ? <AddAppointment setAppointmentForm={setAddAppoinMent}/>:null
            }
      </section>
    );
};

export default MyAppoinment;