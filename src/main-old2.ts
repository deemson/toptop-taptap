import { Application, Texture, Sprite } from 'pixi.js'
import { rosy42 } from './x'



(async () => {
  const backgroundColor = rosy42[18]

  const app = new Application()
  await app.init({
    width: 320,
    height: 240,
    backgroundColor,
    roundPixels: false
  })
  app.resizeTo = window
  document.body.append(app.canvas)

  const sprite = Sprite.from(Texture.WHITE)
  sprite.width = 320
  sprite.height = 240
  sprite.tint = rosy42[3]
  sprite.x = app.screen.width / 2 - 160
  console.log(sprite.scale)

  app.stage.addChild(sprite)

  app.ticker.add(() => {
    console.log(`${app.screen.width}x${app.screen.height}`)
  })
})()