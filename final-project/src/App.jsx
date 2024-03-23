import './App.css';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import MainQuestions from './components/pages/MainQuestions';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <MainQuestions />
      </main>
      <Footer />
    </>
  );
}

export default App;
