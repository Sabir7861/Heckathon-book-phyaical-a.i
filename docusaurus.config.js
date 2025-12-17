// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI: A Hands-On Guide',
  tagline: 'Learn to build intelligent systems that interact with the physical world',
  favicon: 'img/favicon.ico',

  url: 'http://localhost', // Jab deploy karein to sahi URL dalein
  baseUrl: '/',

  organizationName: 'physical-ai-book',
  projectName: 'physical-ai-book',

  onBrokenLinks: 'ignore', // Filhal ignore pe rakhein taake site build ho jaye
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Iska matlab hai docs hi home page hai
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Physical AI',
      logo: { alt: 'Logo', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'bookSidebar', position: 'left', label: 'Read Book' },
        { to: '/glossary', label: 'Glossary', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI Book.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'json', 'yaml'],
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      { quality: 70, max: 1030, min: 640, steps: 2 },
    ],
  ],
};

module.exports = config;