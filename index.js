import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const sendTemplateMessage = async () => {
  const phoneNumberId = '704538612744489'; // From Meta dashboard
  const toNumber = process.env.RECIEVER_NUMBER; // Recipient number
  const accessToken = 'EAATrndy9e08BPI5tgY3Qs9Hk87u78Ula93Pwu2RAZBPiEwwmBj2mfZAcjbhJrcgbkdmUnLRBmvorgUR34hgcDykQZBwcBZB61lOBZBTDTHZBqw1V6l92qv9BcmHRHQSm3CsgL19ag7wseb0se6teMWdi6gPY30ZCaIZAYtlmIWZCeuENb0BvwJ1Qy3S0FJFa7FTpkVAZDZD'; // System user access token

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: toNumber,
        type: "template",
        template: {
          name: "ragzon_alerts",
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

    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
  }
};

sendTemplateMessage();