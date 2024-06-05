import { SimpleGamepad } from './SimpleGamepad'

(async () => {
  const game = new SimpleGamepad()
  await game.run()
})()