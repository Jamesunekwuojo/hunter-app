// 
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async () => {
    try {
      // Step 1: Create a Payment Intent
      const response = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: parseFloat(amount),
      });

      // Step 2: Initialize Payment Sheet
      const { clientSecret } = response.data;
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      // Step 3: Present Payment Sheet
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        Alert.alert('Error', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment successful!');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Amount"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51R5uXbHcgjROghqEl3bVQ6ARF36t5oFZBxfTu1jD7eRNCRvix7z9RppbMDqctWGVcVf9EbA2lhF5NlJu3QSAkP0300pa9cALlS"
      
    >
      <PaymentScreen />
    </StripeProvider>
  );
}