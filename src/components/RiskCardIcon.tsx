import React from 'react';
import { 
  Building2, 
  Banknote, 
  Bell, 
  Users, 
  MessageSquare, 
  Target, 
  Shield, 
  AlertTriangle, 
  Lock, 
  BookOpen, 
  CheckCircle 
} from 'lucide-react';

interface RiskCardIconProps {
  iconName: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Banknote,
  Bell,
  Users,
  MessageSquare,
  Target,
  Shield,
  AlertTriangle,
  Lock,
  BookOpen,
  CheckCircle
};

export const RiskCardIcon: React.FC<RiskCardIconProps> = ({ iconName, className }) => {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }

  return <IconComponent className={className} />;
}; 