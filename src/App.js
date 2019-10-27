import React from 'react';
import './App.scss';
import { UserNameInput } from './components/userNameInput/UserNameInput';
import { ChatWindow } from './components/chatWindow/ChatWindow';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={UserNameInput} />
      <Route path="/chatWindow" component={ChatWindow} />
    </Router>
  );
}

export default App;
