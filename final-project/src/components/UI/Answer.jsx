import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useContext, useState } from "react";
import ModalDialogDelete from "./ModalDialogDelete";
import ModalDialogEdit from "./ModalDialogEdit";
import QuestionContext from "../../contexts/QuestionContext";
import { useFormik } from "formik";
import * as Yup from 'yup';

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
  height: 160px;
  padding-left: 20px;
  >p{
      font-size: 22px;
    }
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
    bottom: 6px;
    right: 10px;
    font-size: 22px;

    >button{
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  >.vote{
    position: absolute;
    right: 10px;
    top: 60px;
    display: flex;
    flex-direction: column;
    >button{
      background-color: transparent;
      border: none;
      color: #747264;
      cursor: pointer;
      
      >i{
        font-size: 20px;
        line-height:1.5;
      }
    }
    .greenhand{
      color: #0b550b;
    }
    .redhand{
      color: #940000;
    }
  }
`;

const Answer = ({ data, answerAutors }) => {
  const { loggedInUser } = useContext(UsersContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { deleteAnswer, editAnswer } = useContext(QuestionContext);

  const formik = useFormik({
    initialValues: {
      answer: data.answer,
      id: data.id,
      questionId: data.questionId,
      userId: data.userId,
      likes: data.likes,
      dislikes: data.dislikes
    },
    onSubmit: values => {
      const editedAnswer = {
        edited: true,
        ...values
      }
      editAnswer(editedAnswer);
      setShow2(false);
    },
    validationSchema: Yup.object({
      answer: Yup.string()
        .min(5, 'Answer must be at least 5 symbols length')
        .max(500, "Answer can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim()
    })
  });

  const handleLikeClick = () => {
    if (!data.likes.find(user => user === loggedInUser.id)) {
      data.likes.push(loggedInUser.id)
      if (data.dislikes.find(user => user === loggedInUser.id)) {
        data.dislikes.splice(data.dislikes.indexOf(loggedInUser.id), 1);
      }
    } else {
      data.likes.splice(data.likes.indexOf(loggedInUser.id), 1);
    }
    editAnswer(data);
  };

  const handleDislikeClick = () => {
    if (!data.dislikes.find(user => user === loggedInUser.id)) {
      data.dislikes.push(loggedInUser.id)
      if (data.likes.find(user => user === loggedInUser.id)) {
        data.likes.splice(data.likes.indexOf(loggedInUser.id), 1);
      }
    } else {
      data.dislikes.splice(data.dislikes.indexOf(loggedInUser.id), 1);
    }
    editAnswer(data);
  };



  return (
    <StyledOneAswer>
      <h1>{data.answer}</h1>
      <div>
        {data.edited && <p>Edited</p>}
        <p>Answered by {answerAutors}</p>
      </div>
      <p className={(data.likes.length - data.dislikes.length) > 0 ? "green" : (data.likes.length - data.dislikes.length) < 0 ? "red" : "zero"}>
        {data.likes.length - data.dislikes.length} rating
      </p>
      {loggedInUser.id === data.userId &&
        <div className="editDelete">
          <button onClick={() => setShow2(true)}><i className="bi bi-pencil-square"></i></button>
          <button onClick={() => setShow(true)}><i className="bi bi-trash3" ></i></button>
        </div>}
      {loggedInUser && <div className="vote">
        <button onClick={handleLikeClick} className={data.likes && data.likes.find(like => like === loggedInUser.id) && "greenhand"}><i className="bi bi-hand-thumbs-up-fill"></i> </button>
        <button onClick={handleDislikeClick} className={data.dislikes && data.dislikes.find(dislike => dislike === loggedInUser.id) && "redhand"}><i className="bi bi-hand-thumbs-down-fill"></i> </button>
      </div>}
      <ModalDialogDelete isOpen={show}>
        Are you sure you want delete this?
        <br />
        <button onClick={() => { deleteAnswer(data.id); setShow(false) }}>Yes</button>
        <button onClick={() => {
          setShow(false);
        }}>No</button>
      </ModalDialogDelete>

      <ModalDialogEdit isOpen={show2}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <textarea
              name="answer" id="answer"
              value={formik.values.answer}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {
              formik.touched.answer && formik.errors.answer &&
              <p>{formik.errors.answer}</p>
            }
          </div>
          <input type="submit" value="Save" />
        </form>
        <button onClick={() => {
          setShow2(false);
        }}>Close</button>
      </ModalDialogEdit>
    </StyledOneAswer>
  );
}

export default Answer;