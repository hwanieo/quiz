import { useCallback, useState } from 'react';

import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  // 선택하자마자 넘어가는 걸 방지하기 위해서
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState('answered');

      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex] // activeQuestionIndex가 변할 때마다 재생성되어야 하므로 의존성으로
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Quiz Complete Image' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // Math.random() - 0.5 이렇게 하면 -0.5 ~ 0.5로 음수, 양수가 랜덤으로 나옴
  shuffledAnswers.sort(() => Math.random() - 0.5); // -1: 요소들이 뒤바뀜 | 1: 유지

  return (
    <div id='quiz'>
      {/* 상위 컴포넌트가 리렌더링 되어도 하위 컴포넌트의 인스턴스는 유지됨 | 기존의 인스턴스가 재사용됨 | 새로운 인스턴스를 생성하려면 key 사용 */}
      {/* 지금 내가 선택을 하면서 handleSelectAnswer 함수가 실행되면서 userAnswers에 내가 지금 선택한 answer가 담기고, 
          그 내부에서 answerState를 업데이트 하고, jsx에서는 그걸 가지고 jsx를 재평가함. 그 다음 문제로 넘어가기 전 찰나의 순간에 */}
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <div id='question'>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => {
            // 마지막 선택한 answer
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClasses = '';

            if (answerState === 'answered' && isSelected) {
              cssClasses = 'selected';
            }

            if (
              (answerState === 'correct' || answerState === 'wrong') &&
              isSelected
            ) {
              cssClasses = answerState;
            }

            return (
              <li key={answer} className='answer'>
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
