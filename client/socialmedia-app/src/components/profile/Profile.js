import "./Profile.css";
import { useEffect, useState, useContext } from "react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPost from "../addpost/AddPost";
import AuthContext from "../../AuthContext";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(); // stored that user data who's not logged in.
  const [checkUser, setCheckUser] = useState(); // getting user list of that users who are not friends of login user.
  const [loader, setLoader] = useState(true)
  const [addPostOpen, setAddPostOpen] = useState(false);
  const [update, setUpdate] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  let { username } = useParams();
  const currentUID = user?.map((currentItem) => currentItem._id);
  console.log("UIDDD: ", currentUID)

  // Making username from localstorage current login user email.
  let currentUsername = currentUser.email.split("@")[0];

  // finding that search user is friend of current login user or not.
  const userIsFriend = checkUser?.find((item) => item._id == currentUID);

  const auth = useContext(AuthContext);
  let suggestionUserUrl = "http://localhost:5000/api/allusers/" + auth.user;

  console.log("NOT USER: ", user)
  let notCurrentUser = "http://localhost:5000/api/users/profile/" + username;
  useEffect(() => {
    fetch(notCurrentUser)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUser(data)
        setLoader(false)

      })
      .catch((error) => console.log(error));

    fetch(suggestionUserUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCheckUser(data)
      })
      .catch((error) => console.log(error));
  }, [username, update]);


  // Unfriend current user friend
  const unfriend = () => {
    fetch(`http://localhost:5000/api/friend/unfriend`, {
      method: "delete",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        currentuid: currentUser._id,
      recipientuid: currentUID })
    })
    .then((result)=>setUpdate(!update))
    .catch((err)=>console.log(err))

  };
  
// Send Friend Request
  const addFriend = (senderuid, recipientuid) => {
    let friendRequest = {
      senderId: senderuid,
      recipientId: recipientuid
    }

    fetch('http://localhost:5000/api/friend', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(friendRequest)
    }).then((result) => setUpdate(!update))
      .catch((error) => alert("Something went wrong"))
  };



  if (currentUsername === username) {
    return (
      <>
        <div className="profile">
          <div className="images">
            <img src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="coverPic" />
            <img src={currentUser.imageUrl} className="profilePic" />
          </div>
          <div className="profile-container">
            <div className="profile-userinfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="medium" />
                </a>
              </div>
              <div className="center">
                <span className="username-center">{currentUser.fullname}</span>
                <div className="user-info">
                  <div className="item">
                    <PlaceIcon />
                    <span>Pakistan</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>English</span>
                  </div>
                </div>
                <button className="addBtn" onClick={() => setAddPostOpen(!addPostOpen)}>Add Post</button>
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
        </div>
        {addPostOpen && <AddPost showuserpost={addPostOpen} userid={currentUID} />}
      </>
    )
  }


  if (loader) {
    return (
      <>

        <div className="profile">
          <div className="images">
            <img src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="coverPic" />
            <img src="https://static8.depositphotos.com/1009634/988/v/600/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg" className="profilePic" />
          </div>
          <div className="profile-container">
            <div className="profile-userinfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="medium" />
                </a>
              </div>
              <div className="center">
                <span className="username-center">Loading...</span>
                <div className="user-info">
                  <div className="item">
                    <PlaceIcon />
                    <span>Pakistan</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>English</span>
                  </div>
                </div>
                <button className="addBtn" onClick={() => setAddPostOpen(!addPostOpen)}>Add Post</button>
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      {user.map((currentItem, index) => {
        return (


          <div className="profile">
            <div className="images">
              <img src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="coverPic" />
              <img src={currentItem.imageUrl} className="profilePic" />
            </div>
            <div className="profile-container">
              <div className="profile-userinfo">
                <div className="left">
                  <a href="http://facebook.com">
                    <FacebookTwoToneIcon fontSize="medium" />
                  </a>
                  <a href="http://facebook.com">
                    <InstagramIcon fontSize="medium" />
                  </a>
                  <a href="http://facebook.com">
                    <TwitterIcon fontSize="medium" />
                  </a>
                  <a href="http://facebook.com">
                    <LinkedInIcon fontSize="medium" />
                  </a>
                  <a href="http://facebook.com">
                    <PinterestIcon fontSize="medium" />
                  </a>
                </div>
                <div className="center">
                  <span className="username-center">{currentItem.fullname}</span>
                  <div className="user-info">
                    <div className="item">
                      <PlaceIcon />
                      <span>Pakistan</span>
                    </div>
                    <div className="item">
                      <LanguageIcon />
                      <span>English</span>
                    </div>
                  </div>
                  <div className="myAddBtn">
                    <button className="addBtn" onClick={() => setAddPostOpen(!addPostOpen)}>Show Post</button>
                    {userIsFriend == null ?
                      <div className="dropdown">
                        <button className="addBtn">Friends ⮟</button>
                        <div className="dropdown-content">
                          <span onClick={unfriend}>Unfriend</span>
                        </div>
                      </div>
                      : <button className="addBtn" onClick={()=>{addFriend(currentUser._id, currentItem._id)}}>Add</button>}
                  </div>
                </div>
                <div className="right">
                  <EmailOutlinedIcon />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {addPostOpen && <AddPost showuserpost={addPostOpen} userid={currentUID} />}

    </>
  )
}

export default Profile;