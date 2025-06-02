
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AiTextHelperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prompt?: string;
  minLength?: number;
  required?: boolean;
  rows?: number;
  className?: string;
}

const AiTextHelper = ({
  value,
  onChange,
  placeholder = "Enter your text...",
  prompt = "Generate helpful content based on the context",
  minLength,
  required = false,
  rows = 4,
  className = ""
}: AiTextHelperProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-text', {
        body: {
          prompt: prompt,
          context: value || placeholder
        }
      });

      if (error) throw error;

      if (data?.generatedText) {
        onChange(data.generatedText);
        toast({
          title: "AI Content Generated",
          description: "AI has generated content for you. You can edit it as needed.",
        });
      }
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "AI Generation Failed",
        description: "Unable to generate AI content. Please try again or write manually.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {minLength && `Minimum ${minLength} characters`}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAiGenerate}
          disabled={isGenerating}
          className="flex items-center space-x-2 text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
        </Button>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`border-gray-300 focus:border-black focus:ring-black ${className}`}
      />
      
      {value && (
        <div className="text-xs text-gray-500">
          {value.length} characters
          {minLength && value.length < minLength && (
            <span className="text-red-500 ml-2">
              (Need {minLength - value.length} more)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AiTextHelper;
