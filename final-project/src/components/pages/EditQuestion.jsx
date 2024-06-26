import QuestionContext from "../../contexts/QuestionContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";


const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1{
    font-size: 3rem;
    color: #1E1E1E;
  }
  > form{
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      >label{
        color: #1E1E1E;
        font-size: 22px;
      }

      > input{
        border: none;
        border-bottom: 1px solid  #1E1E1E;
        height: 30px;
        background-color: #EEEDEB;
        font-size: 20px;
        color: #1E1E1E;
        
        &::placeholder{
          font-size: 20px;
          color: #3c3633d6
        }
    }

      >textarea{
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
          color: #3c3633d6;
        }
      }

    > p{
        grid-column: span 2;
        color: #950000;
        text-align: center;
      }
    }
   
    >div:last-of-type{
      >label{
        margin-top: 20px;
      }
    }

    >input[type=submit]{
      margin-top: 20px;
      background-color: #3C3633;
      color: #EEEDEB;
      width: 200px;
      height: 35px;
      border-radius: 8px;
      align-self: center;
      border: none;
      font-size: 22px;
      cursor: pointer;

      &:hover{
        box-shadow: -1px -3px 10px 0 #1E1E1E inset;
      }
    } 
  }
  >a{
        font-size: 22px;
        margin-top: 10px;
        color: #3C3633;
        

        &:hover{
        color: #1e1e1e;
        font-weight: 700;
      }
      }
`;

const EditQuestion = () => {

  const navigate = useNavigate();
  const { questions, editQuestion } = useContext(QuestionContext);
  const { id } = useParams();
  const selectedQuestion = questions.find(question => question.id === id);

  const formik = useFormik({
    initialValues: {
      id: selectedQuestion.id,
      userId: selectedQuestion.userId,
      title: selectedQuestion.title,
      question: selectedQuestion.question,
      likes: selectedQuestion.likes,
      dislikes: selectedQuestion.dislikes
    },
    onSubmit: values => {
      const editedQuestion = {
        edited: true,
        ...values
      }
      editQuestion(editedQuestion);
      navigate(-1);
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Title must be at least 5 symbols length')
        .max(50, "Title can't be longer than 50 symbols")
        .required('This field must be filled')
        .trim(),
      question: Yup.string()
        .min(5, 'Question must be at least 5 symbols length')
        .max(500, "Question can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim()
    })
  });
  return (
    <StyledSection>
      <h1>Edit question</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title" id="title"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.title && formik.errors.title &&
            <p>{formik.errors.title}</p>
          }
        </div>
        <div>
          <label htmlFor="question">Question:</label>
          <textarea
            name="question" id="question"
            value={formik.values.question}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.question && formik.errors.question &&
            <p>{formik.errors.question}</p>
          }
        </div>
        <input type="submit" value="Save" />
      </form>
      <Link to={-1}>Cancel</Link>
    </StyledSection>
  );
}

export default EditQuestion;