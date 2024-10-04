import './App.css';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.js';
import Subreddits from './features/Subreddits/Subreddits.jsx';

function App() {
  return (
    <div className="App">
      <Header />  
      <Main />
      <Subreddits />
    </div>
  );
}

export default App;
