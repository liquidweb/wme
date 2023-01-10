import { useState, useEffect } from 'react';
import {
	Button,
	Form,
	FormField,
	TextInput,
	WizardSidebar
} from '@moderntribe/wme-ui';
import {
	Box,
	Chip, Grid,
	IconButton,
	InputAdornment,
	Link,
	Stack
} from '@mui/material';
import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';
import { UserIcon } from '@sb/icons';
import { __ } from '@wordpress/i18n';

import { useFirstTimeConfiguration, useUsernameValidation } from '@sb/hooks';
import { copyToClipboard, getPasswordStrength, generateNewPassword } from '@sb/utils';

import ScreenWrapper from '@ftc/ScreenWrapper';
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
		<Grid container sx={ { position: 'absolute', inset: 0, width: 'auto' } }>
			<Grid item xs={ 2.5 } sx={ {
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				zIndex: 2
			} }>
				<WizardSidebar
					heading={ usernamePassword.title }
					body={ usernamePassword.description }
					icon={ <UserIcon /> }
				/>
			</Grid>
			<Grid
				item
				xs={ 9.5 }
				sx={ {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				} }>
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
								helperText={
									! completed || createNewPassword
										? usernamePassword.passwordHelperText
										: undefined
								}
								label={
									! completed
										? usernamePassword.passwordLabelTextFirst
										: 'Password'
								}
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
			</Grid>
		</Grid>
	);
};

export default UsernamePassword;
