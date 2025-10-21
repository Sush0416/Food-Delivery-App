import express from 'express'
import Stripe from 'stripe'
import Order from '../models/Order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Create payment intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        userId: req.user._id.toString()
      }
    })

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating payment intent',
      error: error.message
    })
  }
})

// Handle Stripe webhooks
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      // Update order status in database
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { paymentStatus: 'paid', status: 'confirmed' }
      )
      break
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: failedPayment.id },
        { paymentStatus: 'failed' }
      )
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
})

export default router