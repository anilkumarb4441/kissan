import React, { useState,useEffect } from 'react';
import { Card, Button, Col, Row } from "react-bootstrap";
// import Constant from "../../../constants";
import axios from 'axios'
import {
  CCardLink, CFormInput,
  CCard,
  CFormTextarea,
  CCardBody,
  CCardTitle,
  CInputGroup,
  CButton,
  CFormSelect,
  CInputGroupText
} from '@coreui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import {FaPencilAlt,FaThList,FaTrash} from 'react-icons/fa';
import {API_PUBLIC_HOST, API_PRIVATE_HOST} from '../Common/Constants'
import {signUp, confirmSignUp, signIn, getCurrentSession} from "../../endpoints/amplify/auth"

const PostingCard = (props) => {
  const [planList, setPlanList] = useState([])
  const [filterArr, setFilterArr] = useState([]);

  const planSelect =(listId, planId) =>{
    
   if(listId!=='Select') {
    getCurrentSession((success, user, jwtToken) => {
      const url = `${API_PRIVATE_HOST}/listing/addAdditionalPlanForListing?additionalPlanId=${planId}&listId=${listId}`;
    //  alert(listId, planId);
      axios({
        method: 'GET',
        url: url,
        // data: values,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
           Authorization: jwtToken,
        },
      })
        .then((response) => {
          console.log(response.data.response) 
        })
        .catch((error) => {
          console.log(error)
        });  
      })
   }
    
  }

  useEffect(() => {
    PlanList()
  },[])

  const PlanList = () => {
    
    getCurrentSession((success, user, jwtToken) => {
      const url = `${API_PRIVATE_HOST}/plan/list`;
      const newPlan = {
        "category_id": props.categoryId,
        "is_active": true,
        "planType": "ADD_ON"
      }
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlan)
    };
    axios({
          method: 'post',
          url: url,
          data: newPlan,
          headers: {'Content-Type': 'application/json' },
        })
          .then((response) => {
              setPlanList(response.data.response) 
          })
      
       
      })
  }
//   useEffect(() => {
//     if(props.item && props.item?.additionalPlanId !== '' && props.item?.additionalPlanId !== undefined) {
         
//       if(props.planData[`${ props.item?.additionalPlanId}`]?.id === props.item.additionalPlanId){
//         // alert(props.planData.name)
//         // alert(props.planData[`${ props.item?.additionalPlanId}`].name)
//         setPlanName(props.planData[`${ props.item?.additionalPlanId}`].name)
//       }        
//     }
//   },[props.item.additionalPlanId])
  return (
    <>
     
      <Col className="d-flex boxpadmobile" key={props.item.id} xs={12}md={4}lg={4} >
        
      <Card className="flex-fill mb-3 boxshadowmobile" key={props.item.id} style={{ borderRadius:'15px' }} >            
        <Card.Img className='imgpadmobile' style={{ height: "25vh",borderRadius:'10px 10px 0 0', objectFit: 'cover' }} variant="top" src={props.item.thumbnailUrl} />
        <CInputGroup style={{ position: "absolute" }}>
        </CInputGroup>
        <CCardBody style={{padding:'0'}}>
        <div class="price-sec mt-3">
        {/* <TbCurrencyRupee/>  */}
              <h5 style={{textAlign:'left',marginLeft:'25px'}}>₹ {props.item.price}</h5>
          </div>
          <div class="flex-jcb-ais mx-4">
            <p class="des" style={{textAlign:'left'}}>
                <b class="black">Mahindra</b> <span style={{color:'lightgray'}}>- 2019 <br />
                YUVO 415 D, 45 HP</span>
            </p>
            {props.item.additionalPlanId === null ? 
            <select id="productType" class='pcBtn ms-2' onClick={(event) => planSelect(props.item.id, event.target.value)}>
              <option>Select</option>
                {
                   planList.length > 0 &&  planList.map( (plan,idx) => 
                    <option key={idx} value={plan.id}>{plan.name}</option> )
                }
                </select> :
                 <select id="productType" class='pcBtn ms-2' value={'Plan 10'}
                 onClick={(event) => planSelect(props.item.id, event.target.value)}>
                 <option>Select</option>
                   {
                      planList.length > 0 &&  planList.map( (plan,y) => 
                       <option key={y} value={plan.id}>{plan.name}</option> )
                   }
                   </select>
                }
          </div>
          <div class="call_now flex-jcb-aic">
              <div>
                {/* <FontAwesomeIcon icon="fa-solid fa-pen" /> */}
                <span style={{padding:"0 5px"}}><FaPencilAlt aria-hidden="true" />
                </span>{' '}
                <span style={{padding:"0 5px"}}><FaTrash aria-hidden="true" /></span>
              </div>
              <p class='sbmt' >Submit</p>
          </div>
       
        </CCardBody>
       
      </Card>
      
  </Col>
      
    </>
  );
}



export default PostingCard;