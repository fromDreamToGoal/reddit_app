import './App.css';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Subreddits from './features/Subreddits/Subreddits.jsx';
import { SubredditProvider } from './utils/SubredditContext.js';

function App() {
  return (
    <SubredditProvider>
      <div className="container">
        <Header className="header"/>  
        <Main className="main" />
        <Subreddits className="subreddits" />
      </div>
    </SubredditProvider>
  );
}

export default App;