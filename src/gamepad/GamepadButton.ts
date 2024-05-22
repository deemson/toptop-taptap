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