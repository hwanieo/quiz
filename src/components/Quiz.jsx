import { useState } from 'react';

export default function Quiz() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [useAnswers, setUserAnswers] = useState([]);

  return <p>Currently active Question</p>;
}
