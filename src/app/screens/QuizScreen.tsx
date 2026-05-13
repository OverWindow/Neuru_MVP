import { useState } from 'react';
import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { Button } from '../components/Button';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface QuizScreenProps {
  neuruStage: NeuruStage;
  questionNumber: number;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tip: string;
  onNext: (isCorrect: boolean) => void;
  onBack: () => void;
  isLastQuestion?: boolean;
}

export function QuizScreen({
  neuruStage,
  questionNumber,
  question,
  category,
  options,
  correctAnswer,
  explanation,
  tip,
  onNext,
  onBack,
  isLastQuestion = false
}: QuizScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    const wasCorrect = selectedOption === correctAnswer;
    setSelectedOption(null);
    setShowFeedback(false);
    onNext(wasCorrect);
  };

  const isCorrect = selectedOption === correctAnswer;
  const progress = (questionNumber / 3) * 100;

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-4">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-muted-foreground">
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">
              오늘의 퀴즈 · 한국 편의점
            </div>
            <div className="font-medium">{questionNumber} / 3</div>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category */}
        <div className="inline-block bg-secondary-light text-secondary px-3 py-1 rounded-full text-sm mb-4">
          {category}
        </div>

        {/* Question */}
        <div className="bg-card rounded-2xl p-6 mb-6 border-2 border-border">
          <h2 className="text-lg">{question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === correctAnswer;

            let borderColor = 'border-border';
            let bgColor = 'bg-card';

            if (showFeedback) {
              if (isCorrectOption) {
                borderColor = 'border-primary';
                bgColor = 'bg-primary-light';
              } else if (isSelected && !isCorrect) {
                borderColor = 'border-destructive';
                bgColor = 'bg-destructive/5';
              }
            } else if (isSelected) {
              borderColor = 'border-primary';
              bgColor = 'bg-primary-light/30';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${borderColor} ${bgColor}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">{option}</div>
                  {showFeedback && isCorrectOption && (
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle size={20} className="text-destructive flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Neuru Reaction */}
        <div className="flex items-center gap-3 mb-6">
          <NeuruCharacter
            size="small"
            stage={neuruStage}
            expression={
              !showFeedback ? 'neutral' : isCorrect ? 'happy' : 'encouraging'
            }
          />
          {showFeedback && (
            <div className="flex-1 bg-card rounded-xl p-3 border border-border">
              <p className="text-sm">
                {isCorrect ? '잘했어요!' : '괜찮아요, 천천히 배워가요!'}
              </p>
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="space-y-4 mb-6">
            <div
              className={`rounded-2xl p-5 border-2 ${
                isCorrect
                  ? 'bg-primary-light border-primary'
                  : 'bg-destructive/5 border-destructive/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {isCorrect ? (
                  <CheckCircle2 size={24} className="text-primary" />
                ) : (
                  <XCircle size={24} className="text-destructive" />
                )}
                <h3 className="text-lg font-medium">
                  {isCorrect ? '정답입니다!' : '아쉬워요'}
                </h3>
              </div>

              <p className="text-sm mb-3">{explanation}</p>

              {tip && (
                <div className="bg-card rounded-xl p-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">팁: </span>
                  {tip}
                </div>
              )}

              {isCorrect && (
                <div className="mt-4 inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  <span>+1 한국 생활 감각</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Button */}
        {!showFeedback ? (
          <Button onClick={handleSubmit} fullWidth disabled={selectedOption === null}>
            {selectedOption === null ? '답을 선택해주세요' : '확인'}
          </Button>
        ) : (
          <Button onClick={handleNext} fullWidth>
            {isLastQuestion ? '결과 보기' : '다음 퀴즈'}
          </Button>
        )}
      </div>
    </div>
  );
}
