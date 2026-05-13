import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { Button } from '../components/Button';
import { Clock, BookOpen, ArrowLeft } from 'lucide-react';

interface QuizStartScreenProps {
  neuruStage: NeuruStage;
  onStart: () => void;
  onBack: () => void;
}

export function QuizStartScreen({ neuruStage, onStart, onBack }: QuizStartScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} />
          <span>뒤로</span>
        </button>

        <h1 className="text-2xl mb-2">오늘의 퀴즈</h1>
        <p className="text-muted-foreground mb-8">
          오늘은 한국 편의점 이용 문화를 배워볼까요?
        </p>

        {/* Theme Card */}
        <div className="bg-primary-light border-2 border-primary rounded-2xl p-6 mb-6">
          <div className="text-primary text-sm mb-2">테마</div>
          <h2 className="text-xl mb-4">한국 편의점</h2>
          <p className="text-sm text-foreground/80">
            무인 편의점 입장 방법, 편의점 브랜드, 1+1·2+1 행사 의미를 배웁니다.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">문제 수</span>
            </div>
            <div className="text-lg font-medium">총 3문제</div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-secondary" />
              <span className="text-sm text-muted-foreground">예상 시간</span>
            </div>
            <div className="text-lg font-medium">3분</div>
          </div>
        </div>

        {/* Neuru Message */}
        <div className="bg-card rounded-2xl p-4 mb-8 border border-border flex gap-3">
          <NeuruCharacter size="small" expression="encouraging" stage={neuruStage} />
          <div className="flex-1">
            <div className="bg-secondary-light rounded-xl p-3">
              <p className="text-sm">
                편의점은 한국 생활에서 정말 자주 가는 곳이에요!
              </p>
            </div>
          </div>
        </div>

        <Button onClick={onStart} fullWidth>
          퀴즈 시작하기
        </Button>
      </div>
    </div>
  );
}
