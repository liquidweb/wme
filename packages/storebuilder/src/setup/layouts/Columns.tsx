import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { ColumnLinkList, ColumnLinkListInterface } from '@store/components';

export interface ColumnsInterface {
	id: string;
	type: 'columns';
	title?: string;
	intro?: string;
	columns: ColumnLinkListInterface[];
}

const Columns: FC<ColumnsInterface> = (props) => {
	const {
		title = '',
		intro = '',
		columns = [],
	} = props;

	return (
		<Grid container columnSpacing={ 6 } rowSpacing={ 4 }>
			{
				(title || intro) && (
					<Grid item xs={ 12 }>
						{ title && <Typography variant="h4" mb={ 1 }>{ title }</Typography> }
						{ intro && <Typography variant="body2">{ intro }</Typography> }
					</Grid>
				)
			}
			{
				columns && columns.map((column, index) => (
					<Grid key={ index } item xs={ 12 } sm={ 6 } md={ 4 }>
						{ column.title && (
							<Typography
								variant="h4"
								component="h3"
								mb={ 2 }
							>{ column.title }</Typography>
						) }
						<ColumnLinkList links={ column.links } />
					</Grid>
				))
			}
		</Grid>
	);
};

export default Columns;
