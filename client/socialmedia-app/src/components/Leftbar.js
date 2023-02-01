import "./Leftbar.css"
import Friends from "./assets/1.png";
import Groups from "./assets/2.png";
import Marketplace from "./assets/3.png";
import Watch from "./assets/4.png";
import Memories from "./assets/5.png";
import Events from "./assets/6.png";
import Gaming from "./assets/7.png";
import Gallery from "./assets/8.png";
import Videos from "./assets/9.png";
import Messages from "./assets/10.png";
import Tutorials from "./assets/11.png";
import Courses from "./assets/12.png";
import Fund from "./assets/13.png";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";


function Leftbar() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  let email = currentUser.email;
  let username = email.split("@")[0];
  let myLink = `profile/${username}`;

  const authContext = useContext(AuthContext);
  console.log("AUTHCONTEXT: ", authContext)

  const logoutUser = () => {
    authContext.signout();
  }






  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <Link to={myLink} style={{textDecoration: "none"}}>
            <div className="user">
              <img src={currentUser.imageUrl} />
              <span>{currentUser.fullname}</span>
            </div>
          </Link>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Marketplace} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />

        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />

        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item" onClick={logoutUser}>
            <img src={Courses} alt="" />
            <span>Signout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar