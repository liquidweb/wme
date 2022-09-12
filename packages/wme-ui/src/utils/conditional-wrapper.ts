import type React from 'react';

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: any;
  children?: React.ReactNode;
}

export const ConditionalWrapper = (props: ConditionalWrapperProps) => {
  const { condition, wrapper, children } = props;
  return (condition ? wrapper(children) : children);
};
