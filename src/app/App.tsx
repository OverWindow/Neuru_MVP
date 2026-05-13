import { useEffect, useState } from 'react';
import { Onboarding1 } from './screens/Onboarding1';
import { Onboarding2 } from './screens/Onboarding2';
import { Onboarding3 } from './screens/Onboarding3';
import { UserInfoScreen } from './screens/UserInfoScreen';
import { HomeScreen } from './screens/HomeScreen';
import { QuizStartScreen } from './screens/QuizStartScreen';
  import { QuizScreen } from './screens/QuizScreen';
import { QuizCompletionScreen } from './screens/QuizCompletionScreen';
import { NeuruScreen } from './screens/NeuruScreen';
import { ChatScreen } from './screens/ChatScreen';
import { LearningScreen } from './screens/LearningScreen';
import { MyPageScreen } from './screens/MyPageScreen';
import type { NeuruStage } from './components/NeuruCharacter';

type Screen =
  | 'onboarding1'
  | 'onboarding2'
  | 'onboarding3'
  | 'userInfo'
  | 'home'
  | 'quizStart'
  | 'quiz1'
  | 'quiz2'
  | 'quiz3'
  | 'quizCompletion'
  | 'neuru'
  | 'chat'
  | 'learning'
  | 'myPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding1');
  const [quizProgress, setQuizProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [neuruStage, setNeuruStage] = useState<NeuruStage>('child');

  useEffect(() => {
    ['dog1_noback.png', 'dog2_noback.png', 'dog3_noback.png', 'dog4_noback.png'].forEach((fileName) => {
      const image = new Image();
      image.src = `${import.meta.env.BASE_URL}images/${fileName}`;
    });
  }, []);

  const quizData = [
    {
      question: '한국의 일부 야간 무인 편의점에 들어가려면 어떻게 해야 할까요?',
      category: '편의점 이용',
      options: [
        '문 앞에서 직원이 올 때까지 기다린다.',
        '입구 앞 기계에 신용카드나 체크카드를 인식시킨 뒤 들어간다.',
        '아무 비밀번호나 누르면 들어갈 수 있다.',
        '무인 편의점은 밤에는 절대 운영하지 않는다.'
      ],
      correctAnswer: 1,
      explanation:
        '한국의 일부 야간 무인 편의점은 출입 관리를 위해 입구 앞 기계에 카드를 인식시킨 뒤 들어가야 합니다. 결제를 먼저 하는 것이 아니라, 출입 인증을 하는 과정입니다.',
      tip: '카드를 찍어도 바로 결제되는 것은 아닙니다. 물건을 고른 뒤 계산대나 셀프 계산대에서 따로 결제합니다.'
    },
    {
      question: '주 이용률 기준으로 한국에서 가장 많이 이용되는 편의점 브랜드는 무엇일까요?',
      category: '편의점 브랜드',
      options: ['GS25', 'CU', '세븐일레븐', '이마트24'],
      correctAnswer: 0,
      explanation:
        '주 이용률 기준으로는 GS25가 가장 높고, CU와 세븐일레븐이 뒤를 잇습니다. 단, 점포 수 기준으로는 순위가 달라질 수 있어요.',
      tip: '편의점 순위는 "주 이용률", "점포 수", "매출", "브랜드 평판" 중 어떤 기준을 보느냐에 따라 달라질 수 있습니다.'
    },
    {
      question: '한국 편의점에서 "2+1"이라고 적힌 행사는 무슨 뜻일까요?',
      category: '편의점 행사',
      options: [
        '1개를 사면 1개를 더 준다.',
        '2개를 사면 1개를 더 준다.',
        '2개를 사면 1개 가격만 낸다.',
        '3개를 사면 모두 무료다.'
      ],
      correctAnswer: 1,
      explanation:
        '2+1은 같은 행사 상품을 2개 사면 1개를 추가로 받을 수 있다는 뜻입니다. 즉, 총 3개를 받고 보통 2개 가격을 냅니다.',
      tip: '1+1은 1개를 사면 1개를 더 받는 행사입니다. 즉, 총 2개를 받고 보통 1개 가격을 냅니다.'
    }
  ];

  const handleTabChange = (tab: 'home' | 'quiz' | 'neuru' | 'learning' | 'my') => {
    const screenMap: Record<typeof tab, Screen> = {
      home: 'home',
      quiz: 'quizStart',
      neuru: 'neuru',
      learning: 'learning',
      my: 'myPage'
    };
    setCurrentScreen(screenMap[tab]);
  };

  const resetQuiz = () => {
    setQuizProgress(0);
    setCorrectAnswers(0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding1':
        return <Onboarding1 neuruStage={neuruStage} onNext={() => setCurrentScreen('onboarding2')} />;

      case 'onboarding2':
        return <Onboarding2 neuruStage={neuruStage} onNext={() => setCurrentScreen('onboarding3')} />;

      case 'onboarding3':
        return <Onboarding3 neuruStage={neuruStage} onNext={() => setCurrentScreen('userInfo')} />;

      case 'userInfo':
        return <UserInfoScreen onComplete={() => setCurrentScreen('home')} />;

      case 'home':
        return (
          <HomeScreen
            quizStatus={quizProgress === 0 ? 'not-started' : quizProgress === 3 ? 'completed' : 'in-progress'}
            progress={quizProgress}
            onStartQuiz={() => {
              if (quizProgress === 0) {
                setCurrentScreen('quizStart');
              } else if (quizProgress === 3) {
                setCurrentScreen('quizCompletion');
              } else {
                setCurrentScreen(`quiz${quizProgress + 1}` as Screen);
              }
            }}
            onChatWithNeuru={() => setCurrentScreen('chat')}
            onTabChange={handleTabChange}
            neuruStage={neuruStage}
          />
        );

      case 'quizStart':
        return (
          <QuizStartScreen
            neuruStage={neuruStage}
            onStart={() => {
              resetQuiz();
              setQuizProgress(1);
              setCurrentScreen('quiz1');
            }}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'quiz1':
      case 'quiz2':
      case 'quiz3': {
        const quizNumber = parseInt(currentScreen.replace('quiz', ''));
        const quiz = quizData[quizNumber - 1];

        return (
          <QuizScreen
            neuruStage={neuruStage}
            questionNumber={quizNumber}
            question={quiz.question}
            category={quiz.category}
            options={quiz.options}
            correctAnswer={quiz.correctAnswer}
            explanation={quiz.explanation}
            tip={quiz.tip}
            onNext={(isCorrect) => {
              if (isCorrect) {
                setCorrectAnswers((prev) => prev + 1);
              }
              setQuizProgress(quizNumber);
              if (quizNumber === 3) {
                setCurrentScreen('quizCompletion');
              } else {
                setCurrentScreen(`quiz${quizNumber + 1}` as Screen);
              }
            }}
            onBack={() => {
              if (quizNumber === 1) {
                setCurrentScreen('quizStart');
              } else {
                setCurrentScreen(`quiz${quizNumber - 1}` as Screen);
              }
            }}
            isLastQuestion={quizNumber === 3}
          />
        );
      }

      case 'quizCompletion':
        return (
          <QuizCompletionScreen
            neuruStage={neuruStage}
            correctAnswers={correctAnswers}
            totalQuestions={3}
            onViewContent={() => setCurrentScreen('learning')}
            onChatWithNeuru={() => setCurrentScreen('chat')}
            onGoHome={() => setCurrentScreen('home')}
          />
        );

      case 'neuru':
        return (
          <NeuruScreen
            selectedStage={neuruStage}
            onStageChange={setNeuruStage}
            onTabChange={handleTabChange}
          />
        );

      case 'chat':
        return <ChatScreen neuruStage={neuruStage} onBack={() => setCurrentScreen('home')} />;

      case 'learning':
        return <LearningScreen onTabChange={handleTabChange} />;

      case 'myPage':
        return <MyPageScreen onTabChange={handleTabChange} />;

      default:
        return <HomeScreen
          quizStatus="not-started"
          progress={0}
          onStartQuiz={() => setCurrentScreen('quizStart')}
          onChatWithNeuru={() => setCurrentScreen('chat')}
          onTabChange={handleTabChange}
          neuruStage={neuruStage}
        />;
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-muted">
      <div className="w-full h-full max-w-md mx-auto bg-background shadow-xl overflow-y-auto">
        {renderScreen()}
      </div>
    </div>
  );
}
