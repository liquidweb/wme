/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navigation } from '..';
import NavNumber from '../nav-number';

export default {
  title: 'Navigation/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const screens = [
  {
    text: 'Screen 1',
    active: false,
    completed: true,
  },
  {
    text: 'Screen 2',
    active: true,
    completed: false,
  },
  {
    text: 'Screen 3',
    active: false,
    completed: false,
  },
  {
    text: 'Screen 4',
    active: false,
    completed: false,
  },
];

const Template: ComponentStory<typeof Navigation> = (args:any) => {
  const [active, setActive] = useState(0);

  return (
    <Navigation {...args}>
      {
        screens.map((screen, i) => (
          <NavNumber
            number={i + 1}
            text={screen.text}
            onClick={() => setActive(i)}
            active={active === i}
            key={i}
            isComplete={screen.completed}
          />
        ))
      }
    </Navigation>
  );
};

export const Default = Template.bind({});
Default.args = {
  width: '500',
};
