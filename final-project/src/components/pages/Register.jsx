import { useFormik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import UsersContext from '../../contexts/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1{
    font-size: 2.5rem;
  }
  > form{
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      > div{
        display: flex;
        justify-content: space-evenly;
      }
    }
    > input{
      width: 50%;
      align-self: center;
    }
  }
`;

const Register = () => {

  const { addNewUser, setLoggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      photoURL: ""
    },
    onSubmit: values => {
      const newUser = {
        ...values,
        photoURL: values.photoURL ? values.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',

      }
      console.log(newUser);
      addNewUser(newUser);
      formik.resetForm();
      setLoggedInUser(newUser);
      navigate('/');
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
            value={formik.values.passwordRepeat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
            <span>{formik.errors.passwordRepeat}</span>
          }
        </div>
        <input type="submit" value="Register2" />
      </form>
    </StyledSection>
  );
}

export default Register;