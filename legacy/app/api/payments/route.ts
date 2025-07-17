import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const POST = async (req:NextRequest) => {

    const payLoad = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
      event = stripe.webhooks.constructEvent(payLoad, sig!,endpointSecret);

       switch (event.type) {
        case 'checkout.session.completed':
            console.log('Customer session completed')
            const sessionId = event.data.object.id;

            const session = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ['line_items'],
            },);            
            
            await handleCheckoutSessionCompleted({session, stripe});

        break;

        case 'customer.subscription.deleted':
            console.log('Customer subscription deleted')
            const subscription = event.data.object;
            console.log(subscription); 

            const subscriptionId = event.data.object.id;

            await handleSubscriptionDeleted({subscriptionId, stripe})

            console.log('subscription deleted successfully')
            break;
        
        default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
        
        }
      
    } catch (err:any) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return NextResponse.json(
        {error: 'Failed to Trigger Webhook', err},
        {status: 400}
        );
    }
    
    return NextResponse.json({
        status: 'success',
    })
    
}