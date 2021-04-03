import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Route } from "react-router-dom";
import { postData } from './app-service';

let homePageUrl = 'http://localhost:3000/home';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const isAuthenticated = () => !!getRefreshToken();

export const authenticate = async () => {
    if (getRefreshToken()) {
        try {
            await postData('user/refresh_token', getRefreshToken(), function (tokens){
                if(tokens){
                    const expires = (tokens.expires_in || 60 * 60) * 1000
                    const inOneHour = new Date(new Date().getTime() + expires)
            
                    Cookies.set('refresh_token', tokens.refresh_token)
                    Cookies.set('access_token', tokens.access_token, { expires: inOneHour })

                    return true
                }
            })
        } catch (error) {
            redirectToHome()
            return false
        }
    }
    else {
        redirectToHome()
        return false
    }
};

const redirectToHome = () => {
    window.location.assign(homePageUrl);
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