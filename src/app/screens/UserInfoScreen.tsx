import { useState } from 'react';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';

interface UserInfoScreenProps {
  onComplete: () => void;
}

export function UserInfoScreen({ onComplete }: UserInfoScreenProps) {
  const [selections, setSelections] = useState({
    purpose: [] as string[],
    level: '',
    interests: [] as string[]
  });

  const purposes = ['유학', '일', '장기 체류', '정착'];
  const levels = ['초급', '중급', '고급'];
  const interests = ['학교생활', '직장문화', '생활 예절', '음식', '교통', '비자 / 행정', '편의점 / 카페'];

  const toggleSelection = (category: 'purpose' | 'interests', value: string) => {
    setSelections((prev) => {
      const current = prev[category] as string[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) };
      }
      return { ...prev, [category]: [...current, value] };
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl mb-2">나에게 맞는 학습을 준비해요</h1>
        <p className="text-muted-foreground mb-8">
          몇 가지 정보만 선택하면 맞춤 퀴즈를 받을 수 있어요.
        </p>

        <div className="space-y-8">
          {/* Purpose */}
          <div>
            <label className="block mb-3">한국 체류 목적</label>
            <div className="grid grid-cols-2 gap-3">
              {purposes.map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => toggleSelection('purpose', purpose)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selections.purpose.includes(purpose)
                      ? 'border-primary bg-primary-light'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{purpose}</span>
                    {selections.purpose.includes(purpose) && (
                      <Check size={18} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="block mb-3">한국어 수준</label>
            <div className="grid grid-cols-3 gap-3">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelections((prev) => ({ ...prev, level }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selections.level === level
                      ? 'border-primary bg-primary-light'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span>{level}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block mb-3">관심 분야</label>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleSelection('interests', interest)}
                  className={`p-4 rounded-xl border-2 transition-all text-sm ${
                    selections.interests.includes(interest)
                      ? 'border-primary bg-primary-light'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{interest}</span>
                    {selections.interests.includes(interest) && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 bg-background p-6 border-t border-border">
        <Button onClick={onComplete} fullWidth>
          나의 학습 시작하기
        </Button>
      </div>
    </div>
  );
}
