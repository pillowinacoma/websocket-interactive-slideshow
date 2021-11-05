import * as faker from 'faker'
import { Slide } from '../type'
const initialSlides: Slide[] = []

for (let index = 0; index < 10; index++) {
  initialSlides.push({
    type: faker.animal.dog(),
    title: faker.animal.bear(),
    text: faker.lorem.paragraphs(5, '\n'),
    visible: true,
    img: `${faker.image.nature()}?random=${index}}`,
    notes: faker.lorem.paragraphs()
  })
}

export { initialSlides }
