
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateMeetingRequest {
  title: string;
  start_time: string;
  start_date: string;
  duration_minutes: number;
  description?: string;
  instructor_email: string;
  provider: 'zoom' | 'google_meet';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: CreateMeetingRequest = await req.json();
    
    let meetingDetails;
    
    if (request.provider === 'zoom') {
      meetingDetails = await createZoomMeeting(request);
    } else if (request.provider === 'google_meet') {
      meetingDetails = await createGoogleMeet(request);
    } else {
      throw new Error('Invalid meeting provider');
    }

    return new Response(JSON.stringify(meetingDetails), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function createZoomMeeting(request: CreateMeetingRequest) {
  const ZOOM_API_KEY = Deno.env.get("ZOOM_API_KEY");
  const ZOOM_API_SECRET = Deno.env.get("ZOOM_API_SECRET");
  
  if (!ZOOM_API_KEY || !ZOOM_API_SECRET) {
    throw new Error("Zoom API credentials not configured");
  }

  // TODO: Implement JWT token generation for Zoom API
  // For now, return placeholder data
  return {
    id: `zoom_${Date.now()}`,
    join_url: `https://zoom.us/j/placeholder?pwd=placeholder`,
    start_url: `https://zoom.us/s/placeholder?zak=placeholder`,
    meeting_id: "placeholder_meeting_id",
    password: "placeholder_password",
    provider: 'zoom' as const
  };

  /* 
  // Actual Zoom API implementation (uncomment when credentials are available):
  
  const startDateTime = `${request.start_date}T${request.start_time}:00`;
  
  const zoomMeetingData = {
    topic: request.title,
    type: 2, // Scheduled meeting
    start_time: startDateTime,
    duration: request.duration_minutes,
    agenda: request.description || '',
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: false,
      mute_upon_entry: true,
      watermark: false,
      use_pmi: false,
      approval_type: 2,
      audio: 'both',
      auto_recording: 'none'
    }
  };

  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zoomMeetingData)
  });

  if (!response.ok) {
    throw new Error(`Zoom API error: ${response.statusText}`);
  }

  const meeting = await response.json();
  
  return {
    id: meeting.id.toString(),
    join_url: meeting.join_url,
    start_url: meeting.start_url,
    meeting_id: meeting.id.toString(),
    password: meeting.password,
    provider: 'zoom' as const
  };
  */
}

async function createGoogleMeet(request: CreateMeetingRequest) {
  const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
  const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
  
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Google API credentials not configured");
  }

  // TODO: Implement Google Calendar API integration
  // For now, return placeholder data
  return {
    id: `google_${Date.now()}`,
    join_url: `https://meet.google.com/placeholder-meeting-id`,
    meeting_id: "placeholder_google_meeting_id",
    provider: 'google_meet' as const
  };

  /*
  // Actual Google Calendar API implementation (uncomment when credentials are available):
  
  const startDateTime = new Date(`${request.start_date}T${request.start_time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + request.duration_minutes * 60000);
  
  const event = {
    summary: request.title,
    description: request.description || '',
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'UTC'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'UTC'
    },
    conferenceData: {
      createRequest: {
        requestId: `meet_${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    },
    attendees: [
      { email: request.instructor_email }
    ]
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    }
  );

  if (!response.ok) {
    throw new Error(`Google Calendar API error: ${response.statusText}`);
  }

  const createdEvent = await response.json();
  const meetLink = createdEvent.conferenceData?.entryPoints?.[0]?.uri;
  
  return {
    id: createdEvent.id,
    join_url: meetLink || '',
    meeting_id: createdEvent.id,
    provider: 'google_meet' as const
  };
  */
}
