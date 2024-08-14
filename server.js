const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET); // Use a chave secreta de teste para desenvolvimento
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/create-checkout-session', async (req, res) => {
    const { plan } = req.body;

    console.log(`Received plan: ${plan}`);

    let priceId;

    switch (plan) {
        case 'basic':
            priceId = 'price_1PnBZPP5uUCUxCceGSCuKVtm'; // Substitua pelo ID do preço correto
            break;
        case 'professional':
            priceId = 'price_1PnW1UP5uUCUxCcezHnNsiCy'; // Substitua pelo ID do preço correto
            break;
        case 'premium':
            priceId = 'price_1PnPiHP5uUCUxCcePREMIUM'; // Substitua pelo ID do preço correto
            break;
        default:
            res.status(400).json({ error: 'Invalid plan' });
            return;
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });

        console.log(`Session created: ${session.id}`);

        res.json({ id: session.id });
    } catch (error) {
        console.error(`Error creating session: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
