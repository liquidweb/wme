import React, { useState, useRef } from 'react';
import {
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import Button from '../button';

/**
 * All the logic for the dropdown is handled in the component, but the developer will need to
 * pass in a click handler and keep track of the selected index for when the button is clicked.
*/

interface SplitButtonProps {
  options: Array<string>;
  handleClick: () => void,
  handleIndexChange: (arg:number) => void,
  ariaLabelGroup: string,
  color: 'primary' | 'secondary',
  disabled: boolean,
  selectedIndex: number,
}

const StyledButtonGroup = styled(ButtonGroup, {
  name: 'WmeButtonGroup',
  slot: 'Root',
})(({ theme }) => ({
  '& .MuiButtonGroup-grouped': {
    '&:not(:last-of-type)': {
      borderColor: theme.palette.text.white,
    },
  },
}));

const StyledMenuItem = styled(MenuItem, {
  name: 'WmeMenuItem',
  slot: 'Root',
})(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.white,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.background.hover,
  },
}));

const StyledPaper = styled(Paper, {
  name: 'WmePaper',
  slot: 'Root',
})(() => ({
  borderRadius: 0,
  boxShadow: '0px 0px 32px 0px #0000001A;',
}));

const StyledList = styled(MenuList, {
  name: 'WmeMenuList',
  slot: 'Root',
})(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const SplitButton: React.FC<SplitButtonProps> = (props) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const {
    options,
    handleClick,
    ariaLabelGroup,
    selectedIndex,
    handleIndexChange,
    ...rest
  } = props;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current
      && anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    handleIndexChange(index);
    setOpen(false);
  };

  return (
    <>
      <StyledButtonGroup variant="contained" ref={anchorRef} aria-label={ariaLabelGroup} {...rest}>
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          onClick={handleToggle}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label={options[selectedIndex]}
          aria-haspopup="menu"
        >
          <ArrowDropDownIcon />
        </Button>
      </StyledButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <StyledPaper>
              <ClickAwayListener onClickAway={handleClose}>
                <StyledList id="split-button-menu" autoFocusItem>
                  {options.map((option:string, index:number) => (
                    <StyledMenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </StyledMenuItem>
                  ))}
                </StyledList>
              </ClickAwayListener>
            </StyledPaper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SplitButton;
