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

    // Generate 50 items across the entire screen viewport, visible and non-fading
    for (let i = 0; i < 50; i++) {
      const typeRand = Math.random();
      let type: "petal" | "initials" | "rose" = "petal";
      if (typeRand < 0.35) {
        type = "initials";
      } else if (typeRand < 0.65) {
        type = "rose";
      } else {
        type = "petal";
      }

      generated.push({
        id: i,
        left: Math.random() * 100,
        size:
          type === "initials"
            ? Math.random() * 14 + 18
            : type === "rose"
              ? Math.random() * 12 + 16
              : Math.random() * 10 + 12,
        duration: Math.random() * 7 + 4,
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>{`
        @keyframes fallAndSwaySolid {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(30px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
          }
        }
        .animate-fall-solid {
          animation: fallAndSwaySolid linear infinite;
        }
      `}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-fall-solid select-none"
          style={{
            left: `${item.left}%`,
            top: `-10%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: 0.9,
          }}
        >
          {item.type === "initials" ? (
            <span
              className="font-serif italic font-bold tracking-wider drop-shadow-[0_1px_3px_rgba(217,119,87,0.5)]"
              style={{
                fontSize: `${item.size}px`,
                color: item.color,
              }}
            >
              {item.text}
            </span>
          ) : item.type === "rose" ? (
            <span
              className="inline-block drop-shadow-md select-none"
              style={{
                fontSize: `${item.size * 1.3}px`,
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
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
