export const beforeUnloadListener = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign
  event.returnValue = 'Changes you made may not be saved.';
  return event;
};
