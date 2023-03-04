import React,{useState} from 'react'
//css
import "./calender.css"
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
    
    


function CustomCalender({onChange,range}) {
    const [show,toggleCalendar] = useState(false);
    const [value,setValue] = useState();
    const reset =()=>{
        onChange(new Date())
        setValue()
    }
    return (
        <div className = "custom-date-range-picker">
            <div className = 'date-range-header'>
                
                 { range?
                 <>
                 <GrPowerReset onClick = {()=>reset()}/>
                 <p>{`${new Date(range).getDate() < 10 ?'0':''}${new Date(range).getDate()}-${new Date(range).getMonth()+1 < 10 ?'0':''}${new Date(range).getMonth()+1}-${new Date(range).getFullYear()}`}</p></>:<p>Select Date</p>
                 }
                    <BsCalendar onClick = {()=>toggleCalendar(show=>!show)} /> 
            </div>
           {show &&
           <div className = "date-range-body">
               <Calendar
            selectRange = {false}
            value = {value}
            onChange = {setValue}
            minDate  = {new Date()}
            // maxDate  = {new Date()}
            // maxDetail = {'month'}
            // returnValue = {'range'}
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

export default CustomCalender;