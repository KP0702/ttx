export type ViewType = 'user' | 'admin';

export interface ViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
} 