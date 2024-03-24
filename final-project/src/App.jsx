import './App.css';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import MainQuestions from './components/pages/MainQuestions';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AskNewQuestion from './components/pages/AskNewQuestion';
import OneQuestion from './components/pages/OneQuestion';
import EditQuestion from './components/pages/EditQuestion';

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
          <Route path='/' >
            <Route index element={<MainQuestions />} />
            <Route path=':id' element={<OneQuestion />} />
            <Route path=":id/edit" element={<EditQuestion />} />
          </Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </main>
      <Footer />
    </>
  );
}

export default App;
