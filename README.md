# WME Framework

## Overview
WME contains all the components needed to build an easy-to-use UI. Although it was intially
designed to work in the WordPress admin, it can be utilizied anywhere. It does not depend on 
WordPress in any way.

WME is built in React and TypeScript. The framework relies heavily on Material UI.

Most of the components in WME are either extending MUI or creating wrappers
to more easily build more complex components, such as a File Upload or a Wizard.

## Documentation
Each individual component is in StoryBook and should have its own documentation. Use the
`Canvas` tab to see a playground of the component, and then the `Docs` tab to see detailed
documentation for each component as well as an arguments table.

## Installation
Install latest version from [NPM](https://www.npmjs.com/package/@moderntribe/wme).

`npm i @moderntribe/wme`

**Example:**
```
import React from 'react';
import { Button, SetupCardTask } from '@moderntribe/wme';
import TaskIcon from '../img/task-icon.png';

const MyComponent = () => {

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event);
  };

  <div className="my-component">
    <h1>Here's a primary button</h1>
    <Button variant="contained" color="primary">
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
