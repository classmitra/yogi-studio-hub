
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
}

const ActionButton = ({ icon: Icon, label, description, onClick, primary = false }: ActionButtonProps) => {
  return (
    <Button
      variant={primary ? "default" : "outline"}
      className={`w-full justify-start h-auto p-4 ${
        primary 
          ? 'bg-black hover:bg-gray-800 text-white' 
          : 'border-gray-300 text-black hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3 w-full">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="text-left">
          <div className="font-medium">{label}</div>
          <div className={`text-xs ${primary ? 'text-gray-200' : 'text-gray-500'}`}>
            {description}
          </div>
        </div>
      </div>
    </Button>
  );
};

export default ActionButton;
