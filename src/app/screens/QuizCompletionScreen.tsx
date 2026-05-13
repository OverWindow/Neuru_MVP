import { Button } from '../components/Button';
import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { CheckCircle2, TrendingUp, Flame, BookOpen, Bookmark, Sparkles } from 'lucide-react';

interface QuizCompletionScreenProps {
  neuruStage: NeuruStage;
  correctAnswers: number;
  totalQuestions: number;
  onViewContent: () => void;
  onChatWithNeuru: () => void;
  onGoHome: () => void;
}

export function QuizCompletionScreen({
  neuruStage,
  correctAnswers,
  totalQuestions,
  onViewContent,
  onChatWithNeuru,
  onGoHome
}: QuizCompletionScreenProps) {
  const percentage = (correctAnswers / totalQuestions) * 100;
  const xpGained = correctAnswers;

  const getMessage = () => {
    if (correctAnswers === 3) {
      return '완벽해요! 오늘의 편의점 문화를 잘 이해했어요.';
    } else if (correctAnswers >= 1) {
      return '좋아요! 헷갈린 내용은 다시 보면 금방 익숙해질 거예요.';
    }
    return '괜찮아요. 오늘 배운 내용을 천천히 다시 확인해봐요.';
  };

  const learningTopics = [
    {
      title: '야간 무인 편의점 입장',
      content: '일부 무인 편의점은 입구 앞 기계에 카드를 인식시킨 뒤 들어갑니다.'
    },
    {
      title: '편의점 브랜드',
      content: '주 이용률 기준으로 GS25, CU, 세븐일레븐이 한국의 주요 편의점 브랜드입니다. 단, 점포 수 기준은 다를 수 있어요.'
    },
    {
      title: '1+1과 2+1',
      content: '1+1은 1개 구매 시 1개 추가, 2+1은 2개 구매 시 1개 추가라는 뜻입니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl mb-2">오늘의 퀴즈 완료!</h1>
          <p className="text-muted-foreground">
            오늘은 한국 편의점 이용 문화를 배웠어요.
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <h3 className="mb-4">오늘의 결과</h3>

          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-medium">{correctAnswers}/{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">정답</div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm">{getMessage()}</p>
        </div>

        {/* Learned Content */}
        <div className="mb-6">
          <h3 className="mb-3">오늘 배운 내용</h3>
          <div className="space-y-3">
            {learningTopics.map((topic, index) => (
              <div key={index} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">{topic.title}</div>
                    <div className="text-sm text-muted-foreground">{topic.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-card-beige rounded-2xl p-5 mb-6">
          <h3 className="mb-4">나의 전체 진행도</h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">학습 레벨</span>
              </div>
              <div className="font-medium">Lv. 2</div>
            </div>

            <div className="bg-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Flame size={16} className="text-accent" />
                <span className="text-xs text-muted-foreground">연속 학습</span>
              </div>
              <div className="font-medium">3일</div>
            </div>

            <div className="bg-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={16} className="text-secondary" />
                <span className="text-xs text-muted-foreground">완료 퀴즈</span>
              </div>
              <div className="font-medium">18개</div>
            </div>

            <div className="bg-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Bookmark size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">저장 팁</span>
              </div>
              <div className="font-medium">7개</div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">전체 퀴즈 진행률</span>
              <span className="font-medium">18%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '18%' }} />
            </div>
          </div>
        </div>

        {/* Neuru Growth */}
        <div className="bg-card rounded-2xl p-5 mb-6 border border-primary-light">
          <h3 className="mb-4">느루의 성장</h3>

          <div className="flex items-center gap-4 mb-4">
            <NeuruCharacter size="medium" expression="happy" stage={neuruStage} />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">어린이</span>
                <span className="text-sm font-medium">Lv. 2</span>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">XP</span>
                  <span className="font-medium">65 / 100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="text-xs text-muted-foreground">다음 성장까지 35 XP 남음</div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 flex items-center gap-2">
            <Sparkles size={18} className="text-accent" />
            <span className="text-sm">
              이번 퀴즈로 <span className="font-medium text-accent">+{xpGained} XP</span> 획득!
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-3 text-center">
            편의점 이용 방법을 배워서 느루가 조금 성장했어요!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={onViewContent} variant="outline" fullWidth>
            오늘 내용 다시 보기
          </Button>
          <Button onClick={onChatWithNeuru} variant="secondary" fullWidth>
            느루에게 질문하기
          </Button>
          <Button onClick={onGoHome} fullWidth>
            홈으로 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
