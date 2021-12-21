import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './pages/Main.js';
// import ChatView from './components/chat_list.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Main} />
      </Router>
    </div>
  );
}

export default App;
