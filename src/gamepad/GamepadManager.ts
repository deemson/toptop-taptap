import { GamepadButton, gamepadButtons } from './GamepadButton'

export class GamepadManager {
  private readonly buttonStates: Record<GamepadButton, boolean>

  constructor (private readonly handlers: {
    onButtonPress: (button: GamepadButton) => void,
    onButtonRelease: (button: GamepadButton) => void
  }) {
    this.buttonStates = gamepadButtons.reduce((obj: { [key in GamepadButton]: boolean }, button: GamepadButton) => {
      obj[button] = false
      return obj
    }, {} as { [key in GamepadButton]: boolean })
  }

  update () {
    const gamepad = navigator.getGamepads()[0]
    if (gamepad === undefined || gamepad === null) {
      return
    }
    gamepad.buttons.forEach((nativeGamepadButton, index) => {
      if (index >= gamepadButtons.length) {
        return
      }
      const gamepadButton = gamepadButtons[index]
      if (nativeGamepadButton.pressed !== this.buttonStates[gamepadButton]) {
        this.buttonStates[gamepadButton] = nativeGamepadButton.pressed
        if (nativeGamepadButton.pressed) {
          this.handlers.onButtonPress(gamepadButton)
        } else {
          this.handlers.onButtonRelease(gamepadButton)
        }
      }
    })
  }
}