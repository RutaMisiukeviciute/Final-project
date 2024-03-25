import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import QuestionContext from "../../contexts/QuestionContext";
import UsersContext from "../../contexts/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import ModalDialog from "../UI/ModalDialog";

const StyledOneQuestion = styled.section`
 box-sizing: border-box;
  border: 2px solid black;
  border-radius: 13px 8px 13px 4px;
  margin-bottom: 15px;
  position: relative;
  box-shadow: 1px 3px 5px 0 #747264;
  background-color: white;
  color: #1e1e1e;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 20px 2.5%;

  >div{
    h1{
    text-align: left;
    margin-left: 10px;
  }

  >div{
    display: flex;
    gap: 15px ;
    font-size: 22px;
    margin-left: 10px;

    >.green{
    color: green;
  }
    >.red{
    color: #940000;
  }
    >.zero{
    color: #1E1E1E;
  }

  }

  >p:first-of-type{
    font-size: 20px;
    position: absolute;
    top: 30px;
    right: 10px;
    margin: 0;
  }
  >p:last-of-type{
    font-size: 20px;
    position: absolute;
    top: 5px;
    right: 10px;
    margin: 0;
  }

  >.editDelete{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  }
`;

const OneQuestion = ({ }) => {

  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const { answersCount, questionAuthors, deleteQuestion } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then(res => res.json())
      .then(data => setQuestion(data))
  }, []);

  return (
    <StyledOneQuestion>
      <div>
        <h1>{question.title}</h1>
        <h3>{question.question}</h3>
        <div>
          <p className={question.rating > 0 ? "green" : question.rating < 0 ? "red" : "zero"}>
            {question.rating} rating
          </p>
          <p >{answersCount[id]} answers</p>
        </div>
        {question.edited && <p>Edited</p>}
        <p>Asked by {questionAuthors[id]}</p>
        {loggedInUser.id === question.userId &&
          <div className="editDelete">
            <Link to={`edit`}><i className="bi bi-pencil-square"></i></Link>
            <button onClick={() => setShow(true)} >
              <i className="bi bi-trash3" ></i>
            </button>
          </div>
        }
      </div>
      <ModalDialog isOpen={show}>
        Are you sure you want delete this?
        <br />
        <button onClick={() => { deleteQuestion(id); setShow(false); navigate('/') }}>Yes</button>
        <button onClick={() => {
          setShow(false);
        }}>No</button>
      </ModalDialog>
    </StyledOneQuestion>
  );
}

export default OneQuestion;