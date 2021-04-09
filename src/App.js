import { Fragment, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Layout } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { isAuthenticated, AuthenticatedRoute } from './helpers/app-auth';

import Home from './home/home/home';
import AboutUs from './home/about-us/about-us';
import Login from './home/login/login';
import Register from './home/register/register';
import Settings from './home/settings/settings';

import Navigation from './home/navigation/navigation';
import SiteFooter from './home/footer/footer';

import Toastify from './shared/toastify/toastify';
import ErrorBoundary from './home/error-boundries/error-boundries';

const { Content } = Layout;

function App() {
	const [, setUpdate] = useState(false);

	const auth = () => {
		setUpdate(state => !state);
	};

  	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
					<Navigation auth={auth} />
					<Layout className="site-layout">
						<Content style={{ margin: '0 16px' }}>
							<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
								<ErrorBoundary>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route path="/about-us" component={AboutUs} />
										{!isAuthenticated() ? (
											<Fragment>
												<Route path="/login" render={(props) => <Login auth={auth} {...props}/>} />
												<Route path="/register" render={(props) => <Register auth={auth} {...props}/>} />
											</Fragment>
										) : (
											<Fragment>
												<AuthenticatedRoute path="/settings" component={Settings} />
											</Fragment>
										)}
										<Redirect to='/' />
									</Switch>	
								</ErrorBoundary>
							</div>
						</Content>
						<SiteFooter />
					</Layout>
				<Toastify />
			</Layout> 
		</div>
  	);
}

export default App;
