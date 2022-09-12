import React, { useState, useEffect } from 'react';
import { IconButton, Alert } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Add, DeleteOutline } from '@mui/icons-material';
import { FileUpload as WmeFileUpload } from '@stellarwp/wme-ui';
// eslint-disable-next-line camelcase
import { WP_REST_API_Attachment } from 'wp-types';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { uploadImage } from '@sb/utils';
import { FtcStringData } from '@ftc/data/constants';

const { siteDetails } = FtcStringData;

export interface FileUploadInterface {
	buttonId: string;
	buttonText: string;
	fileSizeWarning: string;
	onSetFile: (responseId: string) => void;
}

const FileUpload: React.FC<FileUploadInterface> = (props) => {
	const { buttonId, buttonText, fileSizeWarning, onSetFile } = props;

	const { ftcState, setIsLoading, setLogoValue } =
		useFirstTimeConfiguration();
	const {
		previewLogo: { url },
		site: { logo },
		form: { logoId }
	} = ftcState;

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [showSelectedFileActions, setShowSelectedFileActions] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const previousPreviewUrl = logo.url;

	useEffect(() => {
		setPreview(logoId.touched ? url : previousPreviewUrl);
	}, []);

	useEffect(() => {
		let fileReader: FileReader | null = null;
		let isCancel: boolean = false;

		if (! selectedFile && ! url) {
			onSetFile('');
			setPreview(null);
			return;
		}

		if (selectedFile) {
			fileReader = new FileReader();
			fileReader.onload = () => {
				const result = fileReader?.result;

				if (typeof result === 'string' && ! isCancel) {
					setPreview(result);
				}
			};

			fileReader.readAsDataURL(selectedFile);

			setError('');
			setIsLoading(true);

			uploadImage(selectedFile)
				// eslint-disable-next-line camelcase
				.then((response: WP_REST_API_Attachment) => {
					if (response.id) {
						onSetFile(String(response.id));
						setLogoValue(String(response.id), response.source_url);
					}
					setIsLoading(false);
				})
				.catch((err: JQueryXHR) => {
					const errorMessage = err?.responseJSON?.message;
					setError(
						errorMessage ? errorMessage : siteDetails.defaultError
					);
					handleDeleteFile();
					setShowSelectedFileActions(false); // Set back to false so new image can be uploaded.
					setIsLoading(false);
				});
		}

		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [selectedFile]);

	const handleFileData = (files: FileList | null) => {
		if (files && files.length) {
			setSelectedFile(files[ 0 ]);
		}
	};

	const handleFileActions = () => {
		setShowSelectedFileActions(! showSelectedFileActions);
	};

	const handleDeleteFile = () => {
		setSelectedFile(null);
		handleFileActions();
		onSetFile('');
		setLogoValue('', '');
		setPreview(null);
	};

	return (
		<WmeFileUpload
			alert={
				error ? (
					<Alert severity="error" sx={ { mb: '10px' } }>
						{ error }
					</Alert>
				) : undefined
			}
			headerProps={ {
				button: (
					<IconButton
						aria-label="delete"
						color="error"
						onClick={ handleFileActions }
						size="small"
						sx={ {
							backgroundColor: 'error.main',
							color: '#fff',
							p: '2px',
							position: 'absolute',
							right: '-12px',
							top: '-12px',
							'&:hover': {
								backgroundColor: 'error.dark'
							},
							'& svg': {
								fontSize: 20
							}
						} }
					>
						<DeleteOutline />
					</IconButton>
				),
				sx: {
					position: 'relative'
				}
			} }
			previewProps={ {
				imagePath: typeof preview === 'string' ? preview : '',
				imageAlt: siteDetails.uploadedFileAltText
			} }
			removeProps={ {
				buttonText: siteDetails.removeButtonText,
				cancelText: siteDetails.cancelButtonText,
				onCancel: handleFileActions,
				onRemove: handleDeleteFile
			} }
			selectProps={ {
				buttonText,
				buttonProps: {
					size: 'large',
					startIcon: <Add />,
					variant: 'contained'
				},
				helperText: fileSizeWarning,
				inputProps: {
					accept: 'image/*',
					id: buttonId,
					multiple: false,
					onChange: (e) =>
						handleFileData((e.target as HTMLInputElement).files),
					sx: visuallyHidden
				}
			} }
			showActions={ showSelectedFileActions }
			sx={ {
				'& img': {
					display: 'block',
					margin: '16px auto',
					maxHeight: '60px'
				}
			} }
			uploaded={ Boolean(selectedFile) || Boolean(preview) }
		/>
	);
};

export default FileUpload;
