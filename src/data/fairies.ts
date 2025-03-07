import { type Fairies } from '../types'

export const fairies: Fairies = [
  {
    id: 11,
    name: 'Glisterina Twinkletooth',
    description: 'A sparkling fairy with a love for glittery molars.',
    avatar: 'fairy_1.jpg',
  },
  {
    id: 12,
    name: 'Brindlebum Sparkleshine',
    description: 'Known for his love of shiny treasures and bumbling flights.',
    avatar: 'fairy_2.jpg',
  },
  {
    id: 13,
    name: 'Trixi Glittergums',
    description: 'A gentle fairy with a knack for leaving tiny trails of fluff.',
    avatar: 'fairy_3.jpg',
  },
  {
    id: 14,
    name: 'Snizzlewhip Sugargrin',
    description: 'Famous for her sugary sweet demeanor and toothy giggles.',
    avatar: 'fairy_4.jpg',
  },
  {
    id: 15,
    name: 'Puffington Tootlewand',
    description: 'A wand-waving fairy who floats on puffs of giggles.',
    avatar: 'fairy_5.jpg',
  },
  {
    id: 16,
    name: 'Tinkerwig Gleamthimble',
    description: 'Master of the fairy craft, known for making every tooth gleam.',
    avatar: 'fairy_6.jpg',
  },
  {
    id: 17,
    name: 'Twizzletip Molarbelle',
    description: 'A delightful fairy with a twirling habit and a soft spot for molars.',
    avatar: 'fairy_7.jpg',
  },
  {
    id: 18,
    name: 'Nimblepip Shimmersnout',
    description: 'Quick on her feet, with a nose for finding teeth in tricky places.',
    avatar: 'fairy_5.jpg',
  },
  {
    id: 19,
    name: 'Flutterfizz Toothglee',
    description: 'A bubbly fairy who fizzes with excitement over every tooth.',
    avatar: 'fairy_2.jpg',
  },
  {
    id: 10,
    name: 'Snagglewink Dazzlewing',
    description: 'A mischievous fairy with dazzling wings and a love for surprise visits.',
    avatar: 'fairy_6.jpg',
  },
]

const notes = [
  'What a marvelously shiny tooth! It sparkled like a star under my fairy lantern. Absolutely delightful!',
  'Found the tooth nestled under the pillow like a treasure in a pirate’s chest. Such a neat little spot!',
  'The room was tidy enough to land my fairy wings without a single hiccup. Impressive!',
  'Oh, the tooth! As white as freshly fallen snow and just as perfect. A true collector’s gem!',
  'The tooth was splendid, but landing was tricky—had to dodge a sock mountain and a stray crayon brigade!',
  "What a well-behaved tooth! It almost whispered a tiny 'thank you' as I picked it up. Magical!",
  'This tooth had a charming gleam to it—must be from all the diligent brushing. Bravo!',
  'An extraordinary visit! Found the tooth exactly where expected, with a tiny note beside it: ‘Thank you, Fairy!’',
  'The room was a bit of a cluttered jungle, but I braved it like a true explorer and found the tooth shining brightly!',
  'A flawless tooth, fit for a royal fairy collection. The child must’ve polished it with extra care!',
]

export const getRandomNote = () => {
  const randomIndex = Math.floor(Math.random() * notes.length)
  return notes[randomIndex]
}
