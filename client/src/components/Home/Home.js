import React, { Component } from 'react';
import NavBar from '../../containers/NavBar/NavBar';
import Posts from '../../containers/Posts/Posts';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import WeightGain from '../../containers/WeightGain/WeightGain';
import WeightLoss from '../../containers/WeightLoss/WeightLoss';
import { Route, Switch } from 'react-router-dom';
import TasksList from '../../containers/TasksTodo/TasksList';
import AddNewPost from '../../containers/Posts/AddNewPost';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                {/* <Login />
                <WeightGain />
                <WeightLoss /> */}
                <Switch>
                    <Route path="/" exact component={TasksList} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/posts" exact component={Posts} />
                    <Route path="/add-post" exact component={AddNewPost} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/weight-gain" exact component={WeightGain} />
                    <Route path="/weight-loss" exact component={WeightLoss} />
                </Switch>
            </div>

        );
    }
}

export default Home;