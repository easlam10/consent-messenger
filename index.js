import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

console.log('WhatsApp message script starting...');

const sendTemplateMessage = async (number) => {
  const phoneNumberId = '704538612744489'; // From Meta dashboard
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // better to keep in .env

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: number,
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

    console.log(`Message sent successfully to ${number}:`, response.data);
  } catch (error) {
    console.error(`Error sending message to ${number}:`, error.response?.data || error.message);
  }
};

const sendMessagesToAllNumbers = async () => {
  const numbers = [
    process.env.RECIEVER_NUMBER_1,
    process.env.RECIEVER_NUMBER_2
  ];

  for (const number of numbers) {
    if (number) {
      await sendTemplateMessage(number);
    }
  }
};

sendMessagesToAllNumbers();

