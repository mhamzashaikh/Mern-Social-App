import { useContext } from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../AuthContext";
import Post from "../posts/Post";
import "./AddPost.css";


function AddPost(props) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const { _id, fullname, imageUrl } = currentUser; // destructure
    console.log("CurrentUser::: , ",currentUser)

    const [post, setPost] = useState({
        userId: _id,
        userImage: imageUrl,
        fullname: fullname,
        postDescription: "",
        postImage: "",
        likes: "0",
        comments: "0"
    });
    const [image, setImage] = useState("");
    const [check, setCheck] = useState(1);
    const [posts, getPosts] = useState([]);
    const [update, setUpdate] = useState(false);
   
    const notifyPosted = () => toast.success("Your post is posted...", { position: toast.POSITION.TOP_CENTER });

    const urlForAllPost = 'http://localhost:5000/api/post/get/all';
    const urlForUserPost = 'http://localhost:5000/api/post/getposts/'+props.userid;
    useEffect(() => {
        if (!props.showuserpost) {
            fetch(urlForAllPost).then((res) => res.json()).then((data) => { getPosts(data) }
            ).catch((err) => console.log(err))
        }
        else{
            fetch(urlForUserPost).then((res) => res.json()).then((data) => { getPosts(data) }
            ).catch((err) => console.log(err))
        }

    }, [check, update]);


    // Upload attach image to server and add that Url to our Database;
    const uploadImage = async () => {
        if (image?.name?.length) {

            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "up4zrotl");
            // data.append("cloud_name", "ddhayhptm");

            await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
                method: "POST",
                body: data

            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPost({ ...post, postImage: data.url });
                    alert("Uploaded");
                })
                .catch((error) => console.log(error))
        }
        else {
            alert("First Choose Image then upload it")
        }
    }


    // Sending our data to api then into our DB
    const settingPost = () => {
        fetch('http://localhost:5000/api/post/add', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        }).then((result) => {
            notifyPosted();
            setCheck(check + 1)
        }
        ).catch((err) => alert("Post not added!!"))


    }


    return (
        <> 
            <div className="addPost">
                <div className="container">
                    <div className="postinfo">
                        <img src={currentUser.imageUrl} alt="PP" className="addPostProfilePic" />
                        <input type="text" placeholder="What's up on your mind?" className="addPostInput" value={post.postDescription} onChange={(e) => setPost({ ...post, postDescription: e.target.value })} />
                    </div>
                    <div className="postImages">
                        <div className="uploadImage">
                            <input type="file" accept=".png, .jpg, .jpeg" className="addPostImage" onChange={(e) => setImage(e.target.files[0])} />
                            <button className="uploadPostImgBtn" onClick={uploadImage}>Upload photo</button>
                        </div>
                        <button className="addPostBtn" onClick={settingPost}>Add Post</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Post postsData={posts} updateComponent={setUpdate} update={update} />
        </>
    );
}

export default AddPost;