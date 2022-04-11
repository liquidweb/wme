import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FileUpload } from '..';
import fileUploadImage from '../../stories/images/file-upload.png';

export default {
  title: 'Input/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component: 'Users are able to upload various file types.',
      },
    },
  },
  argTypes: {
    handleUploadedFile: { action: 'handleUploadedFile' },
  },
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args:any) => {
  const [showSelectedFileActions, setShowSelectedFileActions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(true);

  const handleFileActions = () => {
    setShowSelectedFileActions(!showSelectedFileActions);
  };

  const handleDeleteFile = () => {
    handleFileActions();
    setSelectedFile(false);
  };

  return (
    <FileUpload
      handleFileActions={handleFileActions}
      showSelectedFileActions={showSelectedFileActions}
      handleDeleteFile={handleDeleteFile}
      selectedFile={selectedFile}
      {...args}
    />
  );
};

const commonArgs = {
  label: 'Upload Your Sigil',
  helperText: 'The Doors of Durin, also known as the West-gate, the West-door of Moria, or Elven Door, were built into the Walls of Moria in the dark cliffs.',
  buttonText: 'Add File',
  error: false,
  errorMessage: 'We couldn’t upload your file. Please try again.',
};

export const FileUploadBase: ComponentStory<typeof FileUpload> = Template.bind({});
FileUploadBase.args = {
  ...commonArgs,
  subText: '20MB max',
  selectedFile: false,
};

export const ImageUploaded: ComponentStory<typeof FileUpload> = Template.bind({});
ImageUploaded.args = {
  ...commonArgs,
  image: fileUploadImage,
};

export const FileUploaded: ComponentStory<typeof FileUpload> = Template.bind({});
FileUploaded.args = {
  ...commonArgs,
  file: 'your-file.doc',
};

export const UploadError: ComponentStory<typeof FileUpload> = Template.bind({});
UploadError.args = {
  ...commonArgs,
  error: true,
};
