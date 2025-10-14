import React, { useRef, useState } from 'react';

const frames = [
  '/wheel-frame-0.svg',
  '/wheel-frame-1.svg',
  '/wheel-frame-2.svg',
  '/wheel-frame-3.svg',
  '/wheel-frame-4.svg',
  '/wheel-frame-5.svg',
  '/wheel-frame-6.svg',
  '/wheel-frame-7.svg',
];

// Base animation speed multiplier (higher = faster)
const ANIMATION_SPEED = 1.5;

const MobileScrollWheel: React.FC = () => {
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const [frameIndex, setFrameIndex] = useState(0);

  const animateFrames = (direction: number, totalFrames: number) => {
    let count = 0;

    const step = () => {
      setFrameIndex((prev) => (prev + direction + frames.length) % frames.length);
      count += 1;
      if (count < totalFrames) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const deltaTime = Date.now() - touchStartTime.current;

    const threshold = 10; // ignore tiny swipes
    if (Math.abs(deltaY) < threshold) return;

    const direction = deltaY > 0 ? -1 : 1; // flip if needed
    const speed = Math.min(Math.abs(deltaY) / deltaTime, 5); // cap speed multiplier
    const totalFrames = Math.max(2, Math.ceil((3 + speed * 3) * ANIMATION_SPEED));

    animateFrames(direction, totalFrames);

    // Optional: haptic feedback
    if ('vibrate' in navigator) navigator.vibrate(10 + speed * 25);
  };

  return (
    <div
      className="scroll-wheel"
      id="scroll-wheel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={frames[frameIndex]} alt="scroll wheel" />
    </div>
  );
};

export default MobileScrollWheel;