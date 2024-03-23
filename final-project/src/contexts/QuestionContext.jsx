import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [answersCount, setAnswersCount] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
      .then(res => res.json())
      .then(question => setQuestion(question));

    fetch(`http://localhost:8080/answers`)
      .then(res => res.json())
      .then(answer => setAnswer(answer));

  }, []);

  useEffect(() => {
    const countAnswers = () => {
      const counts = {};
      question.forEach(el => {
        const questionId = el.id;
        const questionAnswers = answer.filter(el1 => el1.questionId === questionId);
        counts[questionId] = questionAnswers.length;
      });
      setAnswersCount(counts)
    }
    countAnswers();
  }, [question, answer]);

  return (
    <QuestionContext.Provider
      value={{
        question,
        answersCount
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;