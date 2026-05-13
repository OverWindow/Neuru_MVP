export type NeuruStage = 'baby' | 'child' | 'teen' | 'adult';

interface NeuruCharacterProps {
  size?: 'small' | 'medium' | 'large';
  expression?: 'neutral' | 'happy' | 'encouraging' | 'excited';
  stage?: NeuruStage;
}

export function NeuruCharacter({
  size = 'medium',
  expression = 'neutral',
  stage = 'child'
}: NeuruCharacterProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  const stageImages = {
    baby: 'dog1_noback.png',
    child: 'dog2_noback.png',
    teen: 'dog3_noback.png',
    adult: 'dog4_noback.png'
  };
  
  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      <img
        src={`${import.meta.env.BASE_URL}images/${stageImages[stage]}`}
        alt="느루 강아지 캐릭터"
        className="h-full w-full object-contain"
        loading="eager"
        decoding="async"
        data-expression={expression}
        data-stage={stage}
      />
    </div>
  );
}
