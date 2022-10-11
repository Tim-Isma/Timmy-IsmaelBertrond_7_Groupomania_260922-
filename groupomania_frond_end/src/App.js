import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Error from '@/_utils/Error'
import Follower from '@/pages/Follower';
import Following from '@/pages/Following';
import Admin from '@/pages/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />

          <Route path='/admin' element={<Admin/>} />

          <Route path='/home' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />

          <Route path='/follower' element={<Follower/>} />
          <Route path='/following' element={<Following/>} />
          
          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
