import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { BottomTabBar } from '../components/BottomTabBar';
import { Button } from '../components/Button';
import { Sparkles, TrendingUp, Award, Lock } from 'lucide-react';

interface NeuruScreenProps {
  selectedStage: NeuruStage;
  onStageChange: (stage: NeuruStage) => void;
  onTabChange: (tab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my') => void;
}

export function NeuruScreen({ selectedStage, onStageChange, onTabChange }: NeuruScreenProps) {
  type GrowthStageId = Extract<NeuruStage, 'baby' | 'child' | 'teen' | 'adult'>;

  const items = [
    { name: '작은 스카프', icon: '🧣' },
    { name: '지하철 카드 참', icon: '🎫' },
    { name: '편의점 뱃지', icon: '🏪' }
  ];

  const growthStages: Array<{
    id: GrowthStageId;
    title: string;
    level: string;
    description: string;
    image: string;
    locked: boolean;
  }> = [
    {
      id: 'baby',
      title: '신생아',
      level: 'Lv. 0~49',
      description: '처음 만난 NEURU',
      image: 'dog1_noback.png',
      locked: false
    },
    {
      id: 'child',
      title: '유년기',
      level: 'Lv. 50~99',
      description: '함께 배우는 시기',
      image: 'dog2_noback.png',
      locked: false
    },
    {
      id: 'teen',
      title: '청소년기',
      level: 'Lv. 100~149',
      description: '새로운 경험을 쌓는 시기',
      image: 'dog3_noback.png',
      locked: true
    },
    {
      id: 'adult',
      title: '성년기',
      level: 'Lv. 150~199',
      description: '더 넓은 세상을 탐험하는 시기',
      image: 'dog4_noback.png',
      locked: true
    }
  ];

  const selectedGrowthStage = growthStages.find((stage) => stage.id === selectedStage) ?? growthStages[1];
  const stageLabelMap: Record<GrowthStageId, string> = {
    baby: '신생아',
    child: '어린이',
    teen: '청소년',
    adult: '성년'
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl mb-6">느루</h1>

        {/* Character Display */}
        <div className="bg-card-beige rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="flex justify-center">
            <NeuruCharacter size="large" expression="happy" stage={selectedStage} />
          </div>

          {/* Decorative sparkles */}
          <div className="absolute top-4 right-4">
            <Sparkles size={20} className="text-accent" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Sparkles size={16} className="text-primary" />
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-card rounded-2xl p-5 mb-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl mb-1">느루</h2>
              <div className="flex items-center gap-2">
                <span className="text-primary text-sm font-medium">{stageLabelMap[selectedStage]}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-sm font-medium">Lv. 2</span>
              </div>
            </div>
            <div className="bg-primary-light p-3 rounded-full">
              <Award size={24} className="text-primary" />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">경험치</span>
              <span className="font-medium">65 / 100 XP</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: '65%' }} />
            </div>
          </div>

          <div className="bg-secondary-light rounded-xl p-3 text-center">
            <span className="text-sm text-secondary">다음 성장까지 35 XP 남음</span>
          </div>
        </div>

        {/* Growth Stage */}
        <div className="bg-card rounded-2xl p-5 mb-4 border border-border">
          <h3 className="mb-4">성장 단계</h3>

          <div className="grid grid-cols-4 gap-2">
            {growthStages.map((stage) => {
              const isSelected = selectedStage === stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  disabled={stage.locked}
                  onClick={() => {
                    if (!stage.locked) {
                      onStageChange(stage.id);
                    }
                  }}
                  className={`relative flex min-h-[168px] flex-col items-center rounded-2xl border px-2 pb-3 pt-2 text-center transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary-light/40 shadow-sm'
                      : stage.locked
                      ? 'cursor-not-allowed border-border bg-muted/30 text-muted-foreground'
                      : 'border-border bg-card hover:border-primary/60 hover:bg-primary-light/20'
                  }`}
                >
                  {stage.locked && (
                    <Lock size={14} className="absolute right-2 top-2 text-muted-foreground" />
                  )}

                  <div
                    className={`mb-2 flex h-16 w-full items-center justify-center overflow-hidden rounded-xl ${
                      stage.locked ? 'bg-muted/60' : 'bg-background'
                    }`}
                  >
                    {stage.locked ? (
                      <div className="h-12 w-12 rounded-full bg-muted-foreground/30" />
                    ) : (
                      <img
                        src={`${import.meta.env.BASE_URL}images/${stage.image}`}
                        alt={`${stage.title} 느루`}
                        className="h-full w-full object-contain"
                        loading="eager"
                        decoding="async"
                      />
                    )}
                  </div>

                  <div className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {stage.title}
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{stage.level}</div>
                  <p className="mt-2 text-[10px] leading-4 text-muted-foreground">{stage.description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-secondary-light px-3 py-2 text-center text-sm text-secondary">
            현재 선택: {selectedGrowthStage.title}
          </div>
        </div>

        {/* Equipped Items */}
        <div className="bg-card rounded-2xl p-5 mb-6 border border-border">
          <h3 className="mb-4">장착 아이템</h3>

          <div className="grid grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.name}
                className="bg-primary-light border border-primary/30 rounded-xl p-3 flex flex-col items-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-center">{item.name}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">
            학습 진행으로 얻은 아이템이에요
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button variant="outline" fullWidth>
            <Sparkles size={18} className="mr-2" />
            느루 꾸미기
          </Button>
          <Button variant="secondary" fullWidth>
            <TrendingUp size={18} className="mr-2" />
            성장 기록 보기
          </Button>
        </div>
      </div>

      <BottomTabBar activeTab="neuru" onTabChange={onTabChange} />
    </div>
  );
}
