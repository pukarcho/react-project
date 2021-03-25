import { Fragment, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import { Layout } from 'antd';

import { isAuthenticated } from './services/app-auth';

import Home from './home/home/home';
import AboutUs from './home/about-us/about-us';
import Login from './home/login/login';
import Register from './home/register/register';

import Navigation from './home/navigation/navigation';
import SiteFooter from './home/footer/footer';

const { Content } = Layout;

function App() {
	const [update, setUpdate] = useState(false);

	const auth = () => {
		setUpdate(!update);
	};

  	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<Navigation auth={auth} />
				<Layout className="site-layout">
					<Content style={{ margin: '0 16px' }}>
						<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/about-us" component={AboutUs} />
							{!isAuthenticated() ? (
								<Fragment>
									<Route path="/login" render={(props) => <Login auth={auth} {...props}/>} />
									<Route path="/register" component={Register} />
								</Fragment>
							) : null}
							<Redirect to='/home' />
						</Switch>
						</div>
					</Content>
					<SiteFooter />
				</Layout>
			</Layout> 
		</div>
  	);
}

export default App;
