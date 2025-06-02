
import { supabase } from "@/integrations/supabase/client";

export interface MeetingDetails {
  id: string;
  join_url: string;
  start_url?: string;
  meeting_id: string;
  password?: string;
  provider: 'zoom' | 'google_meet';
}

export interface CreateMeetingRequest {
  title: string;
  start_time: string;
  start_date: string;
  duration_minutes: number;
  description?: string;
  instructor_email: string;
  provider: 'zoom' | 'google_meet';
}

export class MeetingIntegrationService {
  static async createMeeting(request: CreateMeetingRequest): Promise<MeetingDetails> {
    const { data, error } = await supabase.functions.invoke('create-meeting', {
      body: request
    });

    if (error) {
      throw new Error(`Failed to create meeting: ${error.message}`);
    }

    return data;
  }

  static async sendClassNotification(classData: any, students: string[]) {
    const { data, error } = await supabase.functions.invoke('send-class-notification', {
      body: {
        classData,
        studentEmails: students
      }
    });

    if (error) {
      throw new Error(`Failed to send notifications: ${error.message}`);
    }

    return data;
  }

  static async sendWhatsAppNotification(phoneNumber: string, message: string) {
    const { data, error } = await supabase.functions.invoke('send-whatsapp-notification', {
      body: {
        phoneNumber,
        message
      }
    });

    if (error) {
      console.error('WhatsApp notification failed:', error);
      // Don't throw error for WhatsApp as it's optional
    }

    return data;
  }
}
