import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const LandingPageCarousel = (props) => {

    // render() {
        return (
            <Carousel showStatus={false} showThumbs={false} labels={false}>
                <div>
                    <img src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/the_farmers_market.png" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/sales_and_purchase.png" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                {/* <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="assets/4.jpeg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="assets/5.jpeg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="assets/6.jpeg" />
                    <p className="legend">Legend 6</p>
                </div> */}
            </Carousel>
        );
    
};

export default LandingPageCarousel
// import React, { useState } from 'react'
// import {
//   CCol,
//   CCarousel,
//   CCarouselItem,
// } from '@coreui/react'

// const LandingPageCarousel = (props) => {
//   const [imglist, setimglist] = useState([{
//     "id": 1,
//     "url": "https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/the_farmers_market.png"
//   },
//   {
//     "id": 2,
//     "url": "https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/sales_and_purchase.png"
//   },
//   {
//     "id": 3,
//     "url": "https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/your_services.png"
//   },
//   {
//     "id": 4,
//     "url": "https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/harvesting.png"
//   },
//   {
//     "id": 5,
//     "url": "https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/home-banner/pre-login/place_ads.png"
//   }])
//   return (
//     <CCol xs={12} className="position-relative">
//       <CCarousel controls indicators>
//         {imglist.map(mediaAccess => {
//           return (
//             <CCarouselItem key={mediaAccess.id}>
//               <div className="image-area">
//                 <img src={mediaAccess.url} className="d-block w-100" alt="Preview" />
//               </div>
//             </CCarouselItem>
//           );
//         })}
//       </CCarousel>
//     </CCol>

//   )
// }

// export default LandingPageCarousel


