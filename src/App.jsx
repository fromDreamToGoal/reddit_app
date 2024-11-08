import React, { useState, useEffect } from 'react';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Subreddits from './features/Subreddits/Subreddits.jsx';
import { SubredditProvider } from './utils/SubredditContext.js';
import './App.css';

function App() {
  const [isSubredditsVisible, setIsSubredditsVisible] = useState(true);
  const [selectedSubreddit, setSelectedSubreddit] = useState(null); // Состояние для выбранного сабреддита

  useEffect(() => {
    // Проверяем ширину экрана при первой загрузке 
    if (window.innerWidth < 650) {  
      setIsSubredditsVisible(false); // Скрываем сабреддиты на узких экранах
    }
  }, []);

  const toggleSubreddits = () => {
    setIsSubredditsVisible((prev) => !prev);
  };

  const handleSubredditSelection = (subredditName) => {
    setSelectedSubreddit(subredditName); // Обновляем выбранный сабреддит
  };

  return (
    <SubredditProvider>
      <div className={`container ${isSubredditsVisible ? '' : 'full-width'}`}>
        <Header 
          className="header" 
          toggleSubreddits={toggleSubreddits}
          onSelectSubreddit={handleSubredditSelection} />  
        <div className='main'>
          <Main className="main" />
          {isSubredditsVisible && <div className="overlay" />}
        </div>
        {isSubredditsVisible && 
        <Subreddits 
          className='subreddits' 
          toggleSubreddits={toggleSubreddits}
          selectedSubreddit={selectedSubreddit}
          onSelectSubreddit={handleSubredditSelection} />}
      </div>
    </SubredditProvider>
  );
};

export default App;