
import { 
  Plus, 
  Users, 
  BarChart3, 
  Eye, 
  Calendar,
  Settings 
} from 'lucide-react';

export interface QuickAction {
  icon: any;
  label: string;
  description: string;
  onClick: () => void;
  primary: boolean;
}

export const createQuickActionsData = (
  navigate: (path: string) => void,
  setShowClassForm: (show: boolean) => void
): QuickAction[] => [
  {
    icon: Plus,
    label: 'Create New Class',
    description: 'Schedule a new yoga class',
    onClick: () => setShowClassForm(true),
    primary: true
  },
  {
    icon: Eye,
    label: 'View Studio',
    description: 'Preview your public studio page',
    onClick: () => navigate('/view-studio'),
    primary: false
  },
  {
    icon: Users,
    label: 'Manage Students',
    description: 'View and manage your students',
    onClick: () => navigate('/students-management'),
    primary: false
  },
  {
    icon: Calendar,
    label: 'Class Schedule',
    description: 'View your class calendar',
    onClick: () => navigate('/class-schedule'),
    primary: false
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    description: 'View performance metrics',
    onClick: () => navigate('/analytics'),
    primary: false
  },
  {
    icon: Settings,
    label: 'Studio Settings',
    description: 'Update your studio information',
    onClick: () => navigate('/studio-setup'),
    primary: false
  }
];
