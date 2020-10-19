import React, { useState, useEffect, useContext } from 'react';
import classes from './Posts.module.css';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom'
import Button from '../UI/Button/Button';
import axios from 'axios';

function Posts(props) {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push('/login');
    });

    const [posts, setPost] = useState([]);

    const onClickHandler = (event) => {
        // this.getPostsData();
        event.preventDefault();
        axios.get('http://localhost:5000/post/')
            .then(res => {
                const data = res.data;
                setPost(data)
            })
            .catch(err => console.log(err));
    }

    const displayPosts = (posts) => {
        if (!posts.length) return null;

        return posts.map((post, index) => (
            <div key={index} style={{ overflow: 'hidden' }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        ))
    }

    return (
        <div className={classes.Posts}>
            <form onSubmit={onClickHandler} >
                <h1 className={classes.H1}>Posts</h1>
                <div className={classes.Post} >
                    {displayPosts(posts)}
                </div>
                <div className={classes.Button}>
                    <Button buttonName={"View Posts"} />
                </div>
            </form>
        </div>
    );
}

export default Posts;