import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import QuestionContext from "../../contexts/QuestionContext";
import UsersContext from "../../contexts/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import ModalDialogDelete from "../UI/ModalDialogDelete";
import Answer from "../UI/Answer";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid'

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

  >.vote{
    position: absolute;
    right: 10px;
    top: 80px;
    display: flex;
    flex-direction: column;


    >button{
      background-color: transparent;
      border: none;
      color: #747264;
      cursor: pointer;
      
      >i{
        font-size: 25px;
      }
    }

    .greenhand{
      color: #0b550b;
    }

    .redhand{
      color: #940000;
    }
  }

  >div{
    display: flex;
    gap: 15px ;
    font-size: 22px;
    margin-left: 10px;

    >.green{
    color: #0b550b;
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

    >a{
      color: #1e1e1e;
    }

    >button{
      background-color: transparent;
      border: none;
      color: #1e1e1e;
      cursor: pointer;
    }
  }
  }
`;

const StyledAnswer = styled.section`

>div{
  >form {
    display: flex;
    align-items: end;
    flex-direction: column;
    padding-right: 5%;
    textarea{
      width: 80%;
      margin-top: 20px;
        border: none;
        height: 40px;
        border-bottom: 1px solid  #1E1E1E;
        background-color: #EEEDEB;
        font-size: 20px;
        color: #1E1E1E;
        resize: vertical;
        
        &::placeholder{
          font-size: 20px;
          color: #3c3633;
        }
    }

    >input{
      margin-top: 20px;
      background-color: #3C3633;
      color: #EEEDEB;
      width: 150px;
      height: 35px;
      border-radius: 8px;
      align-self: end;
      border: none;
      font-size: 22px;
      cursor: pointer;

      &:hover{
        box-shadow: -1px -3px 10px 0 #1E1E1E inset;
      }
    }
    >p{
      color: #940000;
      font-size: 22px;
    }
  }
}

`;

const OneQuestion = () => {

  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const { answersCount, questionAuthors, deleteQuestion, questionAnswers, answerAutors, addNewAnswer, editQuestion } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then(res => res.json())
      .then(data => setQuestion(data))
  }, [id]);

  const handleLikeClick = () => {
    if (!question.likes.find(user => user === loggedInUser.id)) {
      question.likes.push(loggedInUser.id)
      if (question.dislikes.find(user => user === loggedInUser.id)) {
        question.dislikes.splice(question.dislikes.indexOf(loggedInUser.id), 1);
      }
    } else {
      question.likes.splice(question.likes.indexOf(loggedInUser.id), 1);
    }
    editQuestion(question);
  };

  const handleDislikeClick = () => {
    if (!question.dislikes.find(user => user === loggedInUser.id)) {
      question.dislikes.push(loggedInUser.id)
      if (question.likes.find(user => user === loggedInUser.id)) {
        question.likes.splice(question.likes.indexOf(loggedInUser.id), 1);
      }
    } else {
      question.dislikes.splice(question.dislikes.indexOf(loggedInUser.id), 1);
    }
    editQuestion(question);
  };

  const formik = useFormik({
    initialValues: {
      answer: ""
    },
    onSubmit: values => {
      const newAnswer = {
        id: uuid(),
        questionId: id,
        userId: loggedInUser.id,
        likes: [],
        dislikes: [],
        edited: false,
        ...values
      }
      addNewAnswer(newAnswer);
      formik.resetForm();
    },
    validationSchema: Yup.object({

      answer: Yup.string()
        .min(5, 'Answer must be at least 5 symbols length')
        .max(500, "Answer can't be longer than 500 symbols")
        .required('Required')
        .trim()
    })
  });


  return (<>
    <StyledOneQuestion>
      <div>
        <h1>{question.title}</h1>
        <h3>{question.question}</h3>
        <div>
          {question.likes && <p className={(question.likes.length - question.dislikes.length) > 0 ? "green" : (question.likes.length - question.dislikes.length) < 0 ? "red" : "zero"}>
            {question.likes.length - question.dislikes.length} rating
          </p>}
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
        {loggedInUser &&
          <div className="vote">
            <button onClick={handleLikeClick} className={question.likes && question.likes.find(like => like === loggedInUser.id) && "greenhand"}><i className="bi bi-hand-thumbs-up-fill"></i> </button>
            <button onClick={handleDislikeClick} className={question.dislikes && question.dislikes.find(dislike => dislike === loggedInUser.id) && "redhand"}><i className="bi bi-hand-thumbs-down-fill"></i> </button>
          </div>}
      </div>
      <ModalDialogDelete isOpen={show}>
        Are you sure you want delete this?
        <br />
        <button onClick={() => { deleteQuestion(id); setShow(false); navigate('/') }}>Yes</button>
        <button onClick={() => {
          setShow(false);
        }}>No</button>
      </ModalDialogDelete>
    </StyledOneQuestion>

    <StyledAnswer>
      <div>
        {loggedInUser && <form onSubmit={formik.handleSubmit}>
          <textarea
            name="answer" id="answer"
            placeholder="Write your answer here..."
            value={formik.answer}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.answer && formik.errors.answer &&
            <p>{formik.errors.answer}</p>
          }
          <input type="submit" value="Add answer" />

        </form>}
        {
          questionAnswers[id]?.map(el => {
            return <Answer
              key={el.id}
              data={el}
              answerAutors={answerAutors[el.id]}
            />
          })
        }

      </div>

    </StyledAnswer>

  </>
  )
}

export default OneQuestion;