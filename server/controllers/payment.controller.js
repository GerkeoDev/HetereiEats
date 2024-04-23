require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

const processPayment = async (req, res) => {
    const { id, amount, description } = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            description,
            currency: "USD",
            payment_method: id,
            confirm: true,
            return_url: "http://localhost:3000/my-account/orders"   
        })

        res.json({ 
            message: 'Succesfull payment'
        })
    } catch (error) {
        console.error('Error processing payment:', error)
        res.json({ error: 'Error processing payment', message: error.raw.message})
    }
}

module.exports = {
    processPayment
}
