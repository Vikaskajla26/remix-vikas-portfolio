import React, { useRef, useState, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 220,
  strength = 3,
  activeTransition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
  inactiveTransition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isActive, setIsActive] = useState(false);

  // Mouse Move tracking (Desktop)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const maxDistanceX = rect.width / 2 + padding;
      const maxDistanceY = rect.height / 2 + padding;

      if (Math.abs(distanceX) < maxDistanceX && Math.abs(distanceY) < maxDistanceY) {
        setIsActive(true);
        const moveX = distanceX / strength;
        const moveY = distanceY / strength;
        const rotY = (distanceX / maxDistanceX) * 14;
        const rotX = -(distanceY / maxDistanceY) * 12;
        setPosition({ x: moveX, y: moveY, rotateX: rotX, rotateY: rotY });
      } else if (isActive) {
        setIsActive(false);
        setPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
      }
    },
    [padding, strength, isActive]
  );

  // Touch Move tracking (Mobile Touch & Swipe)
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!ref.current || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = touch.clientX - centerX;
      const distanceY = touch.clientY - centerY;

      setIsActive(true);
      const moveX = Math.max(-55, Math.min(55, distanceX / (strength * 0.9)));
      const moveY = Math.max(-55, Math.min(55, distanceY / (strength * 0.9)));
      const rotY = Math.max(-15, Math.min(15, (distanceX / (window.innerWidth / 2)) * 14));
      const rotX = Math.max(-12, Math.min(12, -(distanceY / (window.innerHeight / 2)) * 12));

      setPosition({ x: moveX, y: moveY, rotateX: rotX, rotateY: rotY });
    },
    [strength]
  );

  const handleTouchEnd = useCallback(() => {
    setIsActive(false);
    setPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  }, []);

  // Gyroscope / Device Tilt tracking (Mobile Gyroscope)
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma === null || e.beta === null) return;

    // gamma: left-to-right tilt [-30, 30]
    // beta: front-to-back tilt [-30, 30] relative to 45 deg resting angle
    const gamma = Math.max(-28, Math.min(28, e.gamma));
    const beta = Math.max(-28, Math.min(28, e.beta - 45));

    setIsActive(true);
    const moveX = gamma * 1.6;
    const moveY = beta * 1.3;
    const rotY = gamma * 0.7;
    const rotX = -beta * 0.6;

    setPosition({ x: moveX, y: moveY, rotateX: rotX, rotateY: rotY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [handleMouseMove, handleTouchMove, handleTouchEnd, handleOrientation]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `perspective(1000px) translate3d(${position.x}px, ${position.y}px, 0) rotateX(${position.rotateX}deg) rotateY(${position.rotateY}deg)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};
