import './Sparkles.css';
import { useState, useEffect, useRef } from "react";

const Sparkles = () => {
  const currentComponentRef = useRef(null);

  const trailArr = [1, 0.9, 0.8, 0.5, 0.25, 0.6, 0.4, 0.3, 0.2];

  const [sparkles, setSparkles] = useState([]);
  const requestRef = useRef();

  const updateSparkles = () => {
    setSparkles(currentSparkles => currentSparkles.filter(sparkle => sparkle.diesAt > Date.now()).map(sparkle => {
      if (sparkle.maxYTranslation) {
        const lifeProgress = (Date.now() - sparkle.created) / sparkle.animationSpeed;
        const newY = sparkle.maxYTranslation * lifeProgress;
        return { ...sparkle, translateY: newY };
      }
      return sparkle;
    }));
  };

  const animate = () => {
    updateSparkles();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); 

  useEffect(() => {
    const handleMouseMove = e => {
      trailArr.forEach(i => {
        const size = Math.ceil(Math.random() * 10 * i) + 'px';
        const j = (1 - i) * 50;

        const sparkle = {
          top: e.pageY - window.scrollY + Math.round(Math.random() * j - j / 2) + 'px',
          left: e.pageX + Math.round(Math.random() * j - j / 2) + 'px',
          size: size,
          background: `hsla(${Math.round(Math.random() * 160)}, 60%, 90%, ${i})`,
          maxYTranslation: 80,
          animationSpeed: 1100,
          created: Date.now(),
          diesAt: Date.now() + Math.round(Math.random() * i * 1100),
          translateY: 0,
        };

        setSparkles(currentSparkles => [...currentSparkles, sparkle]);
      });
    };

    const parentComponent = currentComponentRef.current.parentNode;
    parentComponent.addEventListener('mousemove', handleMouseMove);
    return () => parentComponent.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="" ref={currentComponentRef}>
        {sparkles.map((sparkle, index) => (
          <div
            key={index}
            className="sparkle-animation"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              borderRadius: sparkle.size,
              background: sparkle.background,
              transform: `translateY(${sparkle.translateY}px)`,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default Sparkles;