import Question from "../UI/Question";
import QuestionContext from "../../contexts/QuestionContext";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
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
    cursor: pointer;
    
    &:hover{
      box-shadow: -1px -3px 10px 0 #1e1e1e inset;
    }
  }
  
    >div {
       width:95%;
   }

>.SortAndFilter{
  display: flex;
  justify-content: space-evenly;

  >.filter{
  display: flex;
  width: 200px;
  align-items: baseline;
  justify-content: end;
  gap: 10px;
  }

 >.sort{
  display: flex;
  align-items: baseline;
  gap: 10px;

  >button{
    width: 180px;
    height: 40px;
    border: 1px solid #3c3633;
    border-radius: 9px;
    background-color: #3c3633;
    box-shadow: 1px 3px 10px 0 #3c3633;
    color: #eeedeb;
    font-size: 22px;
    cursor: pointer;

    &:hover{
      box-shadow: -1px -3px 10px 0 #1e1e1e inset;
    }
  }
 }
}
`;
const MainQuestions = () => {

  const { loggedInUser } = useContext(UsersContext);
  const { questions, answersCount, questionAuthors } = useContext(QuestionContext);
  const location = useLocation();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortDateOption, setSortDateOption] = useState('unsorted');
  const [sortAnswersOption, setSortAnswersOption] = useState('unsorted');

  const handleFilterChange = (option) => {
    setSelectedFilter(option.value);
  };

  const handleSortDateClick = () => {
    const newSortDateOption =
      sortDateOption === 'unsorted' ? 'newestToOldest' :
        sortDateOption === 'newestToOldest' ? 'oldestToNewest' :
          'unsorted';

    setSortDateOption(newSortDateOption);
  };

  const handleSortAnswersClick = () => {
    const newSortAnswersOption =
      sortAnswersOption === 'unsorted' ? 'descending' :
        sortAnswersOption === 'descending' ? 'ascending' :
          'unsorted';

    setSortAnswersOption(newSortAnswersOption);
  };

  const filteredQuestions = questions.filter(question =>
    selectedFilter === 'answered' ? answersCount[question.id] > 0 :
      selectedFilter === 'not answered' ? answersCount[question.id] === 0 :
        true
  );

  const sortedByDateQuestions = () => {
    return sortDateOption === 'newestToOldest'
      ? [...sortedByAnswersQuestions()].sort((a, b) => new Date(b.date).setHours(0, 0, 0, 0) - new Date(a.date).setHours(0, 0, 0, 0))
      : sortDateOption === 'oldestToNewest'
        ? [...sortedByAnswersQuestions()].sort((a, b) => new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0))
        : sortedByAnswersQuestions();
  };

  const sortedByAnswersQuestions = () => {
    return sortAnswersOption === 'ascending'
      ? [...filteredQuestions].sort((a, b) => answersCount[a.id] - answersCount[b.id])
      : sortAnswersOption === 'descending'
        ? [...filteredQuestions].sort((a, b) => answersCount[b.id] - answersCount[a.id])
        : filteredQuestions;
  };

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Answered', value: 'answered' },
    { label: 'Not answered', value: 'not answered' },
  ];

  return (
    <StyledSection>
      <div className="SortAndFilter">
        <div className="sort">
          <h3>Sort:</h3>
          <button onClick={handleSortDateClick}>
            {sortDateOption === 'unsorted' && 'Date'}
            {sortDateOption === 'newestToOldest' && <>Date <i className="bi bi-sort-up"></i></>}
            {sortDateOption === 'oldestToNewest' && <>Date <i className="bi bi-sort-down-alt"></i></>}
          </button>
          <button onClick={handleSortAnswersClick}>
            {sortAnswersOption === 'unsorted' && 'Answers'}
            {sortAnswersOption === 'ascending' && <>Answers <i className="bi bi-sort-down-alt"></i></>}
            {sortAnswersOption === 'descending' && <>Answers <i className="bi bi-sort-up"></i></>}
          </button>
        </div>
        <div className="filter">
          <h3>Filter:</h3>
          <DropdownMenu options={options} onChange={handleFilterChange} />
        </div>
      </div>
      {loggedInUser &&
        <Link to="/askNew" className="a">Ask new question</Link>
      }
      <div>
        {
          sortedByDateQuestions().map(el => {
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