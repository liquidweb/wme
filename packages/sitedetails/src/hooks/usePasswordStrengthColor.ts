export function UsePasswordStrengthColor(passwordStrength: PasswordStrengthTypes) {
	switch (passwordStrength) {
	case 'weak':
		return 'error';
	case 'medium':
		return 'warning';
	case 'strong':
		return 'success';
	default:
		return undefined;
	}
}
