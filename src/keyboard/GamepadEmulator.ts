import { GamepadButton } from '../core'
import { Map as ImmutableMap } from 'immutable'

interface GamepadEmulatorOptions {
  gamepadButtonsToKeyCodes: Record<GamepadButton, string>

  onButtonPress: (button: GamepadButton) => void

  onButtonRelease: (button: GamepadButton) => void
}

export class GamepadEmulator {
  private readonly controlScheme: ImmutableMap<string, GamepadButton>
  private readonly buttonStates: { [key: string]: boolean }

  constructor (opts: GamepadEmulatorOptions) {
    const m = ImmutableMap<GamepadButton, string>(opts.gamepadButtonsToKeyCodes)
    this.controlScheme = m.flip()
    this.buttonStates = {}
    this.controlScheme.keySeq().forEach(value => {
      this.buttonStates[value] = false
    })
    window.addEventListener('keydown', event => {
      const gamepadButton = this.controlScheme.get(event.code)
      if (gamepadButton !== undefined) {
        if (!this.buttonStates[event.code]) {
          this.buttonStates[event.code] = true
          opts.onButtonPress(gamepadButton)
        }
      }
    })
    window.addEventListener('keyup', event => {
      const gamepadButton = this.controlScheme.get(event.code)
      if (gamepadButton !== undefined) {
        if (this.buttonStates[event.code]) {
          this.buttonStates[event.code] = false
          opts.onButtonRelease(gamepadButton)
        }
      }
    })
  }
}