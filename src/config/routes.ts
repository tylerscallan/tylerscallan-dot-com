export const ROUTES = {
  home: '/',
  editorials: '/editorials',
  editorialDetail: '/editorials/:slug',
  software: '/software',
  softwareDetail: '/software/:slug',
  connect: '/connect',
  about: '/about',
} as const

export const navItems = [
  { to: ROUTES.home, label: 'photography' },
  { to: ROUTES.editorials, label: 'editorials' },
  { to: ROUTES.software, label: 'software' },
  { to: ROUTES.connect, label: 'connect' },
  { to: ROUTES.about, label: 'about' },
] as const
