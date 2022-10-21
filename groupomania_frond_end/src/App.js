import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthRouter from '@/pages/auth/AuthRouter';
import AdminRouter from '@/pages/AdminRouter';
import AuthGuard from './_helpers/AuthGuard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/" element={<Navigate to="/admin/home" replace />}
          />
          <Route path='/admin/*' element={
            <AuthGuard>
              <AdminRouter/>
            </AuthGuard>
          } />
          <Route path='/auth/*' element={<AuthRouter/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
