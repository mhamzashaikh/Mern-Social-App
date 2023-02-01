import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Home from "./components/pages/home/Home";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthContext from './AuthContext';
import ProtectedWrapper from './ProtectedWrapper';
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";


function App() {

  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  console.log("USER: ",user)


  useEffect(()=>{
    if(myLoginUser){
      setUser(myLoginUser._id)
      setLoader(false)
      console.log("inside effect", myLoginUser)
    }
    else{
      setUser("");
      setLoader(false);
    }


  },[myLoginUser])

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();

  }

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  let value = { user, signin, signout };



  if (loader)
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>LOADING...</h1>
    </div>
  );


  return (
    <>
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<div>404 no page found</div>} />
            <Route path='/' element={<ProtectedWrapper><Layout /></ProtectedWrapper>}>
              <Route index element={<Home />} />
              <Route path="profile/:username" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>




  );
}

export default App;
