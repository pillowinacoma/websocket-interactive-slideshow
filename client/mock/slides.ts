import { Slide } from '../type'

export const initialSlides: Slide[] = [
  { type: 'title', title: 'TIW 8', text: '', visible: true, notes: '' },
  {
    type: 'content',
    title: 'TP 1',
    text: 'Le TP porte sur des rappels de developpement Web',
    visible: false,
    notes: 'ce transparent est caché'
  },
  {
    type: 'content',
    title: 'TP 2',
    text: "Le TP porte sur la creation d'un outil de presentation HTML",
    visible: true,
    notes: ''
  },
  { type: 'content', title: 'TP 3', text: 'Le TP 3', visible: true, notes: '' },
  { type: 'content', title: 'TP 4', text: 'Le TP 4', visible: true, notes: '' },
  { type: 'title', title: 'Question ?', text: '', visible: true, notes: '' }
]
