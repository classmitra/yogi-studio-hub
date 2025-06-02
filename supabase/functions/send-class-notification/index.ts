
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ClassNotificationRequest {
  classData: {
    title: string;
    description: string;
    start_date: string;
    start_time: string;
    duration_minutes: number;
    meeting_link?: string;
    instructor_name: string;
    studio_name: string;
  };
  studentEmails: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { classData, studentEmails }: ClassNotificationRequest = await req.json();
    
    const emailPromises = studentEmails.map(email => 
      sendClassEmail(email, classData)
    );
    
    await Promise.all(emailPromises);

    return new Response(
      JSON.stringify({ success: true, sent: studentEmails.length }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending class notifications:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function sendClassEmail(email: string, classData: any) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .class-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .meeting-link { background: #000; color: white; padding: 15px; text-align: center; margin: 20px 0; }
        .meeting-link a { color: white; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ClassMitra</h1>
          <h2>Class Confirmation</h2>
        </div>
        
        <div class="content">
          <h3>You're all set for ${classData.title}!</h3>
          <p>Dear Student,</p>
          <p>Your class booking has been confirmed. Here are the details:</p>
          
          <div class="class-details">
            <h4>${classData.title}</h4>
            <p><strong>Instructor:</strong> ${classData.instructor_name}</p>
            <p><strong>Studio:</strong> ${classData.studio_name}</p>
            <p><strong>Date:</strong> ${formatDate(classData.start_date)}</p>
            <p><strong>Time:</strong> ${formatTime(classData.start_time)}</p>
            <p><strong>Duration:</strong> ${classData.duration_minutes} minutes</p>
            ${classData.description ? `<p><strong>Description:</strong> ${classData.description}</p>` : ''}
          </div>
          
          ${classData.meeting_link ? `
            <div class="meeting-link">
              <p>Join your class here:</p>
              <a href="${classData.meeting_link}" target="_blank">JOIN CLASS NOW</a>
            </div>
            <p><strong>Important:</strong> Please join the meeting 5 minutes before the scheduled time.</p>
          ` : ''}
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Namaste! 🧘‍♀️</p>
        </div>
        
        <div class="footer">
          <p>© 2024 ClassMitra | classmitra.com</p>
          <p>This email was sent regarding your class booking.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await resend.emails.send({
    from: "ClassMitra <noreply@classmitra.com>",
    to: [email],
    subject: `Class Confirmed: ${classData.title} - ${formatDate(classData.start_date)}`,
    html: emailHtml,
  });
}
