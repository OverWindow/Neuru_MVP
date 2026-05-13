import { BottomTabBar } from '../components/BottomTabBar';
import { TrendingUp, BookOpen, Bookmark, Flame, CheckCircle2, AlertCircle } from 'lucide-react';

interface LearningScreenProps {
  onTabChange: (tab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my') => void;
}

export function LearningScreen({ onTabChange }: LearningScreenProps) {
  const recentLearning = {
    title: '한국 편의점 이용 문화',
    completed: 3,
    correct: 2,
    topics: ['무인 편의점', '편의점 브랜드', '1+1·2+1 행사']
  };

  const reviewQuestions = [
    {
      title: '편의점 브랜드 순위',
      content: '순위는 기준에 따라 달라질 수 있어요.',
      category: '편의점'
    }
  ];

  const savedTips = [
    '카드 인식은 출입 인증이고, 결제는 따로 해요.',
    '1+1은 1개 사면 1개 더, 2+1은 2개 사면 1개 더 받는 행사예요.',
    '주 이용률과 점포 수 기준은 다를 수 있어요.'
  ];

  const categories = [
    { name: '생활 예절', count: 12 },
    { name: '학교생활', count: 8 },
    { name: '카페 / 식당', count: 15 },
    { name: '편의점', count: 3 },
    { name: '교통', count: 10 },
    { name: '직장문화', count: 6 },
    { name: '비자 / 행정', count: 4 }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl mb-6">학습 기록</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">학습 레벨</span>
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

          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={16} className="text-secondary" />
              <span className="text-sm text-muted-foreground">완료 퀴즈</span>
            </div>
            <div className="font-medium">18개</div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Bookmark size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">저장 팁</span>
            </div>
            <div className="font-medium">7개</div>
          </div>
        </div>

        {/* Recent Learning */}
        <div className="mb-6">
          <h3 className="mb-3">최근 학습</h3>

          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{recentLearning.title}</h4>
              <CheckCircle2 size={20} className="text-primary" />
            </div>

            <div className="flex items-center gap-4 mb-3 text-sm">
              <span className="text-muted-foreground">
                {recentLearning.completed}문제 완료
              </span>
              <span className="text-primary font-medium">
                {recentLearning.correct} / {recentLearning.completed} 정답
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {recentLearning.topics.map((topic) => (
                <span
                  key={topic}
                  className="bg-secondary-light text-secondary px-2 py-1 rounded-full text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>

            <button className="text-sm text-primary font-medium">다시 보기</button>
          </div>
        </div>

        {/* Review Questions */}
        <div className="mb-6">
          <h3 className="mb-3">다시 보면 좋은 문제</h3>

          <div className="space-y-3">
            {reviewQuestions.map((question, index) => (
              <div key={index} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium mb-1">{question.title}</div>
                    <p className="text-sm text-muted-foreground mb-2">{question.content}</p>
                    <span className="inline-block bg-secondary-light text-secondary px-2 py-1 rounded-full text-xs">
                      {question.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Tips */}
        <div className="mb-6">
          <h3 className="mb-3">저장한 팁</h3>

          <div className="space-y-2">
            {savedTips.map((tip, index) => (
              <div key={index} className="bg-card rounded-xl p-3 border border-border flex items-start gap-3">
                <Bookmark size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-3">카테고리별 학습</h3>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                className="bg-card rounded-xl p-4 border border-border text-left hover:border-primary transition-colors"
              >
                <div className="font-medium mb-1">{category.name}</div>
                <div className="text-sm text-muted-foreground">{category.count}개 완료</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomTabBar activeTab="learning" onTabChange={onTabChange} />
    </div>
  );
}
