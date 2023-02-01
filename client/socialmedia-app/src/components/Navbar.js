import "./Navbar.css"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [searchUser, setSearchUser] = useState("");
  const [searchUserResult, setSearchUserResult] = useState([]);
  console.log("SUR: ", searchUserResult);

  useEffect(() => {
    console.log("UseEffect");
    let url = 'http://localhost:5000/api/users/search/' + searchUser;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSearchUserResult(data))
      .catch((error) => console.log(error))

  }, [searchUser]);


  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("Current User: ", currentUser);

  // Making username from localstorage current login user email.
  let currentUsername = currentUser.email.split("@")[0];
  let profileUrl = "profile/" + currentUsername;

  return (

    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Hamza Social App</span>
        </Link>
        <HomeOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search.." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
          <div className="searchUser">
            {(searchUserResult.length >= 1) ? (
              searchUserResult.map((value, index) => {
                let email = value.email;
                let username = email.split("@")[0];
                let myLink = `profile/${username}`;
                console.log("MAP result: ", value)
                return (

                  <Link to={myLink}>
                    <div className="searchUserResult" key={index}>
                      <img src={value.imageUrl} />
                      <span className="searchUserInfo">{value.fullname}</span>
                    </div>
                  </Link>

                )
              })
            ) : console.log("Nothing to show RESULT!!!.... ")}
          </div>
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={profileUrl} style={{textDecoration: "none"}}>
          <div className="user">
            <img src={currentUser.imageUrl} />
            <span>{currentUser.fullname}</span>
          </div>
        </Link>
      </div>
    </div>

  )
}

export default Navbar