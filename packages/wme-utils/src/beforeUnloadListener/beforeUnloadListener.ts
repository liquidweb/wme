export const beforeUnloadListener = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  return { ...event, returnValue: 'Changes you made may not be saved.' };
};
