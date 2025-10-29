import React, { useRef, useState } from 'react';

// Base animation speed multiplier (higher = faster)
const ANIMATION_SPEED = 1.5;

interface Props {
  isLandscape: boolean;
}

const MobileScrollWheel: React.FC<Props> = ({isLandscape} )  => {
    const touchStart = useRef(0);
    const touchTime = useRef(0);
    const [frameIndex, setFrameIndex] = useState(0);

    const framesLandscape = [
            '/wheel-frame-0-land.svg',
            '/wheel-frame-1-land.svg',
            '/wheel-frame-2-land.svg',
            '/wheel-frame-3-land.svg',
            '/wheel-frame-4-land.svg',
            '/wheel-frame-5-land.svg',
            '/wheel-frame-6-land.svg',
            '/wheel-frame-7-land.svg',
            '/wheel-frame-8-land.svg'

        ]
    const framesPortrait = [
            '/wheel-frame-0.svg',
            '/wheel-frame-1.svg',
            '/wheel-frame-2.svg',
            '/wheel-frame-3.svg',
            '/wheel-frame-4.svg',
            '/wheel-frame-5.svg',
            '/wheel-frame-6.svg',
            '/wheel-frame-7.svg',
            '/wheel-frame-8.svg'
    ];

  const animateFrames = (direction: number, totalFrames: number) => {
    let count = 0;

    const step = () => {
      setFrameIndex((prev) => (prev + direction + 9) % 9);
      count += 1;
      if (count < totalFrames) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const coord = isLandscape ? e.touches[0].clientX : e.touches[0].clientY;
    touchStart.current = coord;
    touchTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
        const coord = isLandscape ? e.changedTouches[0].clientX : e.changedTouches[0].clientY;
        const delta = touchStart.current - coord;
        const time = Date.now() - touchTime.current;

        if (Math.abs(delta) < 10) return;

        const direction = delta > 0 ? -1 : 1; // flip if needed
        const speed = Math.min(Math.abs(delta) / time, 5); // cap speed multiplier
        const total = Math.max(2, Math.ceil((3 + speed * 3) * ANIMATION_SPEED));

        animateFrames(direction, total);

        // Optional: haptic feedback
        if ('vibrate' in navigator) navigator.vibrate(10 + speed * 25);
  };

  return (
    <div className="scroll-wheel-container">
        <div className="scroll-wheel-pit">
            <div
                className="scroll-wheel"
                id="scroll-wheel"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {isLandscape 
                    ? <img className="landscape-scroll" src={framesLandscape[frameIndex]} alt="scroll wheel" />
                    : <img className="portrait-scroll" src={framesPortrait[frameIndex]} alt="scroll wheel" />
                }
            </div>            
        </div>
    </div>
  );
};

export default MobileScrollWheel;