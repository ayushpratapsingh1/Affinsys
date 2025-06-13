const axios = require('axios');

// Base currency is INR as per requirements
const BASE_CURRENCY = 'INR';

async function convertCurrency(amount, targetCurrency = BASE_CURRENCY) {
  if (targetCurrency === BASE_CURRENCY) {
    return amount;
  }

  try {
    // Get the latest exchange rates with USD as base
    const response = await axios.get(`https://open.er-api.com/v6/latest/USD`);
    const rates = response.data.rates;
    
    if (!rates || !rates[targetCurrency] || !rates[BASE_CURRENCY]) {
      throw new Error(`Currency ${targetCurrency} not supported`);
    }

    // Convert INR to USD first, then to the target currency
    const inrToUsd = 1 / rates[BASE_CURRENCY];
    const usdToTarget = rates[targetCurrency];
    
    // Calculate the conversion rate from INR to target currency
    const conversionRate = inrToUsd * usdToTarget;
    
    // Apply the conversion
    const convertedAmount = amount * conversionRate;
    
    return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
  } catch (error) {
    console.error('Currency conversion error:', error.message);
    throw new Error('Failed to convert currency');
  }
}

module.exports = { convertCurrency };
