# WME Framework

## Overview
WME contains all the components needed to build an easy-to-use UI. Although it was intially
designed to work in the WordPress admin, it can be utilizied anywhere. It does not depend on 
WordPress in any way.

WME is built in React and TypeScript. The framework relies heavily on Material UI.

Most of the components in WME are either extending MUI or creating wrappers
to more easily build more complex components, such as a File Upload or a Wizard.

MUI is a dependency and can be used in conjuction with WME if needed. However, you don't have to
use MUI independently at all if you don't want. WME should come with everything you need.

## Documentation
Each individual component is in StoryBook and should have its own documentation. Use the
`Canvas` tab to see a playground of the component, and then the `Docs` tab to see detailed
documentation for each component as well as an arguments table.

## Installation
Grab the latest version from [NPM](https://www.npmjs.com/package/@moderntribe/wme) and then you import components as needed, just like any
other design framework. 

`npm i @moderntribe/wme`

**Example:**
```
import React from 'react';
import { Button, SetupCardTask } from '@wme/components';
import TaskIcon from '../img/task-icon.png';

const MyComponent = () => {

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event);
  };

  <div className="my-component">
    <h1>Here's a primary button</h1>
    <Button variant="primary" color="primary">
      Click Me:
    </Button>

    <h2>Here's a Setup Card Task<h2>
    <SetupCardTask
      title="Example task"
      variant="task"
      intro="Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
      taskCta="Go to task"
      avatarProps={
        src: {TaskIcon}
      }
      onClick={handleClick}
    />

  <div>
};

export default MyComponent;
```
