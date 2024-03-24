import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [users, setUsers] = useState([]);
  const [answersCount, setAnswersCount] = useState({});
  const [questionAuthors, setQuestionAuthors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
      .then(res => res.json())
      .then(question => setQuestion(question));

    fetch(`http://localhost:8080/answers`)
      .then(res => res.json())
      .then(answer => setAnswer(answer));

    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(users => setUsers(users));

  }, []);

  const addNewQuestion = newQuestion => {
    setQuestion([...question, newQuestion]);
    fetch(`http://localhost:8080/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuestion)
    });
  };

  useEffect(() => {
    const getQuestionInfo = () => {
      const counts = {};
      const names = {};
      question.forEach(el => {
        const questionId = el.id;

        const questionAnswers = answer.filter(el1 => el1.questionId === questionId);
        counts[questionId] = questionAnswers.length;

        names[questionId] = users.find(user => user.id === el.userId).username;
      });
      setAnswersCount(counts)
      setQuestionAuthors(names);
    }
    getQuestionInfo();
  }, [question, answer, users]);

  return (
    <QuestionContext.Provider
      value={{
        question,
        answersCount,
        questionAuthors,
        addNewQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;