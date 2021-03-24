import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import Home from './home/home/home';
import AboutUs from './home/about-us/about-us';
import Login from './home/login/login';
import Register from './home/register/register';

import Navigation from './shared/navigation/navigation';
import Footer from './home/footer/footer';

function App() {
  	return (
		<div>
			<Navigation />

			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/about-us" component={AboutUs} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Redirect to='/home' />
			</Switch>

			<Footer />
		</div>
  	);
}

export default App;
