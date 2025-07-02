const functions = require('firebase-functions');

const admin = require('
acct_1RcjDXJnh7g2pvRQ');

const stripe = require('stripe')('9ddb3b9f84555e18966b931c9e09ffc3560e2060');



admin.initializeApp();



exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {

    const { facilityId } = req.body;



    try {

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],

            line_items: [{

                price: 'prod_SbOaoBQ9eQT6jD', // Create a price in Stripe dashboard

                quantity: 1
                {
  "id": "price_1RgBnTJnh7g2pvRQlSyIBhO2",
  "object": "price",
  "active": true,
  "currency": "usd",
  "custom_unit_amount": null,
  "nickname": null,
  "recurring": {
    "aggregate_usage": null,
    "interval": "month",
    "interval_count": 1,
    "trial_period_days": null,
    "usage_type": "licensed"
  },
  "tiers_mode": null,
  "transform_quantity": null,
  "unit_amount": 2000000,
  "unit_amount_decimal": "2000000"
}

            }],

            mode: 'subscription',

            success_url: 'https://https://true-treat-patient-care.web.app//facility-signup.html?success=true',

            cancel_url: 'https://https://true-treat-patient-care.web.app//facility-signup.html?success=false',

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
