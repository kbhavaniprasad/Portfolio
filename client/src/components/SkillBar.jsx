import { useState, useEffect, useRef } from 'react';
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaDatabase,
  FaPython,
  FaGitAlt,
  FaBrain
} from 'react-icons/fa';
import {
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiTensorflow,
  SiOpencv
} from 'react-icons/si';
import { FiServer } from 'react-icons/fi';

// Map icon keys to React-Icons components
const ICON_MAP = {
  react: FaReact,
  javascript: SiJavascript,
  html5: SiHtml5,
  tailwind: SiTailwindcss,
  nodejs: FaNodeJs,
  express: SiExpress,
  api: FiServer,
  java: FaJava,
  mongodb: SiMongodb,
  sql: FaDatabase,
  python: FaPython,
  tensorflow: SiTensorflow,
  opencv: SiOpencv,
  git: FaGitAlt,
  dsa: FaBrain
};

export default function SkillBar({ skill, isTouchDevice, inView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);
  const animationRef = useRef(null);

  const IconComponent = ICON_MAP[skill.iconKey] || FaBrain;

  // Touch devices fill when inView; desktop fills on hover
  const shouldFill = isTouchDevice ? inView : isHovered;
  const targetPct = shouldFill ? skill.pct : 0;

  useEffect(() => {
    // Smooth number count-up / count-down animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const startValue = count;
    const endValue = targetPct;
    const duration = 600; // ms
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * ease);

      setCount(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateCount);
      }
    };

    animationRef.current = requestAnimationFrame(animateCount);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetPct]);

  return (
    <div
      className={`skill-bar-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
    >
      <div className="skill-info-row">
        {/* Glowing Scaling Icon */}
        <div className={`skill-icon-frame ${isHovered ? 'glow-active' : ''}`}>
          <IconComponent className="skill-react-icon" />
        </div>

        {/* Name and Level */}
        <div className="skill-text-group">
          <span className="skill-title">{skill.name}</span>
          <span className="skill-level-sub">{skill.level}</span>
        </div>

        {/* Dynamic Percentage Badge */}
        <div className="skill-pct-counter">
          <span className="pct-num">{count}%</span>
        </div>
      </div>

      {/* Progress Track & Gradient Fill */}
      <div className="skill-progress-track">
        <div
          className="skill-progress-fill"
          style={{
            width: `${shouldFill ? skill.pct : 0}%`,
            transition: 'width 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
    </div>
  );
}
