import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios'
import { getCurrentSession } from "../../endpoints/amplify/auth"
import { API_PUBLIC_HOST } from '../Common/Constants'
import TimePicker1 from 'react-time-picker';



//css
import './addAppoinment.css'


const AddAppointment = ({ setAppointmentForm, editObj = {}, editForm = '', listLeadsArry, appointmentState }) => {

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        typeOfLead: '',
    })
    const [editFormData, setEditFormData] = useState({
        date: editObj.appointmentDate,
        location: editObj.location,
    })
    const [time, setTime] = useState('10:45');
    const [succsMsg, setSuccsMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');


    console.log(editObj, '')
    const onChangeForm = (e) => {
        editForm === 'editForm' ?
            setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
            :
            setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmitAppoinMent = (e) => {
        e.preventDefault();
        getCurrentSession((success, jwtToken) => {
            const url = `${API_PUBLIC_HOST}/lead/addAppointment`;
            var data = {
                appointmentDate: new Date(formData.date),
                buyerId: listLeadsArry.createdBy,
                buyerName: listLeadsArry.creatorUserName,
                comments: "",
                id: "",
                listId: listLeadsArry.listId,
                location: formData.location,
                new: true,
                sellerId: listLeadsArry.listId,
                sellerName: listLeadsArry.creatorUserName,
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
                    console.log(response)
                    setSuccsMsg(response.data.message);
                    setTimeout(() => {
                        setSuccsMsg('');
                        setAppointmentForm(false);
                        window.location.href = '/sub/#/MyAppoinments'
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
        getCurrentSession((success, jwtToken) => {
            const url = `${API_PUBLIC_HOST}/lead/updateAppointment`;
            var data = {
                appointmentDate: editFormData.date,
                buyerId: "string",
                buyerName: "string",
                comments: "string",
                id: editObj.id,
                listId: editObj.id,
                location: editFormData.location,
                new: true,
                sellerId: "string",
                sellerName: "string",
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
                <h5>ADD APPOINTMENTS</h5>
                {succsMsg === '' ? <div className='appon_form'>
                    <form>
                        <div className='form_input_holder'>
                            <label>Name:</label>
                            <input type='text' placeholder='Enter Name' name='name' readOnly={editForm === 'editForm' ? true : false} value={editForm === 'editForm' ? editObj.name : formData.name} onChange={(e) => onChangeForm(e)} />
                        </div>
                        <div className='form_input_holder'>
                            <label>Type of Lead:</label>
                            <input type='text' placeholder='Enter Brand & model' readOnly={editForm === 'editForm' ? true : false} name='typeOfLead' value={editForm === 'editForm' ? editObj.typeofLead : formData.typeOfLead} onChange={(e) => onChangeForm(e)} />
                        </div>
                        <div className='form_input_holder'>
                            <label>Chooser Date:</label>
                            <input type='date' placeholder='Choose date' name='date' value={editForm === 'editForm' ? editFormData.date : formData.date} onChange={(e) => onChangeForm(e)} />

                        </div>
                        <div className='form_input_holder'>
                            <label>Time:</label>
                            <TimePicker1 value={editForm === 'editForm' ? time : formData.time} onChange={(e) => setTime(e)} clearIcon={false} />

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