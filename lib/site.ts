export const site = {
  name: 'Diana Mayalo',
  email: 'dianamayalo28@gmail.com',
  phone: '+254 799 249 060',
  phoneHref: 'tel:+254799249060',
  location: 'Nairobi, Kenya',
  github: 'https://github.com/dianamayalo',
  linkedin: 'https://linkedin.com/in/dianamayalo',
  /** The PDF in /public keeps its original filename; browsers percent-encode the spaces. */
  cvHref: '/Diana Mayalo CV ..pdf',
} as const

/** Primary navigation. Absolute hashes so links work from /projects/* and /card too. */
export const navItems = [
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Projects', href: '/#projects', id: 'projects' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
] as const

export const sectionIds = navItems.map((item) => item.id)
