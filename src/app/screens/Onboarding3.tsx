import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { Button } from '../components/Button';
import { ArrowRight } from 'lucide-react';

interface Onboarding3Props {
  neuruStage: NeuruStage;
  onNext: () => void;
}

export function Onboarding3({ neuruStage, onNext }: Onboarding3Props) {
  const stages = [
    { name: '아기', size: 40 },
    { name: '어린이', size: 60 },
    { name: '청소년', size: 80 },
    { name: '어른', size: 100 },
    { name: '전설', size: 120 }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 pb-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
        <h1 className="text-3xl mb-3">퀴즈를 풀수록 느루가 성장해요</h1>
        <p className="text-muted-foreground mb-12">
          배운 만큼 느루도 함께 자라요.
        </p>

        <div className="flex items-end justify-center gap-1 mb-12">
          {stages.map((stage, index) => (
            <div key={stage.name} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="bg-primary-light rounded-lg flex items-center justify-center mb-2"
                  style={{ width: stage.size * 0.4, height: stage.size * 0.4 }}
                >
                  <div
                    className="rounded-full bg-primary"
                    style={{
                      width: stage.size * 0.15,
                      height: stage.size * 0.15,
                      opacity: 0.8
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{stage.name}</span>
              </div>
              {index < stages.length - 1 && (
                <div className="flex h-[40px] w-5 items-center justify-center self-start pt-0">
                  <ArrowRight size={12} className="text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-card p-4 rounded-xl border border-primary-light">
          <NeuruCharacter size="medium" expression="excited" stage={neuruStage} />
        </div>
      </div>

      <Button onClick={onNext} fullWidth>
        시작하기
      </Button>
    </div>
  );
}
