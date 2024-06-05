import { AnimatedSprite, Application, Assets, Container, Sprite, Texture } from 'pixi.js'
import { rosy42 } from './pixijs/palettes'

const width = 320
const height = 240

export class SimpleGamepad {
  private app: Application

  constructor () {
    this.app = new Application()
  }

  async run () {
    await this.app.init({
      width,
      height,
      backgroundColor: rosy42[37],
      roundPixels: false
    })
    this.app.resizeTo = window
    document.body.append(this.app.canvas)

    const container = new Container({
      width,
      height,
      x: this.app.screen.width / 2 - width / 2,
      y: this.app.screen.height / 2 - height / 2
    })
    const background = new Sprite({
      texture: Texture.WHITE,
      width,
      height,
      tint: rosy42[0],
      x: 0,
      y: 0,
    })
    container.addChild(background)

    this.app.stage.addChild(container)

    // const sprite = new Sprite(Texture.WHITE)
    // sprite.width = 320
    // sprite.height = 240
    // sprite.anchor = 0.5
    // sprite.x = this.app.screen.width / 2
    // sprite.y = this.app.screen.height / 2
    // this.app.stage.addChild(sprite)
    //
    // await Assets.load('/assets/images/simple/square.json')
    // const textures: Texture[] = []
    // for (let i = 0; i < 5; i++) {
    //   textures.push(Texture.from(`square ${i}.aseprite`))
    // }
    //
    // const sprite2 = new AnimatedSprite(textures)
    // sprite2.loop = true
    // sprite2.anchor = 0.5
    // sprite2.x = this.app.screen.width / 2
    // sprite2.y = this.app.screen.height / 2
    // sprite2.animationSpeed = 0.5
    // sprite2.play()
    //
    // this.app.stage.addChild(sprite2)

    this.app.ticker.add(() => {
      const scale = Math.min(
        Math.floor(this.app.screen.width / 320),
        Math.floor(this.app.screen.height / 240),
      )
      container.scale = scale
      container.x = this.app.screen.width / 2 - width * scale / 2
      container.y = this.app.screen.height / 2 - height * scale / 2
    })
  }
}