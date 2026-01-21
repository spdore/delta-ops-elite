import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Tag = 'span' }) => {
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-delta-green opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px] skew-x-12 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px] -skew-x-12 select-none delay-75">
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;