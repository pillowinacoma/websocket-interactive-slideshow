const faker = require('faker')
const data = []

const makeSlides = (target) => {
  for (let index = 0; index < 10; index++) {
    target.push({
      type: faker.animal.dog(),
      title: faker.animal.bear(),
      text: faker.lorem.paragraphs(1, '\n'),
      visible: true,
      img: `https://www.fillmurray.com/g/${300 + index * 10}/${
        200 + index * 10
      }`,
      notes: `# Titre ${index} \n Ces notes sont en **markdown**\n- ${faker.lorem.lines(1)}\n- ${faker.lorem.lines(1)}\n- ${faker.lorem.lines(1)}\n\n >Remarque : ${faker.lorem.words(3)}` 
    })
  }
}

makeSlides(data)

module.exports = { data, makeSlides }
