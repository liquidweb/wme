import React from 'react';
import { ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof FileUpload>;

export const FileUploadBase = (args:any) => (
  <FileUpload {...args} />
);

const commonArgs = {
  label: 'Upload Your Sigil',
  helperText: 'The Doors of Durin, also known as the West-gate, the West-door of Moria, or Elven Door, were built into the Walls of Moria in the dark cliffs.',
  buttonText: 'Add File',
};

FileUploadBase.args = {
  subText: '20MB max',
  ...commonArgs,
};

export const ImageUploaded = (args:any) => (
  <FileUpload {...args} />
);

ImageUploaded.args = {
  selectedFile: true,
  image: fileUploadImage,
  ...commonArgs,
};

export const FileUploaded = (args:any) => (
  <FileUpload {...args} />
);

FileUploaded.args = {
  selectedFile: true,
  file: 'your-file.doc',
  ...commonArgs,
};
