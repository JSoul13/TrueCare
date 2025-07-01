// Firebase Configuration
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB07SQVX49vHx7oDWQjM3AzvDZnuMxKXLA",
  authDomain: "true-treat-patient-care.firebaseapp.com",
  projectId: "true-treat-patient-care",
  storageBucket: "true-treat-patient-care.firebasestorage.app",
  messagingSenderId: "458873266752",
  appId: "1:458873266752:web:c41f4bd6814d8b25a375a5",
  measurementId: "G-M7MN9614H5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Patient Form Submission
document.getElementById('patientForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        insuranceType: document.getElementById('insuranceType').value,
        insuranceProvider: document.getElementById('insuranceProvider').value,
        policyNumber: document.getElementById('policyNumber').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await db.collection('patients').add(formData);
        document.getElementById('formMessage').innerHTML = '<div class="alert alert-success">Thank you! We’ll match you with facilities soon.</div>';
        document.getElementById('patientForm').reset();
    } catch (error) {
        document.getElementById('formMessage').innerHTML = '<div class="alert alert-danger">Error submitting form. Please try again.</div>';
    }
});

// Stripe Setup
const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');

// Facility Subscription
async function subscribeFacility() {
    const facilityData = {
        name: document.getElementById('facilityName').value,
        email: document.getElementById('facilityEmail').value,
        website: document.getElementById('facilityWebsite').value,
        location: document.getElementById('facilityLocation').value,
        insuranceAccepted: document.getElementById('insuranceAccepted').value,
        subscriptionStatus: 'pending',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        // Save facility data to Firestore
        const facilityRef = await db.collection('facilities').add(facilityData);

        // Create Stripe Checkout session
        const response = await fetch('https://YOUR_FIREBASE_FUNCTION_URL/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ facilityId: facilityRef.id })
        });
        const session = await response.json();

        // Redirect to Stripe Checkout
        stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
        document.getElementById('facilityMessage').innerHTML = '<div class="alert alert-danger">Error processing subscription. Please try again.</div>';
    }
}
