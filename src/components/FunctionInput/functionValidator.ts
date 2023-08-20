/**
 * Validates that a string is a valid function
 *
 * @param fn A function string, also accepts a function in case that it's coming natively (For example, a default value)
 */
export default function functionValidator<T>(fn: string | T): boolean {
  if (typeof fn === 'function') {
    return true;
  }

  try {
    return typeof (new Function('return ' + fn)() as T) === 'function';
  } catch (e) {
    return false;
  }
}
