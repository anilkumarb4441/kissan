import React, { useState,useEffect } from 'react';
import { Card, Button, Col, Row } from "react-bootstrap";
// import Constant from "../../../constants";
import axios from 'axios'
import {
  CCardBody,
  CCardTitle,
  CInputGroup,
  CButton,
  CFormSelect,
  CInputGroupText
} from '@coreui/react';
import { connect } from "react-redux";
import {openConfirmDeleteDialog,closeConfirmDeleteDialog} from '../DeleteDialog/Dialog/ConfirmCancelDialog/action'
import {openConfirmCancelDialog,closeConfirmCancelDialog,setCardSource} from '../Common/Dialog/action'
import ConfirmDialog from '../Common/Dialog/ConfirmDialog'
import ConfirmCancelDeleteDialog from '../DeleteDialog/Dialog/ConfirmCancelDialog/ConfirmCancelDeleteDialog'
import { AiFillCaretDown } from 'react-icons/ai';
import {FaPencilAlt,FaTrash} from 'react-icons/fa';
import {API_PUBLIC_HOST, API_PRIVATE_HOST} from '../Common/Constants'
import {signUp, confirmSignUp, signIn, getCurrentSession} from "../../endpoints/amplify/auth"
import Utils from '../../common/utils';
import getPageForCategory from '../../common/utils'
import {setDealerListings} from '../action'
const ResuableCard = (props) => {
   
  const [filterArr, setFilterArr] = useState([]);
  const [planDropdown, setPlanDropdown] = useState('Select');
  const [locllistingId, setlocllistingId] = useState('');

 const openConfirmDlg = (data,item) => {
  props.setCardSource(item)
  console.log(props.item)
     props.openConfirmCancelDialog(data);
   };

  const resetPlan = (id,categoryId) => {
    let catId = Utils.getPageForCategory(categoryId)
    window.location.href=`http://kg-dev-ui.s3-website.ap-south-1.amazonaws.com/#create_postPage_${catId}?ListingId=${id}`
  }

  const openConfirmDeleteDlg = (data,id) => {
    setlocllistingId(id)
    props.openConfirmDeleteDialog(data);
  };
const setInitialSettings = () => {
   console.log('Arindam')
  };

  const save = () => {
   console.log('Aniket')
   getCurrentSession((success, user, jwtToken) => {
    const url = `${API_PUBLIC_HOST}/listing/deleteListing?listingId=${locllistingId}`;
    
    axios({
      method: 'delete',
      url: url,
      // data: values,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: jwtToken,
      },
    })
      .then((response) => {
        let arr = [...props.dealerListings]
        arr = arr.filter(x=>x.id !== locllistingId)
        props.setDealerListings(arr);
       props.closeConfirmDeleteDialog()
      })
      .catch((error) => {
        console.log(error)
      });  
    })
  };
  

  const removeCard =() => {
    // localStorage.removeItem('cardIds')
    // let arr1 = []
    // arr1 = localStorage.getItem('cardIds')
    
    // let interArr = []
    // let filtrArr = props.listingsList && props.listingsList.filter(x=> x.id !== props.item.id)
    // let modifiedArr = props.listingsList && props.listingsList.filter(x=> x.id === props.item.id)
    
    // if(arr1 && arr1.length > 0) {
    //   arr1 = JSON.parse(arr1)
    //   interArr = arr1.concat(modifiedArr)  
    // } else {
    //   interArr = modifiedArr
    // }
    
    // let arr = []
    // arr.push(props.item.id)
    // // localStorage.removeItem('cardIds')
    // interArr = JSON.stringify(interArr)
    // localStorage.setItem('cardIds', (interArr));
    // setFilterArr(filtrArr)
  }
  return (
    <>
     <ConfirmCancelDeleteDialog
          message={
            "Are you sure you want to delete, as data would be discarded if any changes done"
          }
          saveMessage={"Are you sure you want to save the changes"}
          func={setInitialSettings}
          saveFunc={save}
        />
    {props.modal === true ? 
       <ConfirmDialog 
    //  message={props.categoryId}
    //  saveMessage={props.item.thumbnailUrl}
    //  cardItem={props.item}
     type = {props.type}
     // func={setInitialSettings}
     // saveFunc={save}
 
 /> : null }
 {props.dealerListings && props.type === 'Dealer' && props.dealerListings?.length > 0 && props.dealerListings.map((item)=> {
   return <> <Col key={item.id} className="d-flex boxpadmobile" xs={12}md={4}lg={4} >
         
   <Card className="flex-fill mb-3 boxshadowmobile"  style={{ borderRadius:'15px' }} >            
   {/* <Card.Img className='imgpadmobile' style={{ height: "25vh",borderRadius:'10px 10px 0 0', objectFit: 'cover' }} variant="top" src={props.item.thumbnailUrl} />
    */}
    <Card.Img className='imgpadmobile' style={{ height: "200px",width:'358px',boxSizing:'border-box',borderRadius:'10px 10px 0 0', 
     objectFit: 'fill' }} variant="top" src={item.thumbnailUrl} />
   <CInputGroup style={{ position: "absolute" }}>
   </CInputGroup>
   <CCardBody style={{padding:'0'}}>
   <div class="price-sec mt-3">
         <h5 style={{textAlign:'left',marginLeft:'25px'}}>₹ {item.price}</h5>
     </div>
     <div class="flex-jcb-ais mx-4">
       <p class="des" style={{textAlign:'left'}}>
           <b class="black">{item.title}</b> <span style={{color:'lightgray'}}> <br />
           {item.subtitle}</span>
       </p>
       <button className='pcBtn ms-2' style={{position:'relative',bottom:'40px',left:'15px'}} 
       onClick={() => openConfirmDlg("save",item)}>
       {item !== undefined && item['additionalPlanId'] !== '' && 
      item['additionalPlanId'] !== 'Select' 
        && props.dealerPlanData?.hasOwnProperty(`${item['additionalPlanId']}`)
       ? 
        props.dealerPlanData[`${item['additionalPlanId']}`].name:'Select Plan'
        }
       {/* Select Plan */}
       </button>
     </div>
     <div class="call_now flex-jcb-aic">
         <div>
           
           <span style={{padding:"0 5px"}} onClick={()=>resetPlan(item.id,item.categoryId)}>
          <FaPencilAlt aria-hidden="true"  />
           </span>{' '}
           <span style={{padding:"0 5px"}} onClick={() => openConfirmDeleteDlg("save",item.id)}>
             <FaTrash aria-hidden="true" /></span>
         </div>
         <p class='sbmt' onClick={removeCard}>Submit</p>
       </div>
  
   </CCardBody>
  
 </Card>
 
</Col>
</>
 })}
 {props.generalListings &&   props.type === 'General' &&  props.generalListings.length > 0 && props.generalListings.map((item)=> {
   return <> <Col key={item.id} className="d-flex boxpadmobile" xs={12}md={4}lg={4} >
         
   <Card className="flex-fill mb-3 boxshadowmobile"  style={{ borderRadius:'15px' }} >            
   {/* <Card.Img className='imgpadmobile' style={{ height: "25vh",borderRadius:'10px 10px 0 0', objectFit: 'cover' }} variant="top" src={props.item.thumbnailUrl} />
    */}
    <Card.Img className='imgpadmobile' style={{ height: "200px",width:'358px',boxSizing:'border-box',borderRadius:'10px 10px 0 0', 
     objectFit: 'fill' }} variant="top" src={item.thumbnailUrl} />
   <CInputGroup style={{ position: "absolute" }}>
   </CInputGroup>
   <CCardBody style={{padding:'0'}}>
   <div class="price-sec mt-3">
         <h5 style={{textAlign:'left',marginLeft:'25px'}}>₹ {item.price}</h5>
     </div>
     <div class="flex-jcb-ais mx-4">
       <p class="des" style={{textAlign:'left'}}>
           <b class="black">{item.title}</b> <span style={{color:'lightgray'}}> <br />
           {item.subtitle}</span>
       </p>
       <button className='pcBtn ms-2' style={{position:'relative',bottom:'40px',left:'15px'}} onClick={() => openConfirmDlg("save",item)}>
       {/* {item !== undefined && item.additionalPlanId !== '' && 
       item.additionalPlanId !== 'Select' 
       && props.planData.hasOwnProperty(`${props.item.additionalPlanId}`) ? 
        props.planData[`${props.item.additionalPlanId}`].name:'Plan Select'
        } */}
       Select Plan</button>
       {/* {z.additionalPlanId === null ? 
       <select id="productType" class='pcBtn ms-2' onChange={(event) => planSelect(z.id, event.target.value)}>
         <option>Select</option>
           {
              planList.length > 0 &&  planList.map( (plan,idx) => 
               <option key={idx} value={plan.id}>{plan.name}</option> )
           }
           </select> :
            <select id="productType" class='pcBtn ms-2' value={planDropdown}
            onChange={(event) => planSelect(props.item.id, event.target.value)}>
            <option>Select</option>
              {
                 planList.length > 0 &&  planList.map( (plan,y) => 
                  <option key={y} value={plan.id}>{plan.name}</option> )
              }
              </select>
           } */}
     </div>
     <div class="call_now flex-jcb-aic">
         <div>
           
           <span style={{padding:"0 5px"}} onClick={()=>resetPlan(item.id,item.categoryId)}>
          <FaPencilAlt aria-hidden="true"  />
           </span>{' '}
           <span style={{padding:"0 5px"}} onClick={() => openConfirmDeleteDlg("save",item.id)}>
             <FaTrash aria-hidden="true" /></span>
         </div>
         <p class='sbmt' onClick={removeCard}>Submit</p>
       </div>
  
   </CCardBody>
  
 </Card>
 
</Col>
</>
 })}
    </>
  );
}

// export default ResuableCard;
const mapStateToProps = (state) => {
 
  return {
    modal: state.Plan.cancelModal,
    dealerListings:state.dealer.dealerListings,
    generalListings:state.dealer.generalListings,
    dealerPlanData:state.dealer.dealerPlanData,
  };

};

export default connect(mapStateToProps, {
  openConfirmCancelDialog,
  setCardSource,
  closeConfirmCancelDialog,
  openConfirmDeleteDialog,
  closeConfirmDeleteDialog,
  setDealerListings,
  })(ResuableCard);