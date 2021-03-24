import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import { Layout } from 'antd';

import Home from './home/home/home';
import AboutUs from './home/about-us/about-us';
import Login from './home/login/login';
import Register from './home/register/register';

import Navigation from './shared/navigation/navigation';
import SiteFooter from './home/footer/footer';

const { Content } = Layout;

function App() {
  	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<Navigation />
				<Layout className="site-layout">
					<Content style={{ margin: '0 16px' }}>
						<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/about-us" component={AboutUs} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
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
