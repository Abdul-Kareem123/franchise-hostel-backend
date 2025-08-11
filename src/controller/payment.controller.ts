
import {generateOrderId  } from "../helper/commonResponseHandler";
import {Distributor} from '../models/distributor.model';
import { Cashfree } from "cashfree-pg";

// Configure Cashfree credentials
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID || "";
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET || "";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;




/**
 *  @author Mohanraj 
 *  @date   27-5-2024
 *  @param {Object} req
 *  @param {Object} res
 *  @param {Function} next
 *  @description This Function is used to subcription user plans
 * */
export const payPlan = async (req, res, next) => {
    try {
      
        const userData = await Distributor.findOne({ _id: req.body.distributorId });

        if (!userData) {
            return res.status(404).json({ message: "Subscription or User not found" });
        } else {
            const planAmount = req.body.amount;
            //data.price !== undefined ? parseFloat(data.price.toString()) : 0; // Convert order amount to number
            const return_url = "https://dev-api.pixalivefranchise.com/api/";
            // const notify_url = "http://localhost:3000/";
            const orderId = await generateOrderId(); // Generate order ID
            const planRequest = {
                order_amount: planAmount,
                order_currency: "INR",
                order_id: orderId.toString(), // Ensure order_id is a string
                customer_details: {
                    customer_id: userData._id.toString(), // Convert ObjectId to string
                    customer_phone: userData.mobileNumber?.toString() || '',
                    customer_name: userData.name?.toString(),
                    customer_email: userData.email.toString()  
                },
                order_meta: {
                    return_url: return_url.toString(),
                    // notify_url: notify_url
                },
                order_note: `User Inventing our Brand`
            };


            console.log("========Payment Request========", planRequest);
            const response = await Cashfree.PGCreateOrder("2023-08-01", planRequest);
            res.json(response.data);
        }
    } catch (error:any) {
        res.status(500).json({ message: "Failed to initiate payment", error: error.response?.data || error.message });
    }
};



// Function to handle payment response
export const verifyPayment = async (req, res, next) => {
    try {
        const orderId = req.body.orderId;
        console.log(orderId);
        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }else{
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);        
        const value = response.data  
        if(!value){
            return res.status(400).json({ message: "Payment not found" });
        }  
        const result = {}
        result['paymentOrder_id'] = value[0]?.order_id;
        result["payment_completion_time"]=value[0]?.payment_completion_time;
        result["payment_Amount"]=value[0]?.payment_amount;
        result["payment_method"]=value[0]?.payment_method;
        result["payment_status"]=value[0]?.payment_status;
        const status=value[0]?.payment_status;
        if(status=="SUCCESS"){
                    updateOrderPaymentStatus(req.body.distributorId,value)
                     // this calling function have to use the update the status of our payment in the user model
                    // and two modules have to call the same functions
                }
        res.json(result);
        }
    } catch (error:any) {
        console.error('Error handling payment response:', error);
        res.status(500).json({ message: 'Failed to handle payment response', error: error.message });
    }
  };

async function  updateOrderPaymentStatus(distributorId,value,) {
    try {
       // console.log('value:', JSON.stringify(value, null, 2));
        const paymentMethod = value[0]?.payment_method;
        // Ensure paymentMethod is an object and not undefined
        if (typeof paymentMethod !== 'object' || paymentMethod === null) {
          throw new Error('Invalid payment method structure');
        }
        const upi = paymentMethod?.upi;
        const card = paymentMethod?.card;
        // Logging to debug the structure of upi and card
        // console.log('upi:', JSON.stringify(upi, null, 2));
        // console.log('card:', JSON.stringify(card, null, 2));

      const order = await Distributor.findByIdAndUpdate({_id:distributorId}, {
        $set:{ 
        paymentOrder_id: value[0]?.order_id,
        payment_completion_time:value[0]?.payment_completion_time,
        payment_amount:value[0]?.payment_amount,
        payment_status: value[0]?.payment_status},
        $push:{payment_method:{
                upi: {
                upi_id: upi?.upi_id || null,
                channel: upi?.channel || null
                },
                card: {
                channel: card?.channel || null,
                card_network: card?.card_network || null,
                card_type: card?.card_type || null,
                card_country: card?.card_country || null,
                card_bank_name: card?.card_bank_name || null,
                card_sub_type: card?.card_sub_type || null,
                card_number: card?.card_number || null
                }
            }
        }  }, { new: true });    

    } catch (err:any) {
        console.log(err);
    }
  };
