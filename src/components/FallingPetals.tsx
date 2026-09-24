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
    const colors = ["#D97757", "#FFA07A", "#E07A5F", "#CC5838", "#F4A261", "#E76F51", "#B34522"];
    const generated: FallingItem[] = [];

    // Generate 45 items across the entire screen viewport, soft and subtle in the background
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
            ? Math.random() * 12 + 16
            : type === "rose"
              ? Math.random() * 10 + 14
              : Math.random() * 8 + 10,
        duration: Math.random() * 8 + 5,
        delay: Math.random() * 8,
        rotation: Math.random() * 360,
        type,
        text: "J & A",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes fallAndSwaySoft {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(25px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-15px) rotate(360deg);
          }
        }
        .animate-fall-soft {
          animation: fallAndSwaySoft linear infinite;
        }
      `}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-fall-soft select-none"
          style={{
            left: `${item.left}%`,
            top: `-10%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: 0.32,
          }}
        >
          {item.type === "initials" ? (
            <span
              className="font-serif italic font-medium tracking-wider"
              style={{
                fontSize: `${item.size}px`,
                color: item.color,
              }}
            >
              {item.text}
            </span>
          ) : item.type === "rose" ? (
            <span
              className="inline-block select-none filter opacity-70"
              style={{
                fontSize: `${item.size * 1.2}px`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              🌹
            </span>
          ) : (
            <div
              style={{
                width: `${item.size}px`,
                height: `${item.size * 1.4}px`,
                backgroundColor: item.color,
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
