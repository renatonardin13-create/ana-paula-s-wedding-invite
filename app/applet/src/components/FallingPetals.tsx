import React, { useEffect, useState } from "react";

interface PetalItem {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  rotation: number; // degrees
  type: "petal" | "initials";
  text?: string;
}

export function FallingPetals() {
  const [items, setItems] = useState<PetalItem[]>([]);

  useEffect(() => {
    const generated: PetalItem[] = [];
    // Generate 18 items: mix of petals and "J & A"
    for (let i = 0; i < 18; i++) {
      const isInitials = i % 3 === 0;
      generated.push({
        id: i,
        left: Math.random() * 100,
        size: isInitials ? Math.random() * 14 + 18 : Math.random() * 12 + 10,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 8,
        rotation: Math.random() * 360,
        type: isInitials ? "initials" : "petal",
        text: "J & A",
      });
    }
    setItems(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fallAndSway linear infinite;
        }
      `}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-fall select-none"
          style={{
            left: `${item.left}%`,
            top: `-5%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.type === "initials" ? (
            <span
              className="font-serif italic font-bold text-[#D97757]/35 tracking-wider drop-shadow-sm"
              style={{ fontSize: `${item.size}px` }}
            >
              {item.text}
            </span>
          ) : (
            <div
              className="rounded-full bg-[#D97757]/30 shadow-sm"
              style={{
                width: `${item.size}px`,
                height: `${item.size * 1.4}px`,
                borderRadius: "50% 0 50% 50%",
                transform: `rotate(${item.rotation}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
