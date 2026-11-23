import React from 'react';

interface GoldhouseLogoProps {
  className?: string;
}

export const GoldhouseLogo: React.FC<GoldhouseLogoProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex flex-col items-center select-none shrink-0 ${className}`}>
      <svg
        width="34"
        height="18"
        viewBox="0 0 38 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mb-0.5"
      >
        <path
          d="M2 18L11.5 3.5L19 14.5L26.5 3.5L36 18"
          stroke="#23211E"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 18L14.5 10.5L19 17L23.5 10.5L28.5 18"
          stroke="#23211E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[9.5px] font-bold tracking-[0.18em] text-[#23211E] leading-none whitespace-nowrap">
        GOLDHOUSE
      </span>
      <span className="text-[5.5px] font-medium tracking-[0.26em] text-[#6B635B] leading-none mt-0.5 whitespace-nowrap">
        REAL ESTATE
      </span>
    </div>
  );
};
