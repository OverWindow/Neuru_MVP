import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { Button } from '../components/Button';
import { BottomTabBar } from '../components/BottomTabBar';
import { MessageCircle, Coffee, CreditCard, School, ShoppingBag, Flame, TrendingUp } from 'lucide-react';

interface HomeScreenProps {
  quizStatus: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  onStartQuiz: () => void;
  onChatWithNeuru: () => void;
  onTabChange: (tab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my') => void;
  neuruStage: NeuruStage;
}

export function HomeScreen({
  quizStatus,
  progress,
  onStartQuiz,
  onChatWithNeuru,
  onTabChange,
  neuruStage
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl mb-1">안녕하세요, 미나님</h2>
          <p className="text-muted-foreground">오늘도 한국 생활을 조금씩 배워볼까요?</p>
        </div>

        {/* Neuru Room */}
        <div className="bg-card-beige rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="flex justify-center mb-4">
            <NeuruCharacter
              size="large"
              expression={quizStatus === 'completed' ? 'happy' : 'neutral'}
              stage={neuruStage}
            />
          </div>

          {/* Decorative objects */}
          <div className="absolute top-4 left-4">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <CreditCard size={16} className="text-primary" />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <ShoppingBag size={16} className="text-accent" />
            </div>
          </div>
          <div className="absolute bottom-4 left-6">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <Coffee size={16} className="text-secondary" />
            </div>
          </div>
          <div className="absolute bottom-4 right-6">
            <div className="bg-card p-2 rounded-lg shadow-sm">
              <School size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Today's Quiz Card */}
        <div className="bg-card rounded-2xl p-5 mb-4 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3>오늘의 퀴즈</h3>
            {quizStatus === 'completed' && (
              <div className="flex items-center gap-1 text-primary text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>완료</span>
              </div>
            )}
          </div>

          {quizStatus !== 'not-started' && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">진행 상태</span>
                <span className="font-medium">{progress} / 3 완료</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(progress / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="bg-secondary-light p-3 rounded-xl mb-4">
            <div className="text-sm text-secondary">테마</div>
            <div className="font-medium">한국 편의점 이용 문화</div>
          </div>

          {quizStatus === 'not-started' && (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                무인 편의점 입장 방법, 편의점 브랜드, 1+1·2+1 행사 의미를 배웁니다.
              </p>
              <Button onClick={onStartQuiz} fullWidth>
                오늘의 퀴즈 시작하기
              </Button>
            </>
          )}

          {quizStatus === 'in-progress' && (
            <>
              <p className="text-sm text-secondary mb-4">
                조금만 더 풀면 오늘의 퀴즈가 끝나요.
              </p>
              <Button onClick={onStartQuiz} fullWidth>
                이어서 풀기
              </Button>
            </>
          )}

          {quizStatus === 'completed' && (
            <>
              <p className="text-sm text-primary mb-4">
                오늘의 퀴즈를 완료했어요.
              </p>
              <Button onClick={onStartQuiz} variant="outline" fullWidth>
                오늘 배운 내용 보기
              </Button>
            </>
          )}
        </div>

        {/* Chat Button */}
        <Button onClick={onChatWithNeuru} variant="secondary" fullWidth className="mb-6">
          <MessageCircle size={20} className="mr-2" />
          느루에게 질문하기
        </Button>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">한국 생활 감각</span>
            </div>
            <div className="font-medium">Lv. 2</div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Flame size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">연속 학습</span>
            </div>
            <div className="font-medium">3일</div>
          </div>
        </div>
      </div>

      <BottomTabBar activeTab="home" onTabChange={onTabChange} />
    </div>
  );
}
