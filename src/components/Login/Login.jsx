import {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';
import AuthContext from '../store/authContext';
import classes from './Login.module.css';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (prevState, action) => {
	if (action.type === 'EMAIL_INPUT') {
		return {
			value: action.val,
			isValid: action.val.includes('@'),
		};
	}

	if (action.type === 'INPUT_BLUR') {
		return {
			value: prevState.value,
			isValid: prevState.value.includes('@'),
		};
	}

	return { value: '', isValid: false };
};

const pwdReducer = (prevState, action) => {
	if (action.type === 'PWD_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
		};
	}

	if (action.type === 'PWD_BLUR') {
		return {
			value: prevState.value,
			isValid: prevState.value.trim().length > 6,
		};
	}

	return { value: '', isValid: false };
};

const Login = () => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();

	const context = useContext(AuthContext);

	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(
		emailReducer,
		{ value: '', isValid: null }
	);

	const [pwdState, dispatchPwd] = useReducer(pwdReducer, {
		value: '',
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState;
	const { isValid: pwdIsValid } = pwdState;

	const emailInputRef = useRef();
	const pwdInputRef = useRef();

	useEffect(() => {
		const timerId = setTimeout(() => {
			console.log('Checking!');
			setFormIsValid(emailIsValid && pwdIsValid);
		}, 500);

		return () => {
			console.log('Clearing!');
			clearTimeout(timerId);
		};
	}, [emailIsValid, pwdIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({
			type: 'EMAIL_INPUT',
			val: event.target.value,
		});

		/*
		setFormIsValid(
			event.target.value.includes('@') &&
				pwdState.isValid
		);
		*/
	};

	const passwordChangeHandler = (event) => {
		dispatchPwd({
			type: 'PWD_INPUT',
			val: event.target.value,
		});
		/*
		setFormIsValid(
			emailState.isValid &&
				event.target.value.trim().length > 6
		);
		*/
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPwd({ type: 'PWD_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (formIsValid) {
			context.onLogin(
				emailState.value,
				pwdState.value
			);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			pwdInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>

				<Input
					ref={pwdInputRef}
					id="password"
					label="Password"
					type="password"
					isValid={pwdIsValid}
					value={pwdState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>

				<div className={classes.actions}>
					<Button
						type="submit"
						className={classes.btn}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
