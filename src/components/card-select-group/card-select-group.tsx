import React from 'react';
import { Theme } from '@mui/material/styles/createTheme';
import { ResponsiveStyleValue } from '@mui/system';
import { GridSpacing } from '@mui/material/Grid';
import { styled, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

interface CardSelectGroupProps extends ToggleButtonGroupProps {
  cardPadding?: 'sm' | 'md';
  cardSpacing?: ResponsiveStyleValue<GridSpacing>;
  cardColumns?: ResponsiveStyleValue<number>;
}

export function resolveColumnCount(cardColumns: any, theme: Theme) {
  if (cardColumns.length === 0) {
    return {};
  }

  if (typeof cardColumns === 'number') {
    return { gridTemplateColumns: `repeat(${cardColumns}, 1fr)` };
  }

  const breakpointColumns = theme?.breakpoints?.keys.map((key) => {
    if (key in cardColumns && typeof cardColumns[key] === 'number') {
      return {
        [theme.breakpoints.up(key)]: { gridTemplateColumns: `repeat(${cardColumns[key]}, 1fr)` },
      };
    }
    return null;
  });

  return Object.assign(
    {},
    ...breakpointColumns.filter((breakpoint) => breakpoint && typeof breakpoint === 'object'),
  );
}

const StyleCardSelectGroup = styled(ToggleButtonGroup, {
  name: 'WmeCardSelectGroup',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'cardPadding' && prop !== 'cardSpacing' && prop !== 'cardColumns',
})<CardSelectGroupProps>(({
  orientation = 'horizontal',
  theme,
  cardSpacing = 2,
  cardPadding = 'sm',
  cardColumns = 1,
}) => ({
  display: 'grid',
  gap: theme.spacing(Number(cardSpacing)),
  '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: 0,
  },
  '& .MuiToggleButtonGroup-groupedHorizontal': {
    flexDirection: 'column',
  },
  '& .WmeCardSelectItem-footer': {
    textAlign: 'center',
  },
  '& .MuiButtonBase-root.WmeCardSelectItem-root + .MuiButtonBase-root.WmeCardSelectItem-root.Mui-selected': {
    borderColor: theme.palette.primary.light,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  ...resolveColumnCount(cardColumns, theme),
  ...(orientation === 'vertical' && {
    gridTemplateColumns: '1',
    '& .WmeCardSelectItem-icon': {
      marginRight: theme.spacing(2),
    },
    '& .MuiToggleButtonGroup-grouped': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .WmeCardSelectItem-contentInner': {
      textAlign: 'left',
    },
    '& .WmeCardSelectItem-footer': {
      textAlign: 'left',
    },
    '& .WmeCardSelectItem-completeContainer': {
      top: '50%',
      transform: 'translateY(-50%)',
    }
  }),
  '& .WmeCardSelectItem-root': {
    padding: cardPadding === 'md' ? theme.spacing(4) : theme.spacing(2),
  },
}));

export default function CardSelectGroup(props: CardSelectGroupProps) {
  return (
    <StyleCardSelectGroup className="WmeCardSelectGroup-root" {...props} />
  );
}
