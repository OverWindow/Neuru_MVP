import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { Button } from '../components/Button';
import { CheckCircle2 } from 'lucide-react';

interface Onboarding2Props {
  neuruStage: NeuruStage;
  onNext: () => void;
}

export function Onboarding2({ neuruStage, onNext }: Onboarding2Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 pb-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
        <h1 className="text-3xl mb-3">하루 3문제로 한국 생활을 배워요</h1>
        <p className="text-muted-foreground mb-12">
          예절, 교통, 편의점, 학교생활, 직장문화까지 쉽게 익힐 수 있어요.
        </p>

        <div className="relative mb-8">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <NeuruCharacter size="small" expression="encouraging" stage={neuruStage} />
          </div>

          <div className="flex gap-3 mt-16">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-card p-4 rounded-xl shadow-sm border border-border w-24">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-light text-primary mb-2 mx-auto">
                  {num}
                </div>
                <div className="text-xs text-muted-foreground">퀴즈 {num}</div>
                <CheckCircle2 size={16} className="text-primary mt-1 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={onNext} fullWidth>
        다음
      </Button>
    </div>
  );
}
