import { GamepadColorButtonCircle, GamepadLayout, makeApp, makeTopBackgroundContainer } from './pixijs/initial-simple'
import { Assets, Texture } from 'pixi.js'
import { globals } from './pixijs/initial-simple/globals'
import { Howl } from 'howler'
import { GamepadEmulator } from './keyboard'
import { GamepadButton } from './core'
import { GamepadManager } from './gamepad'

(async () => {
  const app = await makeApp()
  const container = await makeTopBackgroundContainer(app)

  await Promise.all([
    'circle',
    'cross',
    'square',
    'triangle',
    'dpad'
  ].map(name => {
    return Assets.load(`/assets/images/simple/${name}.json`)
  }))

  const indexes = Array.from({ length: 10 }, (_, i) => i)
  const gamepadLayout = new GamepadLayout({
    parent: container,
    textures: {
      buttons: {
        dpad: indexes.map(num => Texture.from(`dpad ${num}.aseprite`)),
        square: indexes.map(num => Texture.from(`square ${num}.aseprite`)),
        triangle: indexes.map(num => Texture.from(`triangle ${num}.aseprite`)),
        cross: indexes.map(num => Texture.from(`cross ${num}.aseprite`)),
        circle: indexes.map(num => Texture.from(`circle ${num}.aseprite`))
      }
    }
  })
  const popSound = new Howl({ src: 'assets/sounds/zapsplat_cartoon_pop_mouth_mid_pitch_001_86611.mp3' })

  // const gamepadEmulator = new GamepadEmulator({
  //   gamepadButtonsToKeyCodes: {
  //     a: 'KeyK',
  //     b: 'KeyL',
  //     x: 'KeyJ',
  //     y: 'KeyI',
  //     leftBumper: '',
  //     rightBumper: '',
  //     leftTrigger: '',
  //     rightTrigger: '',
  //     back: '',
  //     start: '',
  //     leftStick: '',
  //     rightStick: '',
  //     dPadUp: 'KeyW',
  //     dPadDown: 'KeyS',
  //     dPadLeft: 'KeyA',
  //     dPadRight: 'KeyD',
  //   },
  //   onButtonPress: (button: GamepadButton) => {
  //     popSound.play()
  //     gamepadLayout.pressButton(button)
  //   },
  //   onButtonRelease: (button: GamepadButton) => {
  //     gamepadLayout.releaseButton(button)
  //   }
  // })
  const gamepadManager = new GamepadManager({
    onButtonPress (button: GamepadButton): void {
      popSound.play()
      gamepadLayout.pressButton(button)
    },
    onButtonRelease (button: GamepadButton): void {
      gamepadLayout.releaseButton(button)
    }
  })
  app.ticker.add(() => {
    gamepadManager.update()
  })
})()