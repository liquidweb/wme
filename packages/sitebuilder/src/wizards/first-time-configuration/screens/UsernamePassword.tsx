import { useState, useEffect } from 'react';
import {
	Button,
	Form,
	FormField,
	TextInput
} from '@moderntribe/wme-ui';
import {
	Box,
	Chip,
	IconButton,
	InputAdornment,
	Link,
	Stack
} from '@mui/material';
import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';
import { __ } from '@wordpress/i18n';

import { useFirstTimeConfiguration, useUsernameValidation } from '@sb/hooks';
import { copyToClipboard, getPasswordStrength, generateNewPassword } from '@sb/utils';

import ScreenWrapper from '@sb/wizards/first-time-configuration/components/ScreenWrapper';
import { FtcStringData } from '@ftc/data/constants';

const { usernamePassword } = FtcStringData;

export interface PasswordStatusChildObjectInterface {
	label: string;
	sx: {
		backgroundColor: string;
	};
}

export interface PasswordStatusObjectInterface {
	weak: PasswordStatusChildObjectInterface;
	medium: PasswordStatusChildObjectInterface;
	strong: PasswordStatusChildObjectInterface;
}

const passwordStatus: PasswordStatusObjectInterface = {
	weak: {
		label: usernamePassword.passwordStatus.weak,
		sx: {
			backgroundColor: 'error.main'
		}
	},
	medium: {
		label: usernamePassword.passwordStatus.medium,
		sx: {
			backgroundColor: 'warning.main'
		}
	},
	strong: {
		label: usernamePassword.passwordStatus.strong,
		sx: {
			backgroundColor: 'success.main'
		}
	}
};

const UsernamePassword = () => {
	const {
		ftcState,
		setFormValue,
		validateUsernamePassword,
		resetFormValue,
		setIsLoading
	} = useFirstTimeConfiguration();

	const { validateUsername, usernamePermitted, usernameMessage } =
		useUsernameValidation();

	const { completed, adminUrl } = ftcState;

	const [usernameChanged, setUsernameChanged] = useState(false);
	const [createNewPassword, setCreateNewPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState<
		keyof PasswordStatusObjectInterface | ''
	>('');
	const [showPassword, setShowPassword] = useState(false);

	const username = ftcState.form.username.value;
	const password = ftcState.form.password.value;

	useEffect(() => {
		// Don't validate username if FTC has already been completed.
		if (completed) {
			return;
		}

		// Don't validate username if username hasn't changed.
		if (! completed && ! usernameChanged) {
			return;
		}

		if (! completed) {
			setIsLoading(true);
		}

		const timeoutId = setTimeout(() => {
			validateUsername(username);
		}, 250);

		return () => clearTimeout(timeoutId);
	}, [username]);

	useEffect(() => {
		if (createNewPassword) {
			(async () => {
				const newPassword = await generateNewPassword();
				if (typeof newPassword === 'string') {
					const strength = getPasswordStrength(newPassword);
					setPasswordStrength(strength);
					setFormValue('password', newPassword);
				}
			})();
		} else {
			resetFormValue('password');
		}
	}, [createNewPassword]);

	useEffect(() => {
		const passwordCriteria = ! completed
			? password?.length >= 6
			: password?.length >= 6 || ! generateNewPassword;
		validateUsernamePassword(usernamePermitted, passwordCriteria);
	}, [usernamePermitted, password, generateNewPassword]);

	const handleUsernameChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setUsernameChanged(true);
		setFormValue('username', event.target.value);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const strength = getPasswordStrength(event.target.value);

		setPasswordStrength(strength);
		setFormValue('password', event.target.value);
	};

	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<Form>
				<Stack spacing={ 3 }>
					<FormField
						field={
							<TextInput
								defaultValue={ adminUrl }
								disabled
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label={ __(
												'copy to clipboard',
												'moderntribe-sitebuilder'
											) }
											onClick={ () =>
												copyToClipboard(adminUrl)
											}
											sx={ {
												marginRight: '-12px',
												opacity: '0.5'
											} }
										>
											<ContentCopy />
										</IconButton>
									</InputAdornment>
								}
								fullWidth
								required
							/>
						}
						helperText={
							<>
								{ usernamePassword.loginUrlHelperText }{ ' ' }
								<Link
									href={ usernamePassword.loginUrlHelperLink }
								>
									{ usernamePassword.loginUrlHelperLink }
								</Link>
							</>
						}
						label={ usernamePassword.loginUrlLabelText }
					/>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ (e) => setFormValue('siteName', e.target.value) }
								placeholder={ usernamePassword.siteNameLabelText }
								required
								value={ ftcState.form.siteName.value }
							/>
						}
						label={ usernamePassword.siteNameLabelText }
					/>
					<FormField
						error={ ! usernamePermitted }
						field={
							<TextInput
								disabled={ completed }
								fullWidth
								onChange={ handleUsernameChange }
								placeholder={
									usernamePassword.usernamePlaceholderText
								}
								required
								value={
									! completed && ! usernameChanged
										? ''
										: username
								}
							/>
						}
						errorMessage={
							! usernamePermitted ? usernameMessage : undefined
						}
						label={
							! completed
								? usernamePassword.usernameLabelTextFirst
								: usernamePassword.usernameLabelText
						}
					/>
					<FormField
						field={
							(! completed || createNewPassword) && (
								<TextInput
									endAdornment={
										<InputAdornment position="end">
											{ passwordStrength &&
												password.length > 0 && (
												<Chip
													label={
														passwordStatus[
															passwordStrength
														].label
													}
													size="small"
													sx={ {
														color: 'white',
														...passwordStatus[
															passwordStrength
														].sx
													} }
												/>
											) }
											<IconButton
												aria-label="toggle password visibility"
												edge="end"
												onClick={ () =>
													setShowPassword(
														! showPassword
													)
												}
												onMouseDown={
													handleMouseDownPassword
												}
											>
												{ showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												) }
											</IconButton>
										</InputAdornment>
									}
									fullWidth
									onChange={ handlePasswordChange }
									placeholder={
										usernamePassword.passwordPlaceholderText
									}
									type={ showPassword ? 'text' : 'password' }
									value={ password }
								/>
							)
						}
						label={ usernamePassword.passwordLabelTextFirst }
					>
						{ completed && createNewPassword && (
							<Button
								onClick={ () => setCreateNewPassword(false) }
								sx={ {
									mt: 2,
									width: '100%'
								} }
								variant="outlined"
							>
								{ usernamePassword.cancelNewPasswordText }
							</Button>
						) }
						{ completed && ! createNewPassword && (
							<Box>
								<Button
									onClick={ () => setCreateNewPassword(true) }
									sx={ {
										width: '100%'
									} }
									variant="outlined"
								>
									{ usernamePassword.setNewPasswordText }
								</Button>
							</Box>
						) }
					</FormField>
				</Stack>
			</Form>
		</ScreenWrapper>
	);
};

export default UsernamePassword;
