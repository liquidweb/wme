# WME Framework

## Overview

WME contains all the components needed to build an easy-to-use UI. Although it was intially
designed to work in the WordPress admin, it can be utilizied anywhere. It does not depend on
WordPress in any way.

WME is built in React and TypeScript. The framework relies heavily on Material UI.

The WME components are either styled MUI components (such as a `Button`) or wrappers designed to easily build complex components, such as `FileUpload`.

## Documentation

Each individual component is showcased in the <a href="https://main--623a01cac28a2f003a843c20.chromatic.com/" target="_blank">WME StoryBook</a> and should have its own documentation. Use the `Canvas` tab to see a playground of the component, and then the `Docs` tab to see detailed
documentation for each component as well as an arguments table.

The framework also contains `Wizard` components, which are building blocks for fullscreen wizards such as set up screens, plugin configuration, etc.

To create a new wizard, use the `Wizard` component:

```
<Wizard {...wizardProps}>
  <WizardSectionTitle
    heading="Wizard Content"
    copy={copyText}
    iconSrc={welcomeImage}
    iconAlt="icon alt text"
    iconWidth={75}
  />
  <Box>
    <h3>An example of wizard content</h3>
    <Typography>Inside the wizard, add your content. You can use both MUI and WME components</Typography>
    <Typography>For example, you can build a form using WME components</Typography>
    <Form>
      <FormFieldControl>
        <FormField
          field={<TextInput />}
          label="Text Field"
        />
      <FormFieldControl>
    </Form>
  </Box>
  <WizardFooter {...footerProps} />
</Wizard>
```

WME components are designed to be used at a granular level if needed. For example, you can use _just_ the `FormFieldLabel` component if you need a styled label, but if you want an entire input field, you could use `FormField` like in the example above, which encompasses all the parts necessary for a complete form field.

All components come pre-styled based on the WME design, but can be tweaked using the <a href="https://mui.com/system/the-sx-prop/" target="_blank">MUI `sx` prop</a> on an individual basis, or by using the <a href="https://mui.com/material-ui/customization/theme-components/" target="_blank">MUI global styleOverrides</a> on a global site level.

## Installation

Install latest version from [NPM](https://www.npmjs.com/package/@moderntribe/wme-ui).

`npm i @moderntribe/wme-ui`

**Example:**

```
import type React from 'react';
import { Button, SetupCardTask } from '@moderntribe/wme-ui';
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
