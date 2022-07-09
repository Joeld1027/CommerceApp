import { useState } from "react";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};
const testFields = ["displayName", "email", "password", "confirmPassword"];

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("passwords dont match");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				alert("Cannot create user. Email already in use.");
			}
			console.log(err, "Something went wrong while creating user");
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				{testFields.map((field) => {
					return (
						<FormInput
							key={field}
							label={
								field === "confirmPassword"
									? "CONFIRM PASSWORD"
									: field.toUpperCase()
							}
							type={field === "confirmPassword" ? "password" : field}
							required
							onChange={handleChange}
							name={field}
							value={formFields[field]}
						/>
					);
				})}
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
