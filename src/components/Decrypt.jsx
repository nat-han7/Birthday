import { useEffect, useState, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

function randomChar() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function DecryptTransition({
  from,
  to,
  speed = 40,
  delay = 800,
  prefix = "",
  suffix = ""
}) {
  const maxLength = Math.max(from.length, to.length);

  const paddedFrom = from.padEnd(maxLength, " ");
  const paddedTo = to.padEnd(maxLength, " ");

  const [display, setDisplay] = useState(paddedFrom);

  const progressRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    function animate(time) {
      if (!lastUpdateRef.current)
        lastUpdateRef.current = time;

      const delta = time - lastUpdateRef.current;

      if (delta > speed && time > delay) {
        progressRef.current++;

        setDisplay(() =>
          paddedTo
            .split("")
            .map((char, i) => {
              if (i < progressRef.current) return char;

              if (Math.random() < 0.25) return randomChar();

              return paddedFrom[i];
            })
            .join("")
        );

        lastUpdateRef.current = time;

        if (progressRef.current >= maxLength) return;
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current)
        cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <h1 style={{ fontFamily: "monospace" }}>
      {prefix}{display}{suffix}
    </h1>
  );
}

export default DecryptTransition;