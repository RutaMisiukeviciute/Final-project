import { useFormik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import UsersContext from '../../contexts/UsersContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

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

    > span{
        grid-column: span 2;
        color: #950000;
        text-align: center;
      }
      > div{
        display: flex;
        justify-content: space-evenly;
      }
    }
    +span{
      color: #8f0000;
    }
    >input[type=submit]{
      background-color: #3C3633;
      color: #EEEDEB;
      width: 150px;
      height: 35px;
      border-radius: 8px;
      align-self: center;
      border: none;
      font-size: 22px;

      &:hover{
        box-shadow: -1px -3px 10px 0 #1E1E1E inset;
      }
    }
  }
`;

const Register = () => {

  const { addNewUser, setLoggedInUser, loggedInUser, users } = useContext(UsersContext);
  const navigate = useNavigate();
  const [sameNameError, setSameNameError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      photoURL: "",
      password: ""
    },
    onSubmit: values => {
      if (users.find(user => user.username === values.username)) {
        setSameNameError(true);
      } else {
        const newUser = {
          ...values,
          photoURL: values.photoURL ? values.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
          password: bcrypt.hashSync(values.password, 8),
          passwordNoHash: values.password,

        }
        delete newUser.passwordRepeat;
        addNewUser(newUser);
        formik.resetForm();
        setLoggedInUser(newUser);
        navigate('/');
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      }
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'User name must be at least 4 symbols length')
        .max(20, 'User name can be up to 20 symbols length')
        .required('Field must be filled')
        .trim(),
      email: Yup.string()
        .email('Field must be a valid email')
        .required('Field must be filled')
        .trim(),
      photoURL: Yup.string()
        .url('Fields must be a valid url')
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          'Password must be at least: one lower case, one upper case, one number, one special symbol and length to be between 8 and 25'
        )
        .required('Field must be filled')
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Field must be filled')
    })
  });

  return (
    <StyledSection>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">User Name:</label>
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
            <span>{formik.errors.username}</span>
          }
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email" id="email"
            placeholder="Enter your email..."
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.email && formik.errors.email &&
            <span>{formik.errors.email}</span>
          }
        </div>
        <div>
          <label htmlFor="photoURL">Profile Picture:</label>
          <input
            type="url"
            name="photoURL" id="photoURL"
            placeholder="Enter profile picture url..."
            value={formik.values.photoURL}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.photoURL && formik.errors.photoURL &&
            <span>{formik.errors.photoURL}</span>
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
            <span>{formik.errors.password}</span>
          }
        </div>
        <div>
          <label htmlFor="passwordRepeat">Repeat Password:</label>
          <input
            type="password"
            name="passwordRepeat" id="passwordRepeat"
            placeholder="Repeat your password..."
            value={formik.values.passwordNoHash}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.passwordNoHash && formik.errors.passwordNoHash &&
            <span>{formik.errors.passwordNoHash}</span>
          }
        </div>
        <input type="submit" value="Register" />
      </form>
      {
        sameNameError && <p>Username is invalid</p>
      }
    </StyledSection>
  );
}

export default Register;