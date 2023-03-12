import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios'
import { getCurrentSession } from "../../endpoints/amplify/auth"
import { API_PUBLIC_HOST } from '../Common/Constants'
import TimePicker1 from 'react-time-picker';



//css
import './addAppoinment.css'
import CustomCalender from '../calender/calender';

export const DateObjectToString = (dateObj) => {
    let date = new Date(dateObj.getTime() + 19800000).toISOString().split("T")[0];
    return date;
      };


const AddAppointment = ({ setAppointmentForm, editObj = {}, editForm = '', listLeadsArry, listAppointWithMetaData, addAppObj }) => {

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        typeOfLead: '',
    })
    console.log(editObj, 'editObj')

    function tConvert(timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute +  (hour < 12 ? "AM" : "PM");
    }

    const [editFormData, setEditFormData] = useState({
        date: editObj.appointmentDate,
        location: editObj.location,
        time:tTime,
    
    })

    var timeTake = editObj.appointmentDate;
    var hour = new Date(timeTake).getHours();
    var minuts = new Date(timeTake).getMinutes();
    var tTime=`${tConvert(`${hour}:${minuts}`)}`
    console.log(tTime, 'tTimetTime')

    useEffect(()=>{
    var tTime=`${tConvert(`${hour}:${minuts}`)}`
        setEditFormData({...editFormData, time:tTime})
      },[])
      console.log(editFormData.time, 'editFormDataeditFormData')
   
    const [succsMsg, setSuccsMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [singleDate, setSingleDate] = useState(editForm === 'editForm'? new Date(editObj.appointmentDate) :'');

    let dailyDate = singleDate !== '' ? DateObjectToString(singleDate) : ""

// console.log(editFormData.time, 'ggggg');
    const onChangeForm = (e) => {
        editForm === 'editForm' ?
            setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
            :
            setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
     
    
console.log(formData.date, 'formData.date')
    const onSubmitAppoinMent = (e) => {
        e.preventDefault();
        getCurrentSession((success, jwtToken) => {
            const url = `${API_PUBLIC_HOST}/lead/addAppointment`;
            var data = {
                appointmentDate:`${dailyDate}T${formData.time}`, 
                // 2023-02-24T08:45:55
                listId: addAppObj.listId,
                location: formData.location,
            }

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
                    console.log(response)
                    setSuccsMsg(response.data.message);
                    setTimeout(() => {
                        setSuccsMsg('');
                        setAppointmentForm(false);
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error);
                    setErrMsg('SomethingWent Wrong!!!')
                });
        })
    }
    
    const updateAppointment = (e) => {
        e.preventDefault();
        let timeAndDate  = `${dailyDate}T${editFormData.time}:00`
        getCurrentSession((success, jwtToken) => {
            const url = `${API_PUBLIC_HOST}/lead/updateAppointment`;
            var data = {
                appointmentDate: timeAndDate,
                comments: "",
                id: editObj.id,
                location: editFormData.location,
                status: editObj.status,
            }

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
                    console.log(response);
                    setSuccsMsg(response.data.message);
                    setTimeout(() => {
                        setSuccsMsg('');
                        setAppointmentForm(false);
                        listAppointWithMetaData();
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error)
                    setErrMsg('SomethingWent Wrong!!!');
                });
        })
    }

    return (
        <div className='add_appointmemt_Container'>
            <div className='appointment_main'>
                <div className='appointment_form_close'><AiOutlineCloseCircle onClick={() => setAppointmentForm(false)} /></div>
                <h5>{editForm === 'editForm' ? 'UPDATE APPOINTMENT' :'ADD APPOINTMENTS'}</h5>
                {succsMsg === '' ? <div className='appon_form'>
                    <form>
                    <div className='form_input_holder'>
                            <label>Type of Lead:</label>
                            <input type='text' placeholder='Enter Brand & model' readOnly name='typeOfLead' value={editForm === 'editForm' ? editObj.typeofLead : addAppObj.leadType} onChange={(e) => onChangeForm(e)} />
                        </div>
                        <div className='form_input_holder'>
                            <label>Name:</label>
                            <input type='text' placeholder='Enter Name' name='name' readOnly value={editForm === 'editForm' ? editObj.buyerName : addAppObj.name} onChange={(e) => onChangeForm(e)} />
                        </div>
                       
                        {/* <div className='form_input_holder'>
                            <label>Chooser Date:</label>
                            <input type='date' placeholder='Choose date' name='date' value={editForm === 'editForm' ? editFormData.date : formData.date} onChange={(e) => onChangeForm(e)} />
                        </div> */}
                        {/* <input type="time" /> */}

                        <div className='form_input_holder'>
                            <label>Chooser Date:</label>
                        <CustomCalender
                      range={singleDate}
                      onChange={(arr) => {
                      setSingleDate(arr)
                      }} />
                      </div>
                        <div className='form_input_holder'>
                            <label>Time:</label>
                            <input type="time" name='time' placeholder='dddddddd' value={editForm === 'editForm' ? editFormData.time : formData.time} onChange={(e) => onChangeForm(e)}/>

                            {/* <TimePicker1 value={editForm === 'editForm' ? time : formData.time} onChange={(e) => setTime(e)} clearIcon={false} /> */}

                        </div>
                        <div className='form_input_holder'>
                            <label>Location:</label>
                            <input name='location' type='text' placeholder='Enter location' value={editForm === 'editForm' ? editFormData.location : formData.location} onChange={(e) => onChangeForm(e)} />
                        </div>

                        <div className='appointmentForm_button'>
                            <button onClick={(e) => { editForm === 'editForm' ? updateAppointment(e) : onSubmitAppoinMent(e) }}>{editForm === 'editForm' ? "UPDATE" : "SUBMIT"}</button>
                        </div>
                    </form>
                    {errMsg === '' ? null : <p style={{ color: 'red' }}>{errMsg} &nbsp;<spa onClick={() => setErrMsg('')} style={{ cursor: 'pointer', color: 'grey' }}>Close</spa></p>}
                </div>
                    :
                    <p className='appoinntMent_sccMsg'>{succsMsg} </p>
                }
            </div>
            

        </div>
    );
};

export default AddAppointment;