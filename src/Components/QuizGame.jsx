import { useState } from "react";

export default function QuizGame() {
    const question = [
        {
            id: '1',
            question: 'Какой цвет получается при смешивании синего и желтого?',
            type: 'checkbox',
            answer: 'зеленый',
            options: ['зеленый', 'красный', 'синий', 'желтый']
        },
        {
            id: '2',
            question: 'Как называется самая длинная река в мире?',
            type: 'text',
            answer: 'нил'
        },
        {
            id: '3',
            question: 'Солнце – это звезда.',
            type: 'radio',
            answer: 'правда'
        },
        {
            id: '4',
            question: 'Сколько дней в году?',
            type: 'text',
            answer: '365'
        },
        {
            id: '5',
            question: 'Сколько будет 2 + 2?',
            type: 'checkbox',
            answer: '4',
            options: ['4', '5', '12', '2']
        }
    ];
    
    const [answered, setAnswered] = useState(false);
    
    function handleSubmit() {
        setAnswered(true);
    }
    
    return (
        <div className="board">
            {question.map((question, i) => (
                <div key={question.id} className="board__row">
                    <div className="question__wrapper">
                        <label>{question.question}</label>
                        {question.type === 'text' && (
                            <input type="text"/>
                        )}
                        {question.type === 'radio' && (
                            <div>
                                <div>
                                    <label className={"label"}>
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value="true"
                                        /> True
                                    </label>
                                </div>
                                <div>
                                    <label className={"label"}>
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value="false"
                                        /> False
                                    </label>
                                </div>
                            </div>
                        )}
                        
                        {question.type === 'checkbox' && (
                            <div className={"flex"}>
                                {question.options.map((option, i) => (
                                    <label className={"label"} key={i}>
                                        <input
                                            type="checkbox"
                                            name={question.id}
                                            value={option}
                                        /> {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div>
                <button onClick={handleSubmit} className={'btn'}>Submit</button>
            </div>
        </div>
    );
}
