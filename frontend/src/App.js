
import './App.css';
import { Routes } from 'react-router-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Join from './component/Join';
import Chat from './component/Chat';

function App() {

  return (
    <div className="App">
    <Router>
      <Routes>

      <Route path="/" element={< Join />} />
      <Route path="/chat" element={<Chat />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
