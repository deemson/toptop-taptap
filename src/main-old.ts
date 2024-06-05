import { Application, Texture, Sprite, Assets } from 'pixi.js'
import { GamepadButton, gamepadButtons, GamepadManager } from './gamepad'
import { Howl } from 'howler'

(async () => {
  const appWidth = 1024
  const appHeight = 576
  const buttonAssetsNames: Record<GamepadButton, string> = {
    a: 'cross',
    b: 'circle',
    x: 'square',
    y: 'triangle',
    leftBumper: 'bumper',
    rightBumper: 'bumper',
    leftTrigger: 'trigger',
    rightTrigger: 'trigger',
    back: 'options',
    start: 'options',
    leftStick: '',
    rightStick: '',
    dPadUp: 'up',
    dPadDown: 'down',
    dPadLeft: 'left',
    dPadRight: 'right',
  }
  const rightButtonsX = 3 * appWidth / 4
  const rightButtonsY = appHeight / 2 - 50
  const rightButtonsRadius = 70
  const leftButtonsX = appWidth / 4
  const leftButtonsY = appHeight / 2 - 50
  const leftButtonsRadius = 50
  const buttonPositions: Record<GamepadButton, [number, number]> = {
    a: [rightButtonsX, rightButtonsY + rightButtonsRadius],
    b: [rightButtonsX + rightButtonsRadius, rightButtonsY],
    x: [rightButtonsX - rightButtonsRadius, rightButtonsY],
    y: [rightButtonsX, rightButtonsY - rightButtonsRadius],
    leftBumper: [leftButtonsX, leftButtonsY - leftButtonsRadius - 60],
    rightBumper: [rightButtonsX, rightButtonsY - leftButtonsRadius - 60],
    leftTrigger: [leftButtonsX, leftButtonsY - leftButtonsRadius - 100],
    rightTrigger: [rightButtonsX, rightButtonsY - leftButtonsRadius - 100],
    back: [leftButtonsX + leftButtonsRadius + 20, leftButtonsY - leftButtonsRadius - 20],
    start: [rightButtonsX - leftButtonsRadius - 20, rightButtonsY - leftButtonsRadius - 20],
    leftStick: [0, 0],
    rightStick: [0, 0],
    dPadUp: [leftButtonsX, leftButtonsY - leftButtonsRadius],
    dPadDown: [leftButtonsX, leftButtonsY + leftButtonsRadius],
    dPadLeft: [leftButtonsX - leftButtonsRadius, leftButtonsY],
    dPadRight: [leftButtonsX + leftButtonsRadius, leftButtonsY],
  }
  const textures = (await Promise.all(gamepadButtons.map(async (gamepadButton) => {
    const buttonAssetName = buttonAssetsNames[gamepadButton]
    if (buttonAssetName === '') {
      return undefined
    }
    await Assets.load(`/assets/images/${buttonAssetName}.png`)
    return Texture.from(`/assets/images/${buttonAssetName}.png`)
  }))).reduce((obj, texture, index) => {
    obj[gamepadButtons[index]] = texture
    return obj
  }, {} as Record<GamepadButton, Texture | undefined>)

  const app = new Application()
  await app.init({
    width: appWidth,
    height: appHeight,
    backgroundColor: 0x000000,
    roundPixels: false
  })
  app.stage.addChild()
  document.body.append(app.canvas)

  window.addEventListener('keydown', event => {
    console.log(event)
  })

  const popSound = new Howl({ src: 'assets/sounds/zapsplat_cartoon_pop_mouth_mid_pitch_001_86611.mp3' })
  const activeSprites: Record<GamepadButton, Sprite | undefined> = {} as Record<GamepadButton, Sprite>
  let lingeringSprites: Sprite[] = []

  const gamepadManager = new GamepadManager({
    onButtonPress (button: GamepadButton): void {
      popSound.stop()
      popSound.play()
      const buttonTexture = textures[button]
      if (buttonTexture !== undefined) {
        const [x, y] = buttonPositions[button]
        const sprite = new Sprite(buttonTexture)
        sprite.anchor.set(0.5)
        sprite.scale.set(4, 4)
        sprite.x = x
        sprite.y = y
        sprite.alpha = 1
        app.stage.addChild(sprite)
        activeSprites[button] = sprite
      }
    },
    onButtonRelease (button: GamepadButton): void {
      popSound.stop()
      const sprite = activeSprites[button]
      if (sprite !== undefined) {
        lingeringSprites.push(sprite)
        activeSprites[button] = undefined
      }
    }
  })

  app.ticker.add(() => {
    gamepadManager.update()
    lingeringSprites = lingeringSprites.filter(sprite => {
      sprite.alpha -= 0.03
      const isRemoved = sprite.alpha <= 0
      if (isRemoved) {
        app.stage.removeChild(sprite)
      }
      return !isRemoved
    })
  })
})()