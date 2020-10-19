import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Button from '../UI/Button/Button';
import classes from './AddNewPost.module.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { RiCloseCircleLine } from "react-icons/ri"


function AddNewPost() {

    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push('/login');
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [toggle, setToggle] = useState(false)

    const titleChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    const contentChangeHandler = (e) => {
        setContent(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const postData = { title, content };
        await Axios.post('http://localhost:5000/post/add', postData)
        setToggle(true);
    }

    return (<div>
        <div className={classes.AddPost}>
            <h1>Add Post</h1>
            <input
                type='text'
                placeholder='Enter the Title of your post'
                onChange={titleChangeHandler}
                value={title}
            ></input>
            <textarea rows="5"
                type='text'
                placeholder='Enter the Content of your post'
                onChange={contentChangeHandler}
                value={content}
            ></textarea>
            {/* <Button buttonName='Add Post'  /> */}
            <Button buttonName='Add Post' clicked={onSubmitHandler} />
        </div>
        {toggle ? (<div className={classes.Calories} >
            <p> Your post has been added successfully!</p>
            < RiCloseCircleLine
                onClick={(e) => { setToggle(false); setTitle(''); setContent('') }}
                style={{
                    paddingRight: '10px',
                    fontSize: '1.5em'
                }} />
        </div>
        ) : null}
    </div>
    )
}

export default AddNewPost
