import { 
  // createBrowserRouter, 
  // createRoutesFromElements, 
  Route, 
  // RouterProvider,
  Routes
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import SignInForm from './pages/Signin'
// import createStore from 'react-auth-kit/createStore';
// import AuthProvider from 'react-auth-kit';
import Signup from './pages/Signup';
import SignupForm from './pages/Test';
import RequireAuth from './components/RequireAuth'
import VideoUpload from './pages/FileUpload'

// const store = createStore({
//   authName:'_auth',
//   authType:'cookie',
//   cookieDomain: window.location.hostname,
  
// });
// router and routes
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Dashboard />} />
//       <Route element={<RequireAuth/>}>
//         <Route path="create" element={<Create />} />
//         <Route path="profile" element={<Profile />} />
//       </Route>
//       <Route path="login" element={<LoginForm />} />
//       <Route path="register" element={<Register />} />
//       <Route path="test" element={<SignupForm />} />
//     </Route>
//   )
// )

function App() {
  return ( 
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route element={<RequireAuth/>}>
          <Route path="upload" element={<Upload />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="signin" element={<SignInForm />} />
        <Route path="signup" element={<Signup />} />
        <Route path="test" element={<SignupForm />} />
        <Route path="drop" element={<VideoUpload />} />
      </Route>
    </Routes>
  )
}

export default App
