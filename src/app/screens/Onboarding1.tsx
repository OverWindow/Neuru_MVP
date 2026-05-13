import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { Button } from '../components/Button';
import { Coffee, CreditCard, School, FileText } from 'lucide-react';

interface Onboarding1Props {
  neuruStage: NeuruStage;
  onNext: () => void;
}

export function Onboarding1({ neuruStage, onNext }: Onboarding1Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 pb-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
        <h1 className="text-3xl mb-3">한국 생활, 느루와 천천히 배워요</h1>
        <p className="text-muted-foreground mb-12">
          매일 짧은 퀴즈로 한국 생활문화를 익혀요.
        </p>

        <div className="relative mb-12">
          <NeuruCharacter size="large" expression="happy" stage={neuruStage} />

          <div className="absolute -left-8 top-8">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <CreditCard size={20} className="text-primary" />
            </div>
          </div>

          <div className="absolute -right-8 top-4">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <Coffee size={20} className="text-accent" />
            </div>
          </div>

          <div className="absolute -left-4 bottom-8">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <School size={20} className="text-secondary" />
            </div>
          </div>

          <div className="absolute -right-4 bottom-12">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <FileText size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onNext} fullWidth>
        다음
      </Button>
    </div>
  );
}
