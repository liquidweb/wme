export function getPasswordStrength(password: string) {
	if (password.length && password.length <= 6) {
		return 'weak';
	}

	const strength = window.wp.passwordStrength.meter(password, [], password);

	switch (strength) {
	case 1:
	case 2:
		return { label: 'weak', color: 'error' };
	case 3:
		return { label: 'medium', color: 'warning' };
	case 4:
		return { label: 'strong', color: 'success' };
	default:
		return { label: 'weak', color: 'error' };
	}
}
