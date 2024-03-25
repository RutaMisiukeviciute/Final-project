import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useContext, useState } from "react";
import ModalDialog from "../UI/ModalDialog";
import QuestionContext from "../../contexts/QuestionContext";

const StyledOneAswer = styled.div`
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
  width: 90%;
  margin: 20px 5%;
  padding: 0 10px;

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
  >.green{
    color: #0b550b;
  }
    >.red{
    color: #940000;
  }
    >.zero{
    color: #1E1E1E;
  }

  >.editDelete{
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 22px;

    >button{
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;

const Answer = ({ data, answerAutors }) => {
  const { loggedInUser } = useContext(UsersContext);
  const [show, setShow] = useState(false);
  const { deleteAnswer } = useContext(QuestionContext)



  return (
    <StyledOneAswer>
      <h1>{data.answer}</h1>
      <div>

        {data.edited && <p>Edited</p>}
        <p>Answered by {answerAutors}</p>
      </div>
      <p className={data.rating > 0 ? "green" : data.rating < 0 ? "red" : "zero"}>
        {data.rating} rating
      </p>
      {loggedInUser.id === data.userId &&
        <div className="editDelete">
          <button ><i className="bi bi-pencil-square"></i></button>
          <button onClick={() => setShow(true)}><i className="bi bi-trash3" ></i></button>
        </div>}
      <ModalDialog isOpen={show}>
        Are you sure you want delete this?
        <br />
        <button onClick={() => { deleteAnswer(data.id); setShow(false) }}>Yes</button>
        <button onClick={() => {
          setShow(false);
        }}>No</button>
      </ModalDialog>
    </StyledOneAswer>
  );
}

export default Answer;