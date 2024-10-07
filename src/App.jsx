import './App.css';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Subreddits from './features/Subreddits/Subreddits.jsx';

function App() {
  return (
    <div className="container">
      <Header />  
      <Main />
      <Subreddits />
    </div>
  );
}

export default App;
