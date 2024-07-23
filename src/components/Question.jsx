import { useState } from 'react';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';
import QUESTION from '../questions';

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTION[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    // 동일한 key가 필요한 컴포넌트를 하나로 묶고 Quiz에서 key를 하나 넘김으로써 Question 컴포넌트의 인스턴스를 재생성할 수 있음
    <div id='question'>
      <QuestionTimer
        key={timer}
        timeout={timer}
        // 언제 이상하게 동작할지 모름 상태 업데이트를 배치로 처리하는 것 때문인 것 같은데 | 극히 드문 경우지만, 상태 업데이트가 1초 타이머가 만료된 후에 실행될 가능성이 있음
        // 이 경우, 이미 답변을 선택했음에도 'onSkipAnswer'가 실행될 수 있음 -> 실제로 그런 거 확인
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTION[index].text}</h2>
      <Answers
        answers={QUESTION[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
