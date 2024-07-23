import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // 리렌더링 될 때마다 계속 섞음.
    shuffledAnswers.current = [...answers];
    // Math.random() - 0.5 이렇게 하면 -0.5 ~ 0.5로 음수, 양수가 랜덤으로 나옴
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // -1: 요소들이 뒤바뀜 | 1: 유지
  }

  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer) => {
        // 마지막 선택한 answer
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';

        if (answerState !== '') {
          //disabled
        }

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
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
