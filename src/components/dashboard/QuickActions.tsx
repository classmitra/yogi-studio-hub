
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import ClassForm from '@/components/classes/ClassForm';
import ActionButton from './ActionButton';
import { createQuickActionsData } from './QuickActionsData';

const QuickActions = () => {
  const navigate = useNavigate();
  const [showClassForm, setShowClassForm] = useState(false);

  const actions = createQuickActionsData(navigate, setShowClassForm);

  return (
    <>
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-black">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action, index) => (
            <ActionButton
              key={index}
              icon={action.icon}
              label={action.label}
              description={action.description}
              onClick={action.onClick}
              primary={action.primary}
            />
          ))}
        </CardContent>
      </Card>

      {showClassForm && (
        <ClassForm onClose={() => setShowClassForm(false)} />
      )}
    </>
  );
};

export default QuickActions;
