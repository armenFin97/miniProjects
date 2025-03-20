import { useState, useEffect } from "react";

export default function QuizGame() {
    const [language, setLanguage] = useState('ru');
    const [clickCount, setClickCount] = useState(0);
    useEffect(() => {
        const handleClick = () => setClickCount(prev => prev + 1);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);
    
    
    const translations = {
        ru: {
            questions: [
                { id: '1', question: 'Какой цвет получается при смешивании синего и желтого?', type: 'checkbox', answer: ['зеленый'], options: ['зеленый', 'красный', 'синий', 'желтый'] },
                { id: '2', question: 'Как называется самая длинная река в мире?', type: 'text', answer: 'нил' },
                { id: '3', question: 'Солнце – это звезда.', type: 'radio', answer: 'правда', options: ['правда', 'ложь'] },
                { id: '4', question: 'Сколько дней в году?', type: 'text', answer: '365' },
                { id: '5', question: 'Сколько будет 2 + 2?', type: 'checkbox', answer: ['4'], options: ['4', '5', '12', '2'] }
            ],
            submit: 'Отправить'
        },
        en: {
            questions: [
                { id: '1', question: 'What color is obtained by mixing blue and yellow?', type: 'checkbox', answer: ['green'], options: ['green', 'red', 'blue', 'yellow'] },
                { id: '2', question: 'What is the longest river in the world?', type: 'text', answer: 'nile' },
                { id: '3', question: 'The sun is a star.', type: 'radio', answer: 'true', options: ['true', 'false'] },
                { id: '4', question: 'How many days are in a year?', type: 'text', answer: '365' },
                { id: '5', question: 'What is 2 + 2?', type: 'checkbox', answer: ['4'], options: ['4', '5', '12', '2'] }
            ],
            submit: 'Submit'
        }
    };
    
    const questions = translations[language].questions;
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    
    function handleChange(event, id, type) {
        const value = event.target.value.toLowerCase();
        if (type === 'checkbox') {
            setAnswers(prev => {
                const newAnswers = { ...prev };
                newAnswers[id] = newAnswers[id] || [];
                if (event.target.checked) {
                    newAnswers[id].push(value);
                } else {
                    newAnswers[id] = newAnswers[id].filter(item => item !== value);
                }
                return newAnswers;
            });
        } else {
            setAnswers(prev => ({ ...prev, [id]: value }));
        }
    }
    
    function handleSubmit() {
        const newResults = {};
        questions.forEach(({ id, answer }) => {
            if (Array.isArray(answer)) {
                newResults[id] = JSON.stringify(answers[id] || []) === JSON.stringify(answer);
            } else {
                newResults[id] = (answers[id] || '').trim() === answer;
            }
        });
        setResults(newResults);
    }
    
    return (
        <div className="board">
            <div className="language-switcher">
                <select onChange={(e) => {setLanguage(e.target.value)}}>
                    <option value={'en'}>EN</option>
                    <option value={'ru'}>RU</option>
                </select>
            </div>
            {questions.map(({ id, question, type, options }) => (
                <div key={id} className="board__row">
                    <div className="question__wrapper">
                        <label className={results[id] === undefined ? '' : results[id] ? 'correct' : 'incorrect'}>{question}</label>
                        {type === 'text' && (
                            <input
                                type="text"
                                onChange={event => handleChange(event, id, type)}
                            />
                        )}
                        {type === 'radio' && (
                            <div>
                                {options.map((option, i) => (
                                    <label key={i}>
                                        <input
                                            type="radio"
                                            name={id}
                                            value={option}
                                            onChange={event => handleChange(event, id, type)}
                                        /> {option}
                                    </label>
                                ))}
                            </div>
                        )}
                        {type === 'checkbox' && (
                            <div className="flex">
                                {options.map((option, i) => (
                                    <label key={i}>
                                        <input
                                            type="checkbox"
                                            name={id}
                                            value={option}
                                            onChange={event => handleChange(event, id, type)}
                                        /> {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div>
                <button onClick={handleSubmit} className='btn'>{translations[language].submit}</button>
            </div>
            <div>
                <p>Click count = {clickCount}</p>
            </div>
        </div>
    );
}
