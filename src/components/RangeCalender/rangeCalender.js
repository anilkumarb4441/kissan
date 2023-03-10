import React,{useState} from 'react'

//css
import "./rangeCalender.css"
import "react-calendar/dist/Calendar.css";

//components
import Calendar from 'react-calendar'
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"
import {HiChevronDoubleLeft} from "react-icons/hi"
import {HiChevronDoubleRight} from "react-icons/hi"
import {GrPowerReset} from "react-icons/gr"
import {BsCalendar} from "react-icons/bs"


export const DateObjectToString = (dateObj) => {
let date = new Date(dateObj.getTime() + 19800000).toISOString().split("T")[0];
return date;
  };



function CustomDateRange({onChange,range}) {
    const [show,toggleCalendar] = useState(false);
    const [value,setValue] = useState()
    const reset =()=>{
        onChange(null)
        setValue()
    }
    return (
        <div className = "custom-date-range-picker">
            <div className = 'date-range-header'>
                
                 { range?
                 <>
                 <GrPowerReset onClick = {()=>reset()}/>
                 <p>{DateObjectToString(range[0])} to {DateObjectToString(range[1])}</p></>:<p>Select Date</p>}
                    <BsCalendar onClick = {()=>toggleCalendar(show=>!show)} /> 
            </div>
           {show &&
           <div className = "date-range-body">
               <Calendar
            selectRange = {true}
            value = {value}
            onChange = {setValue}
            // maxDate  = {new Date()}
            minDate = {new Date()}
            maxDetail = {'month'}
            returnValue = {'range'}                          
            prevLabel = {<IoIosArrowBack/>}
            nextLabel = {<IoIosArrowForward/>}
            prev2Label = {<HiChevronDoubleLeft/>}
            next2Label = {<HiChevronDoubleRight/>}
            />
            <div className = 'date-range-footer'>
              <button onClick = {()=>toggleCalendar(show=>!show)} style = {{color:'#FF4B4B'}}>Cancel</button>
                <button onClick = {()=>{onChange(value);toggleCalendar(show=>!show)}} style = {{color:'#1294F2'}}>OK</button>
            </div>
           </div>
           }
        </div>
    )
}

export default CustomDateRange