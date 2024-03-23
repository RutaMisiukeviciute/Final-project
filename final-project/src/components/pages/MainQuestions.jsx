import Question from "../UI/Question";
import QuestionContext from "../../contexts/QuestionContext";
import { useContext } from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  
  >div{
    width: 95%;
  }
`;
const MainQuestions = () => {

  const { question, answersCount } = useContext(QuestionContext);
  return (
    <StyledSection>
      <div >
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
    </StyledSection>
  );
}

export default MainQuestions;