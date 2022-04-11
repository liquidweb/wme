import React from 'react';
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

interface SplitButtonProps {
  options: Array<string>;
  open: boolean,
  handleClose: any,
  handleClick: any,
  handleMenuItemClick: any,
  handleToggle: any,
  selectedIndex: number,
  anchorRef: any,
  ariaLabel: string,
}

// eslint-disable-next-line max-len
// const StyledToggleButtonGroup = styled(MuiToggleButtonGroup, {
//   shouldForwardProp: (props) => props !== 'numOfButtons',
//   name: 'WmeToggleButtonGroup',
//   slot: 'Root',
// })<ToggleButtonGroupProps>(({ theme }) => ({
//   '.MuiToggleButton-root': {
//     border: `1px solid ${theme.palette.text.primary}`,
//     color: theme.palette.text.primary,
//     textTransform: 'none',
//     padding: '6px 12px',
//     '&.Mui-selected': {
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.text.white,

//       '&:hover, &:focus': {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.text.white,
//       },
//     },
//   },
// }));

const StyledPopper = styled(Popper, {
  name: 'WmePopper',
  slot: 'Root',
})(() => ({
  marginLeft: '16px',
  marginTop: '54px',
}));

// eslint-disable-next-line max-len
const SplitButton: React.FC<SplitButtonProps> = (props) => {
  const {
    open,
    anchorRef,
    handleClose,
    options,
    selectedIndex,
    handleMenuItemClick,
    handleClick,
    handleToggle,
    ariaLabel,
  } = props;

  return (
    <>
      <ButtonGroup variant="contained">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          onClick={handleToggle}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label={ariaLabel}
          aria-haspopup="menu"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <StyledPopper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option:string, index:number) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </StyledPopper>
    </>
  );
};

export default SplitButton;
