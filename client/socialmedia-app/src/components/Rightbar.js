import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";
import "./Rightbar.css";
function Rightbar() {

  const [allUser, setAllUser] = useState();
  const [friendRequestUser, setFriendRequestUser] = useState();
  const [update, setUpdate] = useState(0);
  const [loader, setLoader] = useState(true)
  const auth = useContext(AuthContext);
  let suggestionUserUrl = "http://localhost:5000/api/users/allusers/" + auth.user;
  let friendRequestUrl = "http://localhost:5000/api/friend/" + auth.user;
  console.log("FriendReq: ", friendRequestUser);

  useEffect(() => {
    fetch(suggestionUserUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAllUser(data)
        setLoader(false)

      })
      .catch((error) => console.log(error));
    console.log("F Q  >>>><<<<")
    fetch(friendRequestUrl)
      .then((res) => res.json())
      .then((data) => {
        setFriendRequestUser(data);

      })
      .catch((error) => console.log(error));


  }, [update])



  console.log("ALL USER: ", allUser)

  setTimeout(() => {
    let value = allUser.filter((item, index) => index < 2)
    console.log(value);
  }, 4000);

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
    }).then((result) => setUpdate(update + 1))
      .catch((error) => alert("Something went wrong"))
  };

  const acceptFriendRequest = (reqId) => {
    fetch('http://localhost:5000/api/friend', {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ requestId: reqId })
    }).then((result) => setUpdate(update + 1))
      .catch((error) => alert("Something went wrong"))

  }


  const dismissFriendRequest = (reqId) => {
    fetch('http://localhost:5000/api/friend/dismiss', {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ requestId: reqId })
    }).then((result) => setUpdate(update + 1))
      .catch((error) => alert("Something went wrong"))

  }

  const dismissSuggestedUser = (userId) => {
    // let myUserIndex = allUser.findIndex((x) => x._id === userId)
    
    // setAllUser(allUser.splice(myUserIndex,1))
  }




  if (loader) {
    return (
      <div className="rightbar">
        <div className="container">

          <div className="item item-rightbar">
            <span className="suggestionText">Suggestion for you</span>
            <div className="user">
              <div className="userInfo">
                <img src="https://static8.depositphotos.com/1009634/988/v/600/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg" alt="" />
                <span className="user-activity-rightbar">Loading....</span>
              </div>
              <div className="buttons">
                <button>Add</button>
                <button>Dismiss</button>
              </div>
            </div>
            <div className="user">
              <div className="userInfo">
                <img src="https://static8.depositphotos.com/1009634/988/v/600/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg" alt="" />
                <span className="user-activity-rightbar">Loading....</span>
              </div>
              <div className="buttons">
                <button disabled>Add</button>
                <button disabled>Dismiss</button>
              </div>
            </div>
          </div>
          {/* );
          })} */}

          {/* <div className="item item-rightbar">
            <span className="suggestionText">Latest activities</span>
            <div className="user">
              <div className="userInfo">
                <img src="https://static8.depositphotos.com/1009634/988/v/600/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg" alt="" />
                <p className="activities-rightbar">
                  <span className="user-activity-rightbar">Loading...</span>
                  Loading...
                </p>
              </div>
              <div className="time-rightbar">
                <span> </span>
  
              </div>
            </div>
            <div className="user">
              <div className="userInfo">
                <img src="https://static8.depositphotos.com/1009634/988/v/600/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg" alt="" />
                <p className="activities-rightbar">
                  <span className="user-activity-rightbar">Loading...</span>
                  Loading...
                </p>
              </div>
              <div className="time-rightbar">
                <span> </span>
  
              </div>
            </div>
          </div> */}

        </div>
      </div>
    )
  }




  return (
    <div className="rightbar">
      <div className="container">
        <div className="item item-rightbar">
          {friendRequestUser.length > 0 && <span className="suggestionText">Friend Request</span>}

          {friendRequestUser.map((item, index) => {
            console.log("HI")

            let email = item.senderUserId.email;
            let username = email.split("@")[0];
            let myLink = `profile/${username}`;
            return (
              <div className="user">
                <Link to={myLink}>
                  <div className="userInfo">
                    <img src={item.senderUserId.imageUrl} alt={item.senderUserId.fullname} />
                    <span className="user-activity-rightbar">{item.senderUserId.fullname}</span>
                  </div>
                </Link>
                <div className="buttons">
                  <button onClick={() => { acceptFriendRequest(item._id) }}>Accept</button>
                  <button onClick={() => { dismissFriendRequest(item._id) }}>Dismiss</button>
                </div>
              </div>
            )
          })}

          <span className="suggestionText">Suggestion for you</span>
          {allUser.filter((item, index) => index < 4).map((item, index) => {
            console.log("Item: ", item);
            let email = item.email;
            let username = email.split("@")[0];
            let myLink = `profile/${username}`;
            return (
              <div className="user">
                <Link to={myLink} style={{textDecoration: "none"}}>
                  <div className="userInfo">
                    <img src={item.imageUrl} alt={item.fullname} />
                    <span className="user-activity-rightbar">{item.fullname}</span>
                  </div>
                </Link>
                <div className="buttons">
                  <button onClick={() => { addFriend(auth.user, item._id) }}>Add</button>
                  <button onClick={() => dismissSuggestedUser(item._id)}>Dismiss</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="item item-rightbar">
          <span className="suggestionText">Latest activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.unsplash.com/photo-1608494603682-913a9e8abee9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=854&q=80" alt="" />
              <p className="activities-rightbar">
                <span className="user-activity-rightbar">Michal john</span>
                Changed their cover picture
              </p>
            </div>
            <div className="time-rightbar">
              <span>2 min ago</span>

            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.unsplash.com/photo-1608494603682-913a9e8abee9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=854&q=80" alt="" />
              <p className="activities-rightbar">
                <span className="user-activity-rightbar">Michal john</span>
                Changed their profile picture
              </p>
            </div>
            <div className="time-rightbar">
              <span>2 min ago</span>

            </div>
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default Rightbar