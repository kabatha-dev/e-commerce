import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationsService {
  private twilioClient: Twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID; // Use environment variables for sensitive data
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Twilio account SID and auth token must be provided.');
    }

    this.twilioClient = Twilio(accountSid, authToken);
  }

  async sendOrderConfirmationSMS(phone: string, orderId: number) {
    try {
      await this.twilioClient.messages.create({
        body: `Your order with ID ${orderId} has been confirmed.`,
        from: '+1234567890', // Ensure this is a valid Twilio phone number
        to: phone,
      });
    } catch (error) {
      console.error('Error sending order confirmation SMS:', error);
      throw new Error('Failed to send order confirmation SMS.');
    }
  }

  async sendShippingUpdateSMS(phone: string, orderId: number, status: string) {
    try {
      await this.twilioClient.messages.create({
        body: `Your order with ID ${orderId} is now ${status}.`,
        from: '+1234567890', // Ensure this is a valid Twilio phone number
        to: phone,
      });
    } catch (error) {
      console.error('Error sending shipping update SMS:', error);
      throw new Error('Failed to send shipping update SMS.');
    }
  }
}
