import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemaininigTime] = useState(timeout);

  useEffect(() => {
    console.log('INTERVAL');
    const interval = setInterval(() => {
      setRemaininigTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log('TIMEOUT');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  return (
    <progress
      id='question-time'
      value={remainingTime}
      max={timeout}
      className={mode}
    />
  );
}
