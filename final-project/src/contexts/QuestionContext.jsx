import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [questions, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const [answersCount, setAnswersCount] = useState({});
  const [questionAuthors, setQuestionAuthors] = useState({});
  const [answerAutors, setAnswerAuthors] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState({});

  useEffect(() => {

    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(users => setUsers(users));

    fetch(`http://localhost:8080/questions`)
      .then(res => res.json())
      .then(question => setQuestion(question));

    fetch(`http://localhost:8080/answers`)
      .then(res => res.json())
      .then(answers => setAnswers(answers));

  }, []);

  const addNewQuestion = newQuestion => {
    setQuestion([...questions, newQuestion]);
    fetch(`http://localhost:8080/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuestion)
    });
  };

  const editQuestion = editedQuestion => {

    fetch(`http://localhost:8080/questions/${editedQuestion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedQuestion)
    });
    setQuestion(questions.map(el => {
      if (el.id === editedQuestion.id) {
        return editedQuestion;
      } else {
        return el;
      }
    }));
  };

  const deleteQuestion = id => {

    answers.forEach(answer => {
      answer.questionId === id && fetch(`http://localhost:8080/answers/${answer.id}`, { method: "DELETE" });
    });

    fetch(`http://localhost:8080/questions/${id}`, { method: "DELETE" });
    setQuestion(questions.filter(question => id !== question.id));

  };



  useEffect(() => {
    const getQuestionInfo = () => {
      const counts = {};
      const names = {};
      const qAnswers = {};
      questions.forEach(el => {
        const questionId = el.id;

        const questionAnswers = answers.filter(el1 => el1.questionId === questionId);
        counts[questionId] = questionAnswers.length;

        names[questionId] = users.find(user => user.id === el.userId).username;
        qAnswers[questionId] = questionAnswers;
      });
      setAnswersCount(counts)
      setQuestionAuthors(names);
      setQuestionAnswers(qAnswers);
    }
    getQuestionInfo();
  }, [questions, answers, users]);

  useEffect(() => {

    const getAnswersInfo = () => {
      const names = {};
      answers.forEach(answer => {
        names[answer.id] = users.find(user => user.id === answer.userId).username;
      });
      setAnswerAuthors(names);
    }
    getAnswersInfo();
  }, [answers, users]);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        answersCount,
        questionAuthors,
        addNewQuestion,
        editQuestion,
        deleteQuestion,
        answers,
        answerAutors,
        questionAnswers
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;