import logo from './logo.svg';
import './App.css';
import Auth from './components/auth/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ForgotPassword from './components/auth/ForgotPassword';
import SignIn from './components/auth/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
