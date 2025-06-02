
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
    const { prompt, existingText, formContext } = await req.json();
    console.log('Generating AI text with contextual prompt:', prompt);

    // If no OpenAI key is configured, return a contextual placeholder response
    if (!openAIApiKey) {
      console.log('OpenAI API key not configured, returning contextual placeholder');
      const placeholderText = generateContextualPlaceholder(existingText, formContext);
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
            content: 'You are a skilled yoga instructor and marketing expert who writes compelling, authentic class descriptions. Focus on benefits, what students will experience, and create a warm, welcoming tone that reflects the specific style and level of the class. Keep descriptions between 100-200 words unless specifically requested otherwise.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
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
    
    // Return a contextual fallback instead of a generic error
    try {
      const { existingText, formContext } = await req.json();
      const placeholderText = generateContextualPlaceholder(existingText, formContext);
      
      return new Response(JSON.stringify({ generatedText: placeholderText }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      // Final fallback
      return new Response(JSON.stringify({ 
        generatedText: "Please describe your yoga class, including what students can expect, the style of practice, and any special benefits or focus areas." 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
});

function generateContextualPlaceholder(existingText: string, formContext: any): string {
  const { title, category, difficultyLevel, duration } = formContext || {};
  
  // If user has existing text, improve upon it
  if (existingText && existingText.trim()) {
    return `${existingText.trim()} This class offers a transformative experience that nurtures both body and mind. Whether you're looking to build strength, increase flexibility, or find inner peace, you'll leave feeling refreshed and centered. All levels welcome with modifications provided as needed.`;
  }
  
  // Generate based on context
  let description = "";
  
  if (category === 'vinyasa') {
    description = `Join us for this dynamic ${title ? title.toLowerCase() : 'vinyasa'} practice that links breath with movement. Flow through creative sequences designed to build strength, flexibility, and mindfulness.`;
  } else if (category === 'yin') {
    description = `Experience the restorative power of ${title ? title.toLowerCase() : 'yin yoga'}. This gentle practice uses longer-held poses to deeply stretch connective tissues and promote relaxation.`;
  } else if (category === 'hatha') {
    description = `Discover the foundations of yoga in this ${title ? title.toLowerCase() : 'hatha'} class. Focus on alignment, breathing, and building a strong, sustainable practice.`;
  } else if (category === 'meditation') {
    description = `Find inner peace and clarity in this ${title ? title.toLowerCase() : 'meditation'} session. Learn techniques to calm the mind and cultivate present-moment awareness.`;
  } else {
    description = `Join us for this ${title ? title.toLowerCase() : 'yoga'} practice designed to support your wellness journey.`;
  }
  
  // Add level-specific content
  if (difficultyLevel === 'beginner') {
    description += " Perfect for newcomers to yoga, with clear instruction and plenty of modifications offered.";
  } else if (difficultyLevel === 'advanced') {
    description += " Designed for experienced practitioners ready to deepen their practice and explore challenging variations.";
  } else {
    description += " Suitable for all levels with options to modify or advance poses based on your experience.";
  }
  
  // Add duration context
  if (duration) {
    if (duration <= 30) {
      description += " This focused session fits perfectly into your busy schedule.";
    } else if (duration >= 75) {
      description += " Take time to fully immerse yourself in this comprehensive practice.";
    }
  }
  
  description += " Come as you are and leave feeling renewed, balanced, and connected to your inner strength.";
  
  return description;
}
