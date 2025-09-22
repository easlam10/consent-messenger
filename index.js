import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const sendTemplateMessage = async () => {
  const phoneNumberId = '704538612744489'; // From Meta dashboard
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // better to keep in .env
  const number = process.env.RECIEVER_NUMBER_1;

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

sendTemplateMessage();

