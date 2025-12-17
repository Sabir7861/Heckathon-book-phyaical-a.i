// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI: A Hands-On Guide',
  tagline: 'Learn to build intelligent systems that interact with the physical world',
  favicon: 'img/favicon.ico',

  url: 'https://your-vercel-domain.vercel.app', // Vercel domain
  baseUrl: '/',

  organizationName: 'physical-ai-book',
  projectName: 'physical-ai-book',

  onBrokenLinks: 'ignore', // temporary fix for build
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // docs as homepage
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Physical AI',
      logo: { alt: 'Physical AI Logo', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'bookSidebar', position: 'left', label: 'Read Book' },
        { to: '/glossary', label: 'Glossary', position: 'left' },
        {
          href: 'https://github.com/your-org/physical-ai-book',
          label: 'GitHub',
          position: 'right',
        },
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
    // Removed plugin-ideal-image to avoid sharp build errors on Vercel
  ],
};

module.exports = config;
