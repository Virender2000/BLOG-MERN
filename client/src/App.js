import './App.css';
import { Route, Routes } from 'react-router-dom'
import Layout from './component/Layout';
import LoginPage from './component/pages/LoginPage';
import Register from './component/pages/Register';
import { UserContextProvider } from './UserContext';
import CreatePage from './component/pages/CreatePage';
import IndexPage from './component/pages/IndexPage';
import PostPage from './component/pages/PostPage';
import EditPost from './component/pages/EditPost';
function App() {
  return (
<div style={{backgroundColor:"#FFF7F0"}}>
      
    <UserContextProvider>
      {/* routes component is used for routing purpose */}
      <Routes>
        {/* //route is used to change the component based on the path */}
        <Route index element={
          <Layout>
            <IndexPage />
          </Layout>
        } />

        <Route path={'/login'} element={
          <Layout>
            <LoginPage />
          </Layout>
        }
        />
        <Route path={'/register'} element={
          <Layout>
            <Register />
          </Layout>
        }
        />
        <Route path={'/create'} element={
          <Layout>
            <CreatePage />
          </Layout>
        }
        />
        <Route path="/post/:id" element={
          <Layout>
            <PostPage />
          </Layout>
        } />

        <Route path="/edit/:id" element={
          <Layout>
            <EditPost />
          </Layout>
        } />

      </Routes>
    </UserContextProvider>
    </div>
  );
}

export default App;
