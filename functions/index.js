const functions = require('firebase-functions');

const admin = require('firebase-admin');

const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');



admin.initializeApp();



exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {

    const { facilityId } = req.body;



    try {

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],

            line_items: [{

                price: 'YOUR_STRIPE_PRICE_ID', // Create a price in Stripe dashboard

                quantity: 1

            }],

            mode: 'subscription',

            success_url: 'https://YOUR_DOMAIN/facility-signup.html?success=true',

            cancel_url: 'https://YOUR_DOMAIN/facility-signup.html?success=false',

            metadata: { facilityId }

        });



        res.json({ id: session.id });

    } catch (error) {

        res.status(500).send(error.message);

    }

});

8. `firebase.json`

{

    "hosting": {

        "public": ".",

        "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],

        "rewrites": [

            {

                "source": "**",

                "destination": "/index.html"

            }

        ]

    }

}
