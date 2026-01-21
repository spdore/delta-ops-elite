import React from 'react';

interface InfiniteMarqueeProps {
  text: string;
  className?: string;
  speed?: 'fast' | 'slow';
  reverse?: boolean;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ 
  text, 
  className = "", 
  speed = 'slow',
  reverse = false 
}) => {
  const duration = speed === 'fast' ? '10s' : '30s';
  const direction = reverse ? 'reverse' : 'normal';

  return (
    <div className={`flex overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div 
        className="flex min-w-full shrink-0 animate-scroll" 
        style={{ animationDuration: duration, animationDirection: direction }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
      <div 
        className="flex min-w-full shrink-0 animate-scroll" 
        style={{ animationDuration: duration, animationDirection: direction }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;