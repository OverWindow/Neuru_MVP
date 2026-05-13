import { useState } from 'react';
import { NeuruCharacter } from '../components/NeuruCharacter';
import type { NeuruStage } from '../components/NeuruCharacter';
import { ArrowLeft, Send, Mic } from 'lucide-react';

interface ChatScreenProps {
  neuruStage: NeuruStage;
  onBack: () => void;
}

export function ChatScreen({ neuruStage, onBack }: ChatScreenProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant' as const,
      content: '안녕하세요! 한국 생활에 대해 궁금한 점을 물어보세요.'
    },
    {
      role: 'user' as const,
      content: '한국 사람들은 왜 밥 먹었냐고 물어봐?'
    },
    {
      role: 'assistant' as const,
      content: '한국에서는 "밥 먹었어?"가 단순히 식사를 물어보는 말이 아니라, 관심과 친근함을 표현하는 말일 때가 많아요.'
    }
  ]);

  const suggestedQuestions = [
    '무인 편의점은 어떻게 이용해?',
    '1+1은 무슨 뜻이야?',
    '편의점에서 교통카드 충전할 수 있어?',
    '한국 편의점에서 조심할 점은?'
  ];

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '좋은 질문이에요! 그 부분에 대해 설명해드릴게요.'
          }
        ]);
      }, 1000);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessages([...messages, { role: 'user', content: question }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '좋은 질문이에요! 그 부분에 대해 설명해드릴게요.'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-md mx-auto">
          <button onClick={onBack} className="mb-3 flex items-center gap-2 text-muted-foreground">
            <ArrowLeft size={20} />
            <span>뒤로</span>
          </button>

          <div className="flex items-center gap-3">
            <NeuruCharacter size="small" expression="happy" stage={neuruStage} />
            <div>
              <h2 className="font-medium">느루</h2>
              <p className="text-sm text-muted-foreground">한국 생활 도우미</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <NeuruCharacter size="small" expression="neutral" stage={neuruStage} />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Suggested Questions */}
          {messages.length <= 3 && (
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">추천 질문</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="bg-secondary-light text-secondary px-3 py-2 rounded-full text-sm hover:bg-secondary/10 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1 bg-input-background rounded-full border border-border flex items-center px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="한국 생활에 대해 물어보세요"
              className="flex-1 bg-transparent outline-none"
            />
            <button className="text-muted-foreground">
              <Mic size={20} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-3 rounded-full ${
              input.trim()
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
