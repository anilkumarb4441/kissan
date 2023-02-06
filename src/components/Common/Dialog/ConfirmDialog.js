import React,{useState,useEffect} from "react";
import axios from 'axios'
 import { connect } from "react-redux";
 import { Card,  Col, Row } from "react-bootstrap";
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
 import {FaPencilAlt,FaTrash} from 'react-icons/fa';
 import { closeConfirmCancelDialog } from "./action";
 import { withStyles, makeStyles } from "@material-ui/core/styles";
 import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import {API_PUBLIC_HOST, API_PRIVATE_HOST} from '../Constants'
import {signUp, confirmSignUp, signIn, getCurrentSession} from "../../../endpoints/amplify/auth"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: "#0096D6",
    borderBottom: "1px solid #E0E0E0",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#0096D6",
  },
});
const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "green",
    },
    borderRadius: "20px",
    width: "100px",
  },
}))(Button);

const CancelButton = withStyles((theme) => ({
  root: {
    color: "#000000",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    borderRadius: "20px",
    width: "100px",
    borderColor: "lightgray",
  },
}))(Button);
const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ConfirmDialog = (props) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('');
  const [planList, setPlanList] = useState([])

  const planSelect =() =>{
    console.log(props.cardSrc.id)
    console.log(planList)
    // setPlanDropdown(planId)
  //  if(planId!=='Select') {
    getCurrentSession((success, user, jwtToken) => {
      const url = `${API_PRIVATE_HOST}/listing/addAdditionalPlanForListing?additionalPlanId=${selectedValue!==''?selectedValue:null}&listId=${props.cardSrc.id}`;
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
          props.closeConfirmCancelDialog()
        })
        .catch((error) => {
          console.log(error)
        });  
      })
  //  } else {
  //    let nullPlan = null
  //   getCurrentSession((success, user, jwtToken) => {
  //     const url = `${API_PRIVATE_HOST}/listing/addAdditionalPlanForListing?additionalPlanId=${nullPlan}&listId=${listId}`;
  //   //  alert(listId, planId);
  //     axios({
  //       method: 'GET',
  //       url: url,
  //       // data: values,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //          Authorization: jwtToken,
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response.data.response) 
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       });  
  //     })
  //  }
    
  }

  useEffect(() => {
    console.log('Arindam'+props.type)

    PlanList()
  },[])

  const PlanList = () => {
    
    getCurrentSession((success, user, jwtToken) => {
      const url = `${API_PRIVATE_HOST}/plan/list`;
      const newPlan = {
        "category_id": props.cardSrc.categoryId,
        "is_active": true,
        "planType": props.type === 'General' ? "GENERAL_PACKAGE": 'ADD_ON'
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
              console.log(response.data.response)
              setPlanList(response.data.response) 
          })
      
       
      })
  }
  

  const handleChange = (event) => {
    console.log(event.id)
    setSelectedValue(event.id);
  };

  const clearRadioChange = () => {
    setSelectedValue('');
  };

  return (
    <>
    {/* {alert('hi')} */}
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        onClose={props.closeConfirmCancelDialog}
        aria-labelledby="customized-dialog-title"
        open={props.modal}
        style={{height:'620px',boxSizing:'border-box'}}
      > 
        <DialogTitle
 					id='customized-dialog-title'
	 					onClose={props.closeConfirmCancelDialog}
 				>
				 <p style={{color:'black'}}>Choose your Add on Plan</p>
 				</DialogTitle>
 				<DialogContent>
         <Col className="d-flex boxpadmobile" xs={12}md={4}lg={4} style ={{width:'100%'}}>
         
         {/* <Card className="flex-fill mb-3 boxshadowmobile"  style={{ borderRadius:'15px' }} >    */}
         <div style ={{flexDirection:'row',width:'100%'}}>
         <img className='imgpadmobile' style={{ height: "113px",width:'180px',
           borderRadius:'5px', 
	           objectFit: 'cover' }} variant="top" src={props.cardSrc.thumbnailUrl} />
           {/* <CInputGroup style={{ position: "absolute" }}>
           </CInputGroup>
           <CCardBody style={{padding:'0'}}> */}
           {/* <div class="price-sec mt-3"> */}
                 {/* <p style={{textAlign:'left',}}>₹ {123}</p> */}
           </div>         
           
             {/* </div> */}
             {/* <div class="flex-jcb-ais mx-4"> */}
             <div style ={{width:'100%'}}>
               <p class="des" style={{textAlign:'left',paddingLeft:'20px'}}>
                   <b class="black">₹ {props.cardSrc.price}</b><br /> <span style={{color:'lightgray'}}> 
                   {props.cardSrc.title}<br /> {props.cardSrc.subtitle}</span>
               </p>  
            </div>
            
             {/* </div> */}
             
          
           {/* </CCardBody> */}
          
         {/* </Card> */}
         
     </Col>
 				</DialogContent>
         <div style={{width:'100%',clear:'both'}}>  
         {/* {console.log('Arindam'+JSON.stringify(planList))}            */}
         {planList && planList.length > 0 && planList.map(item=> {
           return  <Accordion style={{backgroundColor:'lightgray'}}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
             <Typography><b>{item.name === null ? 'Plan N/A' : item.name}</b></Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
               <div style={{paddingLeft:'50px',position:'relative',bottom:'60px',left:'25px'}}>
               <div style={{display:'flex'}}>
               <GreenRadio
                 checked={item[0]?.id}
                 onChange={()=>handleChange(item)}
                  value={item[0]?.id}
                 name="radio-button-demo"
                 inputProps={{ 'aria-label': 'C' }}
               />
                 <p style={{paddingLeft:'10px',position:'relative',top:'8px'}}>₹ {`${item.price} for ${item.tenure} days with`}</p>
                 </div>
                 <ul style={{paddingLeft:'70px'}}>
                   <li>Placed in dashboard banner </li>
                   <li>Show up when people search</li>
                   <li>Increase calls with</li>
                 </ul>
               </div>
             </Typography>
           </AccordionDetails>
         </Accordion>
         })}
         
          {/* <Accordion style={{backgroundColor:'lightgray'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><b>Plan 20</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div style={{paddingLeft:'50px',position:'relative',bottom:'60px',left:'25px'}}>
                <div style={{display:'flex'}}>
                <GreenRadio
                  checked={selectedValue === 'c'}
                  onChange={handleChange}
                  value="c"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'C' }}
                />
                  <p style={{paddingLeft:'10px',position:'relative',top:'8px'}}>₹ {'500 for 20 days with'}</p>
                  </div>
                  <ul style={{paddingLeft:'70px'}}>
                    <li>Placed in dashboard banner </li>
                    <li>Show up when people search</li>
                    <li>Increase calls with</li>
                  </ul>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{backgroundColor:'lightgray',borderRadius:'0 0 10px 10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><b>Plan 30</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                    Plan 30
              </Typography>
            </AccordionDetails>
          </Accordion>
               */}
      </div>
         <div style={{ padding: "0.5rem" }}>
           <span style={{ float: "right" }}>
            <CancelButton
              variant="outlined"
              className={classes.margin}
              size="small"
              onClick={clearRadioChange}
            >
              CLEAR
            </CancelButton>
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              size="small"
              onClick={planSelect}
            >
              confirm
            </ColorButton>
            {/* <button class="green-btn text-right" size='sm'>
              confirm <FaChevronRight/>
                  </button> */}
          </span>
        </div>
      </Dialog>
    </>
  );
};
 const mapStateToProps = (state) => {
   return {
     modal: state.Plan.cancelModal,
     // button: state.SystemSettings.button,
     cardSrc: state.Plan.cardSrc,
   };
 };
  
export default connect(mapStateToProps, {
  closeConfirmCancelDialog,
})(ConfirmDialog);
				