import './App.css';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import MainQuestions from './components/pages/MainQuestions';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AskNewQuestion from './components/pages/AskNewQuestion';
import { Routes, Route, Navigate } from 'react-router-dom';
import UsersContext from './contexts/UsersContext';
import { useContext } from 'react';

const App = () => {

  const { loggedInUser } = useContext(UsersContext);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<MainQuestions />} />
          <Route path='/askNew' element={<AskNewQuestion />} > </Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </main>
      <Footer />
    </>
  );
}

export default App;
