import React, { useEffect, useState } from "react";

interface FallingItem {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  rotation: number; // degrees
  type: "petal" | "initials" | "rose";
  text?: string;
  color: string;
}

export function FallingPetals() {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    const colors = ["#D97757", "#FFA07A", "#E07A5F", "#CC5838", "#F4A261", "#E76F51"];
    const generated: FallingItem[] = [];

    // Generate 45 items across the entire screen viewport (fixed during scroll)
    for (let i = 0; i < 45; i++) {
      const typeRand = Math.random();
      let type: "petal" | "initials" | "rose" = "petal";
      if (typeRand < 0.35) {
        type = "initials";
      } else if (typeRand < 0.6) {
        type = "rose";
      } else {
        type = "petal";
      }

      generated.push({
        id: i,
        left: Math.random() * 100,
        size:
          type === "initials"
            ? Math.random() * 12 + 18
            : type === "rose"
              ? Math.random() * 10 + 16
              : Math.random() * 10 + 12,
        duration: Math.random() * 8 + 5,
        delay: Math.random() * 10,
        rotation: Math.random() * 360,
        type,
        text: "J & A",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(108vh) translateX(60px) rotate(360deg);
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
            top: `-10%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.type === "initials" ? (
            <span
              className="font-serif italic font-bold tracking-wider drop-shadow-[0_1px_3px_rgba(217,119,87,0.4)]"
              style={{
                fontSize: `${item.size}px`,
                color: item.color,
              }}
            >
              {item.text}
            </span>
          ) : item.type === "rose" ? (
            <span
              className="inline-block drop-shadow-sm select-none"
              style={{
                fontSize: `${item.size * 1.2}px`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              🌹
            </span>
          ) : (
            <div
              className="shadow-sm"
              style={{
                width: `${item.size}px`,
                height: `${item.size * 1.4}px`,
                backgroundColor: item.color,
                borderRadius: "50% 0 50% 50%",
                transform: `rotate(${item.rotation}deg)`,
                opacity: 0.85,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
