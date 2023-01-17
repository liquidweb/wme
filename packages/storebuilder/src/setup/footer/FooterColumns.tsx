import { Grid, Typography } from '@mui/material';
import { ColumnLinkList } from '@store/components';
import { useState } from 'react';

const FooterColumns = (props: SetupCardFooterRowColumns) => {
	const { gridColumns, columns } = props;
	const [colWidth] = useState(
		Math.round(
			((100 / gridColumns) / 100) * 12)
	);

	return (
		<Grid container spacing={ 6 }>
			{ columns.map((col, index) => (
				<Grid item xs={ colWidth } key={ index }>
					{ col.image && <img style={ { objectFit: 'cover' } } width="100%" src={ col.image } alt="footer thumbnail" /> }
					{ col.heading && <Typography variant="h3" sx={ { margin: '12px 0' } }>{ col.heading }</Typography> }
					{ col.paragraph && <Typography variant="body2">{ col.paragraph }</Typography> }
					{ col.list && <ColumnLinkList links={ col.list } /> }
				</Grid>
			)) }
		</Grid>
	);
};

export default FooterColumns;
