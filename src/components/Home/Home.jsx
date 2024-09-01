import { useContext } from 'react';
import AuthContext from '../store/authContext';
import classes from './Home.module.css';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

const Home = () => {
	const context = useContext(AuthContext);

	return (
		<Card className={classes.home}>
			<h1>Welcome back!</h1>
			<Button onClick={context.onLogout}>
				Logout
			</Button>
		</Card>
	);
};

export default Home;
