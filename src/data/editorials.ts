import type { Editorial } from '../types'

export type { Editorial }

export const editorials: Editorial[] = [
  {
    slug: 'lorem-ipsum',
    title: 'Lorem Ipsum',
    date: '2024-06-15',
    cover: '/images/editorials/urban-light/cover.jpg',
    coverThumb: '/images/editorials/urban-light/cover-thumb.webp',
    images: [
      {
        src: '/images/editorials/urban-light/001.jpg',
        thumb: '/images/editorials/urban-light/001.jpg',
        alt: 'Lorem Ipsum 1',
        width: 1600,
        height: 2400,
      },
      {
        src: '/images/editorials/urban-light/002.jpg',
        thumb: '/images/editorials/urban-light/002.jpg',
        alt: 'Lorem Ipsum 2',
        width: 1600,
        height: 2400,
      },
      {
        src: '/images/editorials/urban-light/003.jpg',
        thumb: '/images/editorials/urban-light/003.jpg',
        alt: 'Lorem Ipsum 3',
        width: 1600,
        height: 2400,
      },
    ],
  },
  {
    slug: 'dolor-sit-amet',
    title: 'Dolor Sit Amet',
    date: '2024-03-20',
    cover: '/images/editorials/golden-hour/cover.jpg',
    coverThumb: '/images/editorials/golden-hour/cover-thumb.webp',
    images: [
      {
        src: '/images/editorials/golden-hour/001.jpg',
        thumb: '/images/editorials/golden-hour/001.jpg',
        alt: 'Dolor Sit Amet 1',
        width: 1600,
        height: 2400,
      },
      {
        src: '/images/editorials/golden-hour/002.jpg',
        thumb: '/images/editorials/golden-hour/002.jpg',
        alt: 'Dolor Sit Amet 2',
        width: 1600,
        height: 2400,
      },
      {
        src: '/images/editorials/golden-hour/003.jpg',
        thumb: '/images/editorials/golden-hour/003.jpg',
        alt: 'Dolor Sit Amet 3',
        width: 1600,
        height: 2400,
      },
    ],
  },
  {
    slug: 'consectetur-adipiscing',
    title: 'Consectetur Adipiscing',
    date: '2023-10-05',
    cover: '/images/editorials/autumn-collection/cover.jpg',
    coverThumb: '/images/editorials/autumn-collection/cover-thumb.webp',
    images: [
      {
        src: '/images/editorials/autumn-collection/001.jpg',
        thumb: '/images/editorials/autumn-collection/001.jpg',
        alt: 'Consectetur Adipiscing 1',
        width: 1600,
        height: 2400,
      },
      {
        src: '/images/editorials/autumn-collection/002.jpg',
        thumb: '/images/editorials/autumn-collection/002.jpg',
        alt: 'Consectetur Adipiscing 2',
        width: 1600,
        height: 2400,
      },
      {
        src: '/images/editorials/autumn-collection/003.jpg',
        thumb: '/images/editorials/autumn-collection/003.jpg',
        alt: 'Consectetur Adipiscing 3',
        width: 1600,
        height: 2400,
      },
    ],
  },
]
