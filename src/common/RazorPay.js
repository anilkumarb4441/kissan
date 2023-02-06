import Util from "./utils";
import BrandLogo from '../../src/assets/images/about_kisan.png'

export default class RazorPay  {
    static async handlePayment(companyName, amount, currency, order_id, callback){
       
        const res = await Util.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_qt2U92Jnej2LnK", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: companyName,
            description: "Test Transaction",
            image: { BrandLogo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                callback(data);
                
            },
            prefill: {
                name: "SDey",
                email: "SDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "S Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

}

