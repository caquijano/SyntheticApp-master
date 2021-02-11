import Stripe from 'react-native-stripe-api';

const apiKey = 'pk_test_51HKPhDHBXfvF0l60R4RBbwKUqgcAUaPGCbeSo9Bpw5g4RrolVqmDDif8SFQKYieK3KaoyeKsSN3NzoNW18TiNFjb00m6MSZdKz';
const client = new Stripe(apiKey);

// Create a Stripe token with new card infos
const token = await client.createToken({
       number: '4242424242424242' ,
       exp_month: '09', 
       exp_year: '18', 
       cvc: '111',
       address_zip: '12345'
    });