import {
  AnimatedSprite,
  Container,
  ContainerChild,
  Texture
} from 'pixi.js'

export class GamepadColorButton {
  private readonly onPressSprite: AnimatedSprite
  private readonly onReleaseSprite: AnimatedSprite

  constructor (
    private readonly parent: Container<ContainerChild>,
    name: string,
    x: number,
    y: number
  ) {
    const textures: Texture[] = []
    for (let i = 0; i < 5; i++) {
      textures.push(Texture.from(`${name} ${i}.aseprite`))
    }

    this.onPressSprite = new AnimatedSprite([
      textures[2],
      textures[1],
      textures[0],
      textures[1],
    ])
    this.onPressSprite.animationSpeed = 0.5
    this.onPressSprite.loop = false
    this.onPressSprite.anchor = 0.5
    this.onPressSprite.x = x
    this.onPressSprite.y = y

    this.onReleaseSprite = new AnimatedSprite([
      textures[1],
      textures[2],
      textures[3],
      textures[4],
    ])
    this.onReleaseSprite.animationSpeed = 0.5
    this.onReleaseSprite.loop = false
    this.onReleaseSprite.anchor = 0.5
    this.onReleaseSprite.x = x
    this.onReleaseSprite.y = y

    this.onReleaseSprite.gotoAndStop(3)

    this.parent.addChild(this.onReleaseSprite)
  }

  onPress () {
    this.parent.removeChild(this.onReleaseSprite)
    this.parent.addChild(this.onPressSprite)
    this.onPressSprite.gotoAndPlay(0)
  }

  onRelease () {
    this.parent.removeChild(this.onPressSprite)
    this.parent.addChild(this.onReleaseSprite)
    this.onReleaseSprite.gotoAndPlay(0)
  }
}