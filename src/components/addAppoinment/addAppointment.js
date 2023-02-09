import React, { useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import axios from 'axios'
import {getCurrentSession} from "../../endpoints/amplify/auth"
import {API_PUBLIC_HOST} from '../Common/Constants'

//css
import './addAppoinment.css'


const AddAppointment = ({setAppointmentForm}) => {

    const [formData, setFormData] = useState({
        name:'',
        date:'',
        time:'',
        location:'',
        typeOfLead:'',
    })

    const onChangeForm = (e)=>{
     setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmitAppoinMent = (e)=>{
        e.preventDefault();
        alert('formData');
        getCurrentSession((success, jwtToken)=>{
            const url = `${API_PUBLIC_HOST}/lead/addAppointment`;
            var data = {
                appointmentDate: "2023-02-08T12:53:47.133Z",
                buyerId: "string",
                buyerName: "string",
                comments: "string",
                id: "string",
                listId: "string",
                location: "string",
                new: true,
                sellerId: "string",
                sellerName: "string",
                status: "Open"
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
                        // setListLeads(response.data.response.leads)
                        console.log(response)
                    })
                    .catch((error) => {
                      console.log(error)
                    }); 
        })
        window.location.href = '/sub/#/MyAppoinments'
    } 

    return (
        <div className='add_appointmemt_Container'>
           <div className='appointment_main'>
            <div className='appointment_form_close'><AiOutlineCloseCircle  onClick={()=>setAppointmentForm(false)}/></div>
                <h5>ADD APPOINTMENTS</h5>
                <div className='appon_form'>
                    <form>
                        <div className='form_input_holder'>
                            <label>Name:</label>
                            <input type='text' placeholder='Enter Name' name='name' value={formData.name} onChange={(e)=>onChangeForm(e)}/>
                        </div>
                        <div className='form_input_holder'>
                            <label>Type of Lead:</label>
                            <input type='text' placeholder='Enter Brand & model' name='typeOfLead' value={formData.typeOfLead} onChange={(e)=>onChangeForm(e)}/>
                        </div>
                        <div className='form_input_holder'>
                            <label>Chooser Date:</label>
                            <input type='date' placeholder='Choose date' name='date' value={formData.date} onChange={(e)=>onChangeForm(e)}/>
                        </div>
                        <div className='form_input_holder'>
                            <label>Time:</label>
                           <select name='time' value={formData.time} onChange={(e)=>onChangeForm(e)}>
                            <option value='one'>one</option>
                            <option value='two'>two</option>
                            <option value='three'>three</option>
                           </select>
                        </div>
                        <div className='form_input_holder'>
                            <label>Location:</label>
                            <input name='location' type='text' placeholder='Enter location' value={formData.location} onChange={(e)=>onChangeForm(e)}/>
                        </div>
                        
                        <div className='appointmentForm_button'>
                            <button onClick={(e)=>onSubmitAppoinMent(e)}>SUBMIT</button>
                        </div>
                    </form>
                </div>
           </div>
        </div>
    );
};

export default AddAppointment;