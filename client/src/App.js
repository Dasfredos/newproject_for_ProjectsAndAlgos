import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from './components/HomePage';
import NewFootyEvent from './components/NewFootyEvent';
import EditEvent from './components/EditEvent';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import ViewFootyEvents from './components/ViewFootyEvents';
import SearchFootyEvents from './components/SearchFootyEvents';
import AboutEvent from './components/AboutEvent';
import AboutUser from './components/AboutUser';

function App() {
  const [title, setTitle] = useState('Site Header!')
  const [user, setUser] = useState({})

  return (
    <div className="App">
          <BrowserRouter>
          <NavBar user={user} setUser={setUser}/>
          
            <Routes>
              <Route exact path ="/" element={<HomePage/>} />
              <Route exact path ="/login" element={<Login  setTitle={setTitle} user={user} setUser={setUser}/>} />
              <Route exact path ="/createfootyevent" element={<NewFootyEvent setTitle={setTitle} user={user} setUser={setUser} />} />
              <Route exact path ="/api/footyevent/:id" element={<AboutEvent setTitle={setTitle} user={user} setUser={setUser} />} />
              <Route exact path ="/register" element={<Register setTitle={setTitle} setUser={setUser}/>} />
              <Route exact path ="/searchfootyevents" element={<SearchFootyEvents  setTitle={setTitle} user={user}/>} />
              <Route exact path ="/viewfootyevents/:id" element={<ViewFootyEvents  setTitle={setTitle} user={user}/>} />
              <Route exact path ="/user/:id" element={<AboutUser  setTitle={setTitle} user={user} setUser={setUser}/>} />
              <Route exact path ="/editfootyevent/:id" element={<EditEvent  setTitle={setTitle} user={user} />} />
              <Route exact path ="/logout" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
