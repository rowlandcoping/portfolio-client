import React, { useRef, useState } from 'react';

interface MobileScrollWheelProps {
  onScroll: (delta: number) => void;
}
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

const MobileScrollWheel: React.FC<MobileScrollWheelProps> = ({ onScroll }) => {
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const [frameIndex, setFrameIndex] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const deltaTime = Date.now() - touchStartTime.current;

    const threshold = 10; // minimal swipe
    if (Math.abs(deltaY) < threshold) return;

    const speed = Math.min(Math.abs(deltaY) / deltaTime, 2); // cap speed
    const scrollAmount = deltaY > 0 ? -1 : 1;

    // Animate frames based on swipe direction and speed
    const direction = scrollAmount > 0 ? 1 : -1;
    const baseFrames = 2; // base number of frames per swipe (base animation speed)
    const steps = Math.max(Math.ceil(baseFrames * (1 + speed)), 1);

    let currentFrame = frameIndex;
    for (let i = 0; i < steps; i++) {
      currentFrame = (currentFrame + direction + frames.length) % frames.length;
      setTimeout(() => setFrameIndex(currentFrame), i * 50); // 50ms per frame
    }

    // Haptic feedback
    if ('vibrate' in navigator) navigator.vibrate(20 + speed * 20);

    onScroll(scrollAmount * (1 + speed * 0.5)); // call parent
  };

  return (
    <div
        className="scroll-wheel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ width: 18, height: 72 }}
    >
        <img src={frames[frameIndex]} alt="scroll wheel" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MobileScrollWheel;