import { useCallback, useState } from 'react';

import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question';
import Summary from './Summary';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // 선택하자마자 넘어가는 걸 방지하기 위해서
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    console.log('실행');
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id='quiz'>
      {/* 상위 컴포넌트가 리렌더링 되어도 하위 컴포넌트의 인스턴스는 유지됨 | 기존의 인스턴스가 재사용됨 | 새로운 인스턴스를 생성하려면 key 사용 */}
      {/* 지금 내가 선택을 하면서 handleSelectAnswer 함수가 실행되면서 userAnswers에 내가 지금 선택한 answer가 담기고, 
          그 내부에서 answerState를 업데이트 하고, jsx에서는 그걸 가지고 jsx를 재평가함. 그 다음 문제로 넘어가기 전 찰나의 순간에 */}
      <Question
        key={activeQuestionIndex} // key는 독점적으로 사용되어야 함
        index={activeQuestionIndex}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
