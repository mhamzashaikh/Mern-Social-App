import { useEffect } from "react";
import { useState } from "react";
import "./Comments.css";

function Comments(props) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [update, setUpdate] = useState(false);
  const [commentsData, setCommentsData] = useState();
  const [comment, setComment] = useState({
    text: "",
    postedBy: currentUser._id,
    postId: props.currentPostDetails
  });
  // console.log("MY COMMENT OF POST IS: ->>>>>: ", comment)
  console.log("MY COMMENTS DATA IS: ->>>>>: ", commentsData)

  useEffect(()=>{
    fetch(`http://localhost:5000/api/post/comment/${props.currentPostDetails}`)
    .then((res)=>res.json())
    .then((data)=>setCommentsData(data))
    .catch((err)=>console.log(err))

  },[update]);


  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  // Add Comment to post
  const addComment = () => {
    if (comment.text !== "" && comment.postedBy !== "") {
      console.log("Not Empty")
      fetch('http://localhost:5000/api/post/addcomment', {
        method: "PUT",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then((result) => {
        setUpdate(!update)
        alert("Comment Posted")
      }).catch((err) => {
        console.log("Comment can't posted.. ", err)
      })
    }
    else {
      console.log("empty")
    }

  }



  return (
    <div className="comments">

      <div className="write-comment">
        <img src={currentUser.imageUrl} alt="profile-pic" />
        <input type="text" placeholder="Write a comment" value={comment.text} onChange={(e) => { setComment({ ...comment, text: e.target.value }) }} />
        <button onClick={addComment}>Send</button>

      </div>
      {commentsData?.comments.map((comment) => {
        return (
          <div className="comment" key={comment._id}>
            <img src={comment.postedBy.imageUrl} alt="" />
            <div className="comment-info">
              <span>{comment.postedBy.fullname}</span>
              <p>{comment.text}</p>
            </div>
          </div>
        );
      })}

    </div>
  )
}

export default Comments;