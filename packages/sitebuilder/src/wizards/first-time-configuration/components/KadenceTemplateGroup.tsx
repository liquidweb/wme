import type React from 'react';
import { styled, Box, BoxProps } from '@mui/material';

const TemplateGroupContainer = styled(Box, {
	name: 'WmeTemplateGroup',
	slot: 'Root',
})<BoxProps>(({ theme }) => ({
	display: 'grid',
	gap: theme.spacing(6),
	gridTemplateColumns: '1fr 1fr',
	paddingBottom: '48px',
	[ theme.breakpoints.up('sm') ]: {
		gridTemplateColumns: '1fr 1fr',
	},
}));

export default function KadenceTemplateGroup(props: BoxProps) {
	return <TemplateGroupContainer { ...props } />;
}
