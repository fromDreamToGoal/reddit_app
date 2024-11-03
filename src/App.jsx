import React, { useState } from 'react';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Subreddits from './features/Subreddits/Subreddits.jsx';
import { SubredditProvider } from './utils/SubredditContext.js';
import './App.css';

function App() {
  const [isSubredditsVisible, setIsSubredditsVisible] = useState(true);

  const toggleSubreddits = () => {
    setIsSubredditsVisible((prev) => !prev);
  };

  return (
    <SubredditProvider>
      <div className={`container ${isSubredditsVisible ? '' : 'full-width'}`}>
        <Header className="header" toggleSubreddits={toggleSubreddits}/>  
        <Main className='main' />
        {isSubredditsVisible && <Subreddits className='subreddits'/>}
      </div>
    </SubredditProvider>
  );
}

export default App;