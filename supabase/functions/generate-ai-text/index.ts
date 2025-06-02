
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Generate AI text function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context } = await req.json();
    console.log('Generating AI text with prompt:', prompt);

    // If no OpenAI key is configured, return a placeholder response
    if (!openAIApiKey) {
      console.log('OpenAI API key not configured, returning placeholder');
      const placeholderText = generatePlaceholderText(prompt);
      return new Response(JSON.stringify({ generatedText: placeholderText }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates compelling, professional content for yoga studios and wellness businesses. Write in a warm, inviting tone that appeals to yoga practitioners.'
          },
          {
            role: 'user',
            content: `${prompt}\n\nContext: ${context}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('AI text generated successfully');
    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-text function:', error);
    
    // Return a fallback placeholder instead of an error
    const { prompt } = await req.json().catch(() => ({ prompt: 'Generate content' }));
    const placeholderText = generatePlaceholderText(prompt);
    
    return new Response(JSON.stringify({ generatedText: placeholderText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generatePlaceholderText(prompt: string): string {
  if (prompt.toLowerCase().includes('yoga class')) {
    return "Join us for this transformative yoga practice designed to nurture your body, mind, and spirit. Our experienced instructor will guide you through a sequence of poses that promote flexibility, strength, and inner peace. Whether you're a beginner or advanced practitioner, this class offers modifications for all levels. Come as you are and leave feeling refreshed, centered, and connected to your authentic self.";
  }
  
  if (prompt.toLowerCase().includes('instructor') || prompt.toLowerCase().includes('teacher')) {
    return "Passionate yoga instructor dedicated to creating a safe and welcoming space for students of all levels. With years of experience and ongoing training, I bring authenticity and mindfulness to every class. My teaching style focuses on alignment, breath awareness, and helping students develop a sustainable practice that serves them both on and off the mat.";
  }
  
  if (prompt.toLowerCase().includes('studio')) {
    return "Welcome to our serene yoga studio, a sanctuary where ancient wisdom meets modern wellness. Our beautiful space is designed to support your journey of self-discovery and transformation. We offer a variety of classes, workshops, and retreats to meet you wherever you are in your practice. Come experience the healing power of yoga in our supportive community.";
  }
  
  return "This is a placeholder text generated while AI services are being configured. Please replace this with your own content or configure the OpenAI API key in your Supabase secrets to enable AI-powered content generation.";
}
