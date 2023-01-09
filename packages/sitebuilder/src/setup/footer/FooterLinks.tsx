import { Grid, Link, Typography } from '@mui/material';

const FooterLinks = (props: SetupCardFooterRowLinks) => {
	const { title, links } = props;

	return (
		<Grid container spacing={ 2 } sx={ { alignItems: 'center' } }>
			<Grid item>
				<Typography fontWeight={ 600 } variant="body1">{ title }</Typography>
			</Grid>
			{ links.map((link) => (
				<Grid item key={ link.href }>
					<Link href={ link.href } target={ link.target ? link.target : '__self' } variant="body1">
						{ link.label }
					</Link>
				</Grid>
			)) }
		</Grid>
	);
};

export default FooterLinks;
