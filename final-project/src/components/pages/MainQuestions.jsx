import Question from "../UI/Question";
import QuestionContext from "../../contexts/QuestionContext";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  

  >.a{
    width: 180px;
    height: 40px;
    border: 1px solid #3c3633;
    border-radius: 9px;
    background-color: #3c3633;
    box-shadow: 1px 3px 10px 0 #3c3633;
    color: #eeedeb;
    font-size: 22px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    align-self: flex-end;
    
    

    &:hover{
      box-shadow: -1px -3px 10px 0 #1e1e1e inset;
    }
  }
  
 >div {
  width:95%;
 }
`;
const MainQuestions = () => {

  const { loggedInUser } = useContext(UsersContext);
  const { questions, answersCount, questionAuthors } = useContext(QuestionContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledSection>
      {loggedInUser &&
        <Link to="/askNew" className="a">Ask new question</Link>
      }
      <div>
        {
          questions.map(el => {
            return <Question
              key={el.id}
              data={el}
              countNum={answersCount[el.id]}
              questionAuthors={questionAuthors[el.id]}
              location={location}

            />
          })
        }
      </div>
    </StyledSection>
  );
}

export default MainQuestions;