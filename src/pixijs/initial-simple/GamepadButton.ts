import {
  AnimatedSprite,
  Container,
  ContainerChild,
  Texture
} from 'pixi.js'

interface GamepadButtonOpts {
  parent: Container<ContainerChild>
  onPressTextures: Texture[]
  onReleaseTextures: Texture[]
  x: number
  y: number
  rotation: number
}

export class GamepadButton {
  private readonly parent: Container<ContainerChild>
  private readonly onPressSprite: AnimatedSprite
  private readonly onReleaseSprite: AnimatedSprite

  constructor (opts: GamepadButtonOpts) {
    this.parent = opts.parent

    this.onPressSprite = new AnimatedSprite(opts.onPressTextures)
    this.onPressSprite.animationSpeed = 0.5
    this.onPressSprite.loop = false
    this.onPressSprite.anchor = 0.5
    this.onPressSprite.x = opts.x
    this.onPressSprite.y = opts.y
    this.onPressSprite.angle = opts.rotation

    this.onReleaseSprite = new AnimatedSprite(opts.onReleaseTextures)
    this.onReleaseSprite.animationSpeed = 0.5
    this.onReleaseSprite.loop = false
    this.onReleaseSprite.anchor = 0.5
    this.onReleaseSprite.x = opts.x
    this.onReleaseSprite.y = opts.y
    this.onReleaseSprite.angle = opts.rotation

    this.onReleaseSprite.gotoAndStop(3)

    this.parent.addChild(this.onReleaseSprite)
  }

  press () {
    this.parent.removeChild(this.onReleaseSprite)
    this.parent.addChild(this.onPressSprite)
    this.onPressSprite.gotoAndPlay(0)
  }

  release () {
    this.parent.removeChild(this.onPressSprite)
    this.parent.addChild(this.onReleaseSprite)
    this.onReleaseSprite.gotoAndPlay(0)
  }
}