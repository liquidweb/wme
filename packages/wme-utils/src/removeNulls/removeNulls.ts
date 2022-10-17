type Validate<T> = Pick<
  T,
  {
    [Prop in keyof T]: T[Prop] extends null ? never : Prop;
  }[keyof T]
>;

/**
 * Removes empty items from object.
 *
 * @see https://stackoverflow.com/a/70363240
 *
 * @param {Object} object
 * @return {Object} - Returns object with emtpy items removed.
 */
export function removeNulls<Obj>(object: Obj): Validate<Obj> {
  const newObject = object;
  if (
    typeof newObject === 'object'
    && newObject !== null
    && !Array.isArray(newObject)
  ) {
    Object.keys(newObject).forEach((key) => {
      if (newObject[key as keyof typeof newObject] === null) {
        delete newObject[key as keyof typeof newObject];
      }
    });
  }

  return newObject;
}
