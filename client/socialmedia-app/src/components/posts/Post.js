import "./Post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";


function Post(props) {
  const [postLike, setPostLike] = useState(false);
  const [commentOpen, setCommentOpen] = useState({
    postId: "",
    check: false,
  });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("IN POST.JS ::: <<<<", props.postsData);

  console.log("COMMENT POST ID: ", commentOpen.postId);


  // When user click on like button 
  const userLikePost = (postid, userid) => {
    // setPostLike(!postLike);
    const myLikePostData = {
      postId: postid,
      userId: userid,
    }

    fetch('http://localhost:5000/api/post/like', {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(myLikePostData)
    }).then((result) => updatePostLikes(postid)).catch((error) => console.log(error));
  }

  // When user click on unlike button 
  const userUnlikePost = (postid, userid) => {
    // setPostLike(!postLike);
    const myLikePostData = {
      postId: postid,
      userId: userid,
    }

    fetch('http://localhost:5000/api/post/unlike', {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(myLikePostData)
    }).then((result) => updatePostLikes(postid)).catch((error) => console.log(error));
  }


  const updatePostLikes = (postid) => {
    let postUrl = 'http://localhost:5000/api/post/likecount/' + postid;
    fetch(postUrl).then((res) => res.json())
      .then(data => {
        console.log("Likes count update >> ", data)
        setPostLike(!postLike);
        props.updateComponent(!props.update);
      }).catch((err) => console.log("Error on Likes count: ", err))
  }

  return (
    <div className="post">
      {props?.postsData?.length > 0 &&
        props?.postsData?.map((currentPost, index) => {
          return (
            <div className="container" key={currentPost._id}>
              <div className="user">
                <div className="userInfo">
                  <img src={currentPost.userImage} alt="" />
                  <div className="details">
                      <span className="name">{currentPost.fullName}</span>
                    <span className="date">{new Date(currentPost.createdAt).toISOString().substring(0,10).split("-").reverse().join("-")}</span>
                  </div>
                </div>
                <MoreHorizIcon />

              </div>
              <div className="content">
                <span className="content-text">{currentPost.postDescription}</span>
                <div className="content-image">
                  { currentPost.postImage.length !== 0 ? <img src={currentPost.postImage} alt="" /> : console.log("No Post image to show")}
                </div>
              </div>
              <div className="info">
                {(currentPost?.likes.includes(currentUser._id)) ?
                  <div className="item" onClick={() => userUnlikePost(currentPost._id, currentUser._id)}>
                    <FavoriteOutlinedIcon style={{ color: 'red' }} />
                    {currentPost.likes.length}
                  </div>
                  :
                  <div className="item" onClick={() => userLikePost(currentPost._id, currentUser._id)}>
                    <FavoriteBorderOutlinedIcon />
                    {currentPost.likes.length}
                  </div>

                }
                <div className="item" onClick={() => setCommentOpen({ ...commentOpen, postId: currentPost._id, check: !commentOpen.check })}>
                  <TextsmsOutlinedIcon />
                  Comments

                </div>
                <div className="item">
                  <ShareOutlinedIcon />
                  Share
                </div>
              </div>
              { commentOpen.check && commentOpen.postId === currentPost._id?  <Comments currentPostDetails={commentOpen.postId} /> : console.log("No Other Post comments show")}
            </div>
          );
        })}
    </div>
  )
}

export default Post;