import './App.css';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import MainQuestions from './components/pages/MainQuestions';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <main>

        <Routes>
          <Route path='/' element={<MainQuestions />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </main>
      <Footer />
    </>
  );
}

export default App;
