import React, { useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';


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
        alert('formData')
        console.log(formData);
        setAppointmentForm(false);
    }

    return (
        <div className='add_appointmemt_Container'>
           <div className='appointment_main'>
            <div className='appointment_form_close'><AiOutlineCloseCircle  onClick={()=>setAppointmentForm(false)}/></div>
                <h5>ADD APPOINMENTS</h5>
                <div className='appon_form'>
                    <form>
                        <div className='form_input_holder'>
                            <label>Name:</label>
                            <input type='text' placeholder='Enter Name' name='name' value={formData.name} onChange={(e)=>onChangeForm(e)}/>
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
                        <div className='form_input_holder'>
                            <label>Type of Lead:</label>
                            <input type='text' placeholder='Enter Brand & model' name='typeOfLead' value={formData.typeOfLead} onChange={(e)=>onChangeForm(e)}/>
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