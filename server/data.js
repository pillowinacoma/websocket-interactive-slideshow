const faker = require('faker')
const data = []

for (let index = 0; index < 10; index++) {
  data.push({
    type: faker.animal.dog(),
    title: faker.animal.bear(),
    text: faker.lorem.paragraphs(5, '\n'),
    visible: true,
    img: `${faker.image.nature()}?random=${index}}`,
    notes: faker.lorem.paragraphs()
  })
}

module.exports = data
