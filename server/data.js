const faker = require('faker')
const data = []

for (let index = 0; index < 10; index++) {
  data.push({
    type: faker.animal.dog(),
    title: faker.animal.bear(),
    text: faker.lorem.paragraphs(5, '\n'),
    visible: true,
    img: `https://www.fillmurray.com/g/${300 + index * 10}/${
      200 + index * 10
    }}`,
    notes: faker.lorem.paragraphs()
  })
}

module.exports = data
