
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppRequest {
  phoneNumber: string;
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, message }: WhatsAppRequest = await req.json();
    
    const result = await sendWhatsAppMessage(phoneNumber, message);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  const WHATSAPP_API_TOKEN = Deno.env.get("WHATSAPP_API_TOKEN");
  const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  
  if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    throw new Error("WhatsApp API credentials not configured");
  }

  // TODO: Implement actual WhatsApp Business API integration
  // For now, return placeholder success
  console.log(`Would send WhatsApp to ${phoneNumber}: ${message}`);
  return { success: true, messageId: `placeholder_${Date.now()}` };

  /*
  // Actual WhatsApp Business API implementation (uncomment when credentials are available):
  
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: message
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`WhatsApp API error: ${response.statusText}`);
  }

  const result = await response.json();
  return { success: true, messageId: result.messages[0].id };
  */
}
