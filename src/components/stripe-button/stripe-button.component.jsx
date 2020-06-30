import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price, }) => {
    const priceForStripe = price * 100;
    const publisherKey = "pk_test_51GzPlBBCV5tqeCbtM0eZryOc8VcgbPurTCZOKiW385bNI9ykFpPGwilQmwskK5gUXTjln5pgGZl5Oiwt1lGjWzFJ005j77naa3";

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crwn Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publisherKey}
        />
    )
}

export default StripeCheckoutButton