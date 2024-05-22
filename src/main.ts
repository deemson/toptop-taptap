import { Application, Texture, Sprite, Assets } from 'pixi.js'

(async () => {
  const app = new Application()
  await app.init({
    width: 1024,
    height: 576,
    backgroundColor: 0x000000,
    roundPixels: false
  })
  document.body.append(app.canvas)

  await Assets.load('/assets/images/square.png')

  const texture = Texture.from('/assets/images/square.png')
  const sprite = new Sprite(texture)
  sprite.anchor.set(0.5)
  sprite.scale.set(4, 4)
  sprite.x = 1024 / 2
  sprite.y = 576 / 2
  sprite.alpha = 1
  app.stage.addChild(sprite)

  app.ticker.add(() => {
    sprite.alpha -= 0.01
    if (sprite.alpha <= 0) {
      sprite.alpha = 1
    }
  })
})()