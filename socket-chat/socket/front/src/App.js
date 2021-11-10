import chatView from './pages/chat_view';
import chatList from './components/chat_list';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello, world</p>
        <chatView />
        <chatList />
      </header>
    </div>
  );
}

export default App;
