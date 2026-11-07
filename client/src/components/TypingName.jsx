import { useState, useEffect } from 'react';

/**
 * TypingName Component
 * Slower, smoother typewriter effect for user name and roles so it is easy and comfortable to read.
 */
export default function TypingName({ name, roles }) {
  const [typedName, setTypedName] = useState('');
  const [isNameDone, setIsNameDone] = useState(false);
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Noticeably slower and smoother character typing for the name
  useEffect(() => {
    let charIndex = 0;
    // 130ms interval gives a smooth, steady, and easily legible typing cadence
    const interval = setInterval(() => {
      charIndex++;
      setTypedName(name.slice(0, charIndex));
      if (charIndex >= name.length) {
        clearInterval(interval);
        // Generous pause once the name finishes before transitioning to roles
        setTimeout(() => setIsNameDone(true), 900);
      }
    }, 130);

    return () => clearInterval(interval);
  }, [name]);

  // 2. Typing out subtitle roles in sequence
  useEffect(() => {
    if (!isNameDone || !roles || roles.length === 0) return;

    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (roleText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1000);
      }
    } else {
      if (roleText.length > 0) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [isNameDone, roleText, isDeleting, roleIndex, roles]);

  return (
    <div className="typing-header-container">
      <div className="name-typing-line">
        <span className="typed-name-text">{typedName}</span>
        {!isNameDone && <span className="blinking-cursor" aria-hidden="true" />}
      </div>

      <div className="role-typing-line">
        <span className="role-prefix">I am a </span>
        <span className="typed-role-highlight">{roleText || '\u00A0'}</span>
        {isNameDone && <span className="blinking-cursor" aria-hidden="true" />}
      </div>
    </div>
  );
}
