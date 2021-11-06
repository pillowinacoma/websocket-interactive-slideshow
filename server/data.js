const faker = require('faker')
const data = []

const makeSlides = (target) => {
  for (let index = 0; index < 10; index++) {
    target.push({
      type: faker.animal.dog(),
      title: faker.animal.bear(),
      text: faker.lorem.paragraphs(5, '\n'),
      visible: true,
      img: `https://www.fillmurray.com/g/${300 + index * 10}/${
        200 + index * 10
      }`,
      notes: '# Titre\n- ele\n- ele\n- ele'
    })
  }
}

makeSlides(data)

module.exports = { data, makeSlides }
