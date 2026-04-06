// ============================================
// SendPulse Integration Wrapper
// ============================================

const SENDPULSE_API_URL = 'https://api.sendpulse.com';

interface SendpulseTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export class SendPulseService {
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(
    private clientId: string = (import.meta as any).env.VITE_SENDPULSE_ID || '',
    private clientSecret: string = (import.meta as any).env.VITE_SENDPULSE_SECRET || ''
  ) {}

  /**
   * Authenticate with SendPulse API to obtain an access token.
   */
  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return; // Token is still valid
    }

    if (!this.clientId || !this.clientSecret) {
      console.warn('SendPulse credentials are not provided. Skipping authentication.');
      return;
    }

    try {
      const response = await fetch(`${SENDPULSE_API_URL}/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      if (!response.ok) {
        throw new Error(`SendPulse Auth Error: ${response.statusText}`);
      }

      const data: SendpulseTokenResponse = await response.json();
      this.accessToken = data.access_token;
      // Safety margin of 60 seconds
      this.tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
    } catch (error) {
      console.error('Failed to authenticate with SendPulse', error);
      throw error;
    }
  }

  /**
   * Send a notification to a user or admin
   */
  async sendNotification(telegramId: number, eventName: string, payload: Record<string, any>) {
    await this.authenticate();
    
    if (!this.accessToken) {
      console.log(`[Mock SendPulse] Notification '${eventName}' to ${telegramId} with payload:`, payload);
      return;
    }

    // Example implementation of triggering a SendPulse custom event (Automation 360)
    // You need to create an event in SendPulse Automation 360 and use its URL or ID.
    console.log('Sending real notification to SendPulse API...', { telegramId, eventName, payload });
    
    // REPLACE with your actual SendPulse Event URL
    const EVENT_URL = 'https://events.sendpulse.com/events/id/YOUR_EVENT_ID'; 

    try {
      await fetch(EVENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({
          email: `${telegramId}@telegram.local`, // Or phone, depending on SendPulse setup
          phone: '',
          // custom variables mapping
          ...payload
        })
      });
    } catch (error) {
      console.error('SendPulse sendNotification error:', error);
    }
  }
}

export const sendPulse = new SendPulseService();
