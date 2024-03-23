import { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;


  > h1{
    font-size: 3rem;
    color: #1E1E1E;
  }

  > form{
    display: flex;
    flex-direction: column;
    gap: 25px;

    > div {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;

      > p{
        grid-column: span 3;
        color: #950000;
        text-align: center;
      }

      >label{
        color: #1E1E1E;
        font-size: 22px;
      }

      >input{
        border: none;
        border-bottom: 1px solid  #1E1E1E;
        height: 30px;
        background-color: #EEEDEB;
        
        &::placeholder{
          font-size: 20px;
          color: #3c3633d6
        }
    }
    }
    +p{
      color: #8f0000;
    }

    >input[type=submit]{
      background-color: #3C3633;
      color: #EEEDEB;
      width: 100px;
      height: 35px;
      border-radius: 8px;
      align-self: center;
      border: none;
      font-size: 22px;
    }
  }
`;

const Login = () => {

  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const { users, setLoggedInUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: (values) => {
      const loggedInUser = users.find(user => user.username === values.username);

      if (loggedInUser === undefined) {
        setWrongCredentials(true);
      } else {
        setLoggedInUser(loggedInUser);
        navigate('/');
      }

      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('This field must be filled')
        .trim(),
      password: Yup.string()
        .required('This field must be filled')
        .trim()
    })
  });

  return (
    <StyledSection>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            name="username" id="username"
            placeholder="Enter your user name..."
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.username && formik.errors.username &&
            <p>{formik.errors.username}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            placeholder="Enter your password..."
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <input type="submit" value="LogIn" />
      </form>
      {
        wrongCredentials && <p>No user with such username or password combination</p>
      }
    </StyledSection>
  );
}

export default Login;