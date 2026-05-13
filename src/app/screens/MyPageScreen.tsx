import { BottomTabBar } from '../components/BottomTabBar';
import { ChevronRight, User, Bell, Globe, Settings, HelpCircle } from 'lucide-react';

interface MyPageScreenProps {
  onTabChange: (tab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my') => void;
}

export function MyPageScreen({ onTabChange }: MyPageScreenProps) {
  const profile = {
    name: '미나',
    nationality: '베트남',
    koreanLevel: '중급',
    purpose: '유학',
    interests: ['학교생활', '카페 / 식당', '교통']
  };

  const settingsSections = [
    {
      title: '계정',
      items: [
        { icon: User, label: '프로필 설정', hasArrow: true }
      ]
    },
    {
      title: '앱 설정',
      items: [
        { icon: Bell, label: '알림 설정', hasArrow: true },
        { icon: Globe, label: '언어 설정', value: '한국어', hasArrow: true },
        { icon: Settings, label: '학습 설정', hasArrow: true }
      ]
    },
    {
      title: '지원',
      items: [
        { icon: HelpCircle, label: '도움말 / 문의', hasArrow: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl mb-6">마이</h1>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-5 mb-6 border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
              <User size={32} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl mb-1">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.nationality}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">한국어 수준</span>
              <span className="text-sm font-medium">{profile.koreanLevel}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-border">
              <span className="text-sm text-muted-foreground">체류 목적</span>
              <span className="text-sm font-medium">{profile.purpose}</span>
            </div>

            <div className="flex items-start justify-between py-2 border-t border-border">
              <span className="text-sm text-muted-foreground">관심 분야</span>
              <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="bg-primary-light text-primary px-2 py-0.5 rounded-full text-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm text-muted-foreground mb-3">{section.title}</h3>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                        index !== section.items.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className="text-muted-foreground" />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.value && (
                          <span className="text-sm text-muted-foreground">{item.value}</span>
                        )}
                        {item.hasArrow && <ChevronRight size={20} className="text-muted-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">NEURU v1.0.0</p>
        </div>
      </div>

      <BottomTabBar activeTab="my" onTabChange={onTabChange} />
    </div>
  );
}
