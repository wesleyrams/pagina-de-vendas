
var stripe = Stripe('pk_live_51PnB6pP5uUCUxCceOXuAXP9vwrf3paRQF7AkoIibKWLZLVMqEB16aqK6ittMq6WudE4qHzPuIUqGZ0fThLNUbfeI000rnUTSPx'); // Use a chave pública de teste para desenvolvimento

var checkoutButtonBasic = document.getElementById('checkout-button-basic');
var checkoutButtonProfessional = document.getElementById('checkout-button-professional');
var checkoutButtonPremium = document.getElementById('checkout-button-premium');

function handleCheckout(plan) {
    fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: plan })
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        if (data.error) {
            alert(data.error);
        } else {
            stripe.redirectToCheckout({ sessionId: data.id });
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        
    });
}

checkoutButtonBasic.addEventListener('click', function(e) {
    e.preventDefault();
    handleCheckout('basic');
});

checkoutButtonProfessional.addEventListener('click', function(e) {
    e.preventDefault();
    handleCheckout('professional');
});

checkoutButtonPremium.addEventListener('click', function(e) {
    e.preventDefault();
    handleCheckout('premium');
});
