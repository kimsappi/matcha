const validatePassword = (password) => {
	let strength = 0;
	let characterGroups = [
		/[A-Z]/,
		/[a-z]/,
		/[0-9]/,
		/[`~!@#$%^&*()-_=+\[\]\\\{\}\|;':",.\/<>\?]/
	];

	if (password.length > 7 && password.length)
		characterGroups.forEach((regex) => strength += regex.test(password));
	return strength > 2;
};

const validateUsername = (username) => {
	return username.length > 4 && username.length < 17 && [/^[A-Za-z0-9]$/].test(username);		
};

const validateEmail = (email) => {
	// RFC 2822
	const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return re.test(email);
};

const validateName = (name) => {
	const re = /^([A-Za-z\-]){2,}$/;
	return re.test(name);
};

const validateUserData = (user) => {
	let userIsValid = true;

	if (user.password) {
		if (!validatePassword(user.password))
			userIsValid = false;
	}
	if (user.username) {
		if (!validateUsername(user.username))
			userIsValid = false;
	}
	if (user.email) {
		if (!validateEmail(user.email))
			userIsValid = false;
	}
	if (user.firstName) {
		if (!validateName(user.firstName))
			userIsValid = false;
	}
	if (user.lastName) {
		if (!validateName(user.lastName))
			userIsValid = false;
	}
};

module.exports = {
	validatePassword: validatePassword,
	validateUsername: validateUsername,
	validateEmail: validateEmail,
	validateName = validateName,
	validateUserData = validateUserData
};
