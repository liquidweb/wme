import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Close } from '@mui/icons-material';

import {
  Button,
  Wizard,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '..';

import Logo from './img/wme-lorem-logo.svg';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Wizard',
  component: Wizard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    open: {
      defaultValue: true,
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Wizard>;

const Template: ComponentStory<typeof Wizard> = (args) => {
  const [wizardOpen, setWizardOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setWizardOpen(true)}
      >
        Open Wizard
      </Button>
      <Wizard {...args} open={wizardOpen}>
        <WizardHeader
          src={Logo}
          alt="WME Lorem Logo"
          button={(
            <Button
              variant="text"
              onClick={() => setWizardOpen(false)}
              endIcon={<Close />}
            >
              Close
            </Button>
          )}
        />
        <WizardContent>
          I am wizard content.
        </WizardContent>
        <WizardFooter>
          I am the wizard footer.
        </WizardFooter>
      </Wizard>
    </>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const WizardBasic = Template.bind({});
WizardBasic.args = {
  open: false,
};
