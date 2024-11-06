import React, { useState } from 'react';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Subreddits from './features/Subreddits/Subreddits.jsx';
import { SubredditProvider } from './utils/SubredditContext.js';
import './App.css';

function App() {
  const [isSubredditsVisible, setIsSubredditsVisible] = useState(true);
  const [selectedSubreddit, setSelectedSubreddit] = useState(null); // Состояние для выбранного сабреддита

  const toggleSubreddits = () => {
    setIsSubredditsVisible((prev) => !prev);
  };

  const handleSubredditSelection = (subredditName) => {
    setSelectedSubreddit(subredditName); // Обновляем выбранный сабреддит
  };

  return (
    <SubredditProvider>
      <div className={`container ${isSubredditsVisible ? '' : 'full-width'}`}>
        <Header className="header" toggleSubreddits={toggleSubreddits}/>  
        <Main className='main' />
        {isSubredditsVisible && 
        <Subreddits 
          className='subreddits' 
          toggleSubreddits={toggleSubreddits}
          selectedSubreddit={selectedSubreddit}
          onSelectSubreddit={handleSubredditSelection} />}
      </div>
    </SubredditProvider>
  );
}

export default App;