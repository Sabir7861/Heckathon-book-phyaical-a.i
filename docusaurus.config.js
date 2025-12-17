// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI: A Hands-On Guide',
  tagline: 'Learn to build intelligent systems that interact with the physical world',
  favicon: 'img/favicon.ico',

  // Production URL
  url: 'https://YOUR_VERCEL_PROJECT_URL.vercel.app', // <-- Deploy karte waqt update karein
  baseUrl: '/',

  organizationName: 'physical-ai-book',
  projectName: 'physical-ai-book',

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Docs ko home page banata hai
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Physical AI',
      logo: { alt: 'Physical AI Book Logo', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'bookSidebar', position: 'left', label: 'Book' },
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
      links: [
        {
          title: 'Book',
          items: [{ label: 'Glossary', to: '/glossary' }],
        },
      ],
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
      { quality: 70, max: 1030, min: 640, steps: 2, disableInDev: false },
    ],
  ],
};

module.exports = config;
