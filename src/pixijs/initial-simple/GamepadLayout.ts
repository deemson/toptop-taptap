import { GamepadColorButtonCircle } from './GamepadColorButtonCircle'
import { Container, ContainerChild, Texture } from 'pixi.js'
import { GamepadButton as GamepadButtonEnum } from '../../core'
import { GamepadDPadButtonCircle } from './GamepadDPadButtonCircle'
import { globals } from './globals'
import { Map as ImmutableMap } from 'immutable'
import { GamepadButton } from './GamepadButton'

interface GamepadLayoutOpts {
  parent: Container<ContainerChild>
  textures: {
    buttons: {
      dpad: Texture[],
      square: Texture[],
      triangle: Texture[],
      circle: Texture[],
      cross: Texture[],
    }
  }
}

export class GamepadLayout {
  private readonly buttonMap: ImmutableMap<GamepadButtonEnum, GamepadButton>

  constructor (opts: GamepadLayoutOpts) {
    const { parent } = opts
    const dPad = new GamepadDPadButtonCircle({
      parent,
      textures: opts.textures.buttons.dpad,
      x: globals.width / 4,
      y: globals.height / 3
    })
    const colored = new GamepadColorButtonCircle({
      parent,
      textures: {
        square: opts.textures.buttons.square,
        triangle: opts.textures.buttons.triangle,
        circle: opts.textures.buttons.circle,
        cross: opts.textures.buttons.cross
      },
      x: 3 * globals.width / 4,
      y: globals.height / 3
    })
    this.buttonMap = ImmutableMap<GamepadButtonEnum, GamepadButton>({
      dPadUp: dPad.up,
      dPadDown: dPad.down,
      dPadLeft: dPad.left,
      dPadRight: dPad.right,
      x: colored.square,
      y: colored.triangle,
      a: colored.cross,
      b: colored.circle,
    })
  }

  pressButton (buttonName: GamepadButtonEnum) {
    const button = this.buttonMap.get(buttonName)
    if (button !== undefined) {
      button.press()
    }
  }

  releaseButton (buttonName: GamepadButtonEnum) {
    const button = this.buttonMap.get(buttonName)
    if (button !== undefined) {
      button.release()
    }
  }
}