import { useState } from "react";
import {
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};
const testFields = ["email", "password"];

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);
			resetFormFields();
		} catch (err) {
			switch (err.code) {
				case "auth/wrong-password":
					alert("Email or Password is incorrect");
					break;
				case "auth/user-not-found":
					alert("This email does not exist");
					break;
				default:
					console.log(err);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				{testFields.map((field) => {
					return (
						<FormInput
							key={field}
							label={field}
							type={field}
							required
							onChange={handleChange}
							name={field}
							value={formFields[field]}
						/>
					);
				})}
				<div className="buttons-container">
					<Button type="submit">Sign in</Button>
					<Button type="button" onClick={signInWithGoogle} buttonType="google">
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
