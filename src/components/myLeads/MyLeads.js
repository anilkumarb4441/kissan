import React, { useState } from 'react';

//assets
import topBanner from "././../../assets/images/page_top_banner.png"
import{FaChevronLeft, FaChevronRight,FaPlus,FaTag} from 'react-icons/fa';


//css
import './myLeads.css';

const MyLeads = () => {

    const [dropdownOptions, setDropdownOption] = useState('one');
    const [dropdownOpen, setDropdownOpen] =useState(false)

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
                        <p>06 leads in</p>
                        <div className="filterWraper" onClick={()=>setDropdownOpen(!dropdownOpen)}>
                            <div className='filtrName'>
                            <p>{dropdownOptions}</p>
                            <FaChevronRight />
                            </div>
                           { dropdownOpen && <div className='filter_dropdown'>
                                <p onClick={()=>{setDropdownOption('oneday')}}>one day</p>
                                <p onClick={()=>{setDropdownOption('twoDay')}}>two day</p>
                                <p onClick={()=>{setDropdownOption('oneWeek')}}>one week</p>
                            </div>}
                        </div>

                    </div>
                    </div>

                </div>
                </div>
            </div>
    </section>
        
    );
};

export default MyLeads;