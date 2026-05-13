import { Home, BookOpen, Dog, GraduationCap, User } from 'lucide-react';

interface BottomTabBarProps {
  activeTab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my';
  onTabChange: (tab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my') => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs = [
    { id: 'home' as const, label: '홈', icon: Home },
    { id: 'quiz' as const, label: '퀴즈', icon: BookOpen },
    { id: 'neuru' as const, label: '느루', icon: Dog },
    { id: 'learning' as const, label: '학습', icon: GraduationCap },
    { id: 'my' as const, label: '마이', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 bg-card border-t border-border">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1"
            >
              <Icon
                size={24}
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
