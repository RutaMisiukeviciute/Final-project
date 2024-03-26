import Question from "../UI/Question";
import QuestionContext from "../../contexts/QuestionContext";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../UI/DropdownMenu";

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

 >.filter{
  display: flex;
  width: 200px;
  align-items: baseline;
  justify-content: end;
  gap: 10px;
 }
`;
const MainQuestions = () => {

  const { loggedInUser } = useContext(UsersContext);
  const { questions, answersCount, questionAuthors } = useContext(QuestionContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (option) => {
    setSelectedFilter(option.value);
  };

  const filteredQuestions = questions.filter(question => {
    if (selectedFilter === 'answered') {
      return answersCount[question.id] > 0;
    } else if (selectedFilter === 'not answered') {
      return answersCount[question.id] === 0;
    } else {
      return true;
    }

  });

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Answered', value: 'answered' },
    { label: 'Not answered', value: 'not answered' },
  ];

  return (
    <StyledSection>
      <div className="filter">
        <h3>Filter:</h3>
        <DropdownMenu options={options} onChange={handleFilterChange} />
      </div>
      {loggedInUser &&
        <Link to="/askNew" className="a">Ask new question</Link>
      }
      <div>
        {
          filteredQuestions.map(el => {
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