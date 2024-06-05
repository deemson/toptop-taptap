/**
 * const array of gamepad button names
 *
 * the order is the same as the order of buttons returned by {@link Gamepad#buttons}
 */
export const gamepadButtons = [
  'a',
  'b',
  'x',
  'y',
  'leftBumper',
  'rightBumper',
  'leftTrigger',
  'rightTrigger',
  'back',
  'start',
  'leftStick',
  'rightStick',
  'dPadUp',
  'dPadDown',
  'dPadLeft',
  'dPadRight',
] as const
export type GamepadButton = typeof gamepadButtons[number]