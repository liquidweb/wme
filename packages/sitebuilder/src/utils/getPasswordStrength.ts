export function getPasswordStrength(password: string) {
	if (password.length && password.length <= 6) {
		return 'weak';
	}

	const strength = window.wp.passwordStrength.meter(password, [], password);

	switch (strength) {
	case 1:
	case 2:
		return 'weak';
	case 3:
		return 'medium';
	case 4:
		return 'strong';
	default:
		return 'weak';
	}
}
