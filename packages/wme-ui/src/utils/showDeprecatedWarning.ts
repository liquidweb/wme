export const showDeprecatedWarning = (propsObj: Record<string, any>, component: string) => {
  const usedProps: string[] = Object.keys(propsObj).filter((key) => propsObj[key]);

  if (usedProps.length > 0) {
    console.error(`WME Error: You are using a deprecated prop for the ${component}: ${usedProps.join(',')}`);
  }
};
