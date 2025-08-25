import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const sendTemplateMessage = async (toNumber) => {
  const phoneNumberId = '704538612744489'; // From Meta dashboard
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // better to keep in .env

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: toNumber,
        type: "template",
        template: {
          name: "kips_notifications_settings",
          language: {
            code: "en_US"
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`Message sent successfully to ${toNumber}:`, response.data);
  } catch (error) {
    console.error(`Error sending message to ${toNumber}:`, error.response?.data || error.message);
  }
};

const numbers = [
  process.env.RECIEVER_NUMBER_1,
  process.env.RECIEVER_NUMBER_2
];

// loop through both numbers
numbers.forEach(number => {
  if (number) sendTemplateMessage(number);
});
