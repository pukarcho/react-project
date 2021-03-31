import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Route } from "react-router-dom";
import { postData, postAuthData } from './app-service';


let apiUrl = 'https://localhost:44337/api/';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const isAuthenticated = () => !!getRefreshToken();

export const authenticate = async () => {
    if (getRefreshToken()) {
        let tokenParams = new URLSearchParams();

        let url = new URL(apiUrl.substring(0, apiUrl.length - 4) + 'connect/token');
        tokenParams.set('grant_type', 'refresh_token');
        tokenParams.set('refresh_token', getRefreshToken());
        
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: tokenParams // body data type must match "Content-Type" header
        })
        .then((response) => response.text())
        .then((data) => data ? JSON.parse(data) : {})
        .then(data => {
            if(data.error)
            {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
            }
            else {
                const expires_in = new Date(new Date().getTime() + (data.expires_in * 1000));
                const oneDay = new Date(new Date().getTime() + (60 * 60 * 24 * 1000));
                Cookies.set('access_token', data.access_token, { expires: expires_in });
                Cookies.set('refresh_token', data.refresh_token, {expires: oneDay });
            }
        });
    }
    else {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        return false;
    }
};

export const AuthenticatedRoute = ({ component: Component, exact, path }) => (
    <Route exact={exact} path={path} render={props => isAuthenticated() ? ( <Component {...props} /> ) : (
        <AuthenticateBeforeRender render={() => <Component {...props} />} />)}
    />
);

class AuthenticateBeforeRender extends Component {
    state = {
        isAuthenticated: false
    }

    componentDidMount() {
        this.setState({ isAuthenticated: authenticate() });
    }

    render() {
        return this.state.isAuthenticated ? this.props.render() : null;
    }
};

export default AuthenticateBeforeRender;