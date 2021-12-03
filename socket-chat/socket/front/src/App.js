import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatView from './pages/chat_view.js';
// import ChatView from './components/chat_list.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={ChatView} />
      </Router>
    </div>
  );
}

export default App;
