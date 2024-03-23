import Question from "../UI/Question";
import QuestionContext from "../../contexts/QuestionContext";
import { useContext } from "react";

const MainQuestions = () => {

  const { question, answersCount } = useContext(QuestionContext);
  return (
    <section>
      <div>
        {
          question.map(el => {
            return <Question
              key={el.id}
              data={el}
              countNum={answersCount[el.id]}
            />
          })
        }
      </div>
    </section>
  );
}

export default MainQuestions;