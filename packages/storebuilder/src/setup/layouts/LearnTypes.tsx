import { useState } from 'react';
import { Typography, Grid, Box, Link } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { VideoEmbed } from '@moderntribe/wme-ui';
import { SimpleModal, VideoLink } from '@store/components';
import { pxToRem } from '@moderntribe/wme-utils';
import { IMAGE_DIR } from '@store/constants';

const listSx = {
	m: 0,
	lineHeight: '20px',
	letterSpacing: '-0.01em',

	'& li': {
		display: 'inline',
	},

	'& li:before': {
		content: '", "',
	},

	'& li:first-of-type:before': {
		content: 'normal',
	}
};

const linkSx = {
	color: 'text.link',
	textDecoration: 'none',

	'&:hover': {
		color: 'text.link',
		cursor: 'pointer',
		textDecoration: 'underline',
	}
};

const smallLinkSx = Object.assign(
	{},
	linkSx,
	{
		fontSize: pxToRem(10),
		lineHeight: '16px'
	}
);

const LearnTypes: React.FC<SetupRowLearnInterface> = (props) => {
	const { title, overline, headline, videoData, wp101, exampleProducts } = props;

	const hasExampleProducts = exampleProducts && exampleProducts.products?.length > 0;

	const [modalOpen, setModalOpen] = useState(false);

	return <>
		<Grid container columnSpacing={ 6 } rowSpacing={ 0 } mt={ 3 }>
			<Grid item xs={ 12 }>
				{ title && <Typography variant="h4" component="h3" mb={ 2 }>{ title }</Typography> }
			</Grid>
			<Grid item xs={ 12 } sm={ 6 }>
				<Link
					component="button"
					aria-haspopup="dialog"
					onClick={ () => setModalOpen(true) }
					aria-label={ videoData.ariaLabel }
					sx={ {
						position: 'relative',
						display: 'block',
					} }
				>
					<Box
						component="img"
						sx={ {
							display: 'block',
							height: 'auto',
							width: '100%',
							borderRadius: 1,
							aspectRatio: '2 / 1',
							backgroundColor: 'grey.200',
						} }
						src={ `${ IMAGE_DIR }${ videoData.placeholderImage }` }
						alt={ headline }
						loading="lazy"
					/>
					<Box sx={ {
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					} }>
						<Box sx={ {
							borderRadius: 14,
							backgroundColor: 'text.primary',
							width: '28px',
							height: '28px',
							color: '#FFFFFF',
							fontSize: '12px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						} }>
							<PlayArrow sx={ { color: '#FFFFFF', fontSize: '1.1rem' } } />
						</Box>
					</Box>
				</Link>
			</Grid>
			<Grid item xs={ 12 } sm={ 6 }>
				<Typography
					variant="overline"
					mb={ 1 }
					sx={ { lineHeight: 1, fontSize: pxToRem(10) } }
				>{ overline }</Typography>
				<Typography
					variant="h3"
					mb={ 1 }
				>
					<Link
						underline="hover"
						sx={
							Object.assign(
								{},
								linkSx,
								{
									color: 'text.primary',
									'&:hover': {
										color: 'text.link',
										cursor: 'pointer',
										textDecoration: 'none'
									}
								}
							)
						}
						onClick={ () => setModalOpen(true) }
					>{ headline }</Link>
				</Typography>
				<Grid container spacing={ 2 }>
					{ wp101 && <Grid item xs={ 12 } sm={ hasExampleProducts ? 6 : 12 } sx={ { lineHeight: 2 } }>
						<Typography
							component="p"
							sx={ {
								letterSpacing: '-0.01em',
								lineHeight: '16px',
								fontSize: pxToRem(10),
								fontWeight: 600,
								marginBottom: '4px'
							} }
						>{ wp101.header }</Typography>
						<Box component="ul" sx={ listSx }>
							{
								wp101.links.map((link, index) => (
									<Box key={ index } component="li">
										<VideoLink sx={ smallLinkSx } { ... link } />
									</Box>
								))
							}
						</Box>
					</Grid> }
					{ hasExampleProducts && exampleProducts.products?.length > 0 && <Grid item xs={ 6 }>
						<Typography
							component="p"
							sx={ {
								letterSpacing: '-0.01em',
								lineHeight: '16px',
								fontSize: pxToRem(10),
								fontWeight: 600,
								marginBottom: '4px'
							} }
						>{ exampleProducts.title }</Typography>
						<Box component="ul" sx={ listSx }>
							{ exampleProducts.products.map((link, index) => (
								<Box key={ index } component="li">
									<Link
										underline="hover"
										href={ link.url }
										sx={ smallLinkSx }
									>{ link.title }</Link>
								</Box>
							)) }
						</Box>
					</Grid>
					}
				</Grid>
			</Grid>
		</Grid>
		<SimpleModal
			open={ modalOpen }
			onClose={ () => setModalOpen(false) }
		>
			<VideoEmbed src={ videoData.src } />
			<Box mt={ 4 } width="100%">
				<Typography variant="h4" mb={ 2 }>{ headline }</Typography>
				<Typography variant="body2">{ videoData.description }</Typography>
			</Box>
		</SimpleModal>
	</>;
};

export default LearnTypes;
