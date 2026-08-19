// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '30 Ngày Camunda 8',
  tagline: 'Học Camunda 8 mỗi ngày một kiến thức — Java · Spring Boot · Self-managed',
  favicon: 'img/favicon.ico',

  url: 'https://dev-anhkn.github.io',
  baseUrl: '/camunda-30d/',

  organizationName: 'dev-anhkn',
  projectName: 'camunda-30d',

  onBrokenLinks: 'warn',  // ← ĐỔI từ 'throw' sang 'warn'
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/dev-anhkn/camunda-30d/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: '30 Ngày Camunda 8',
      logo: {
        alt: 'Camunda Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Bắt đầu học',
        },
        {
          href: 'https://github.com/dev-anhkn/camunda-30d',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Series',
          items: [
            { label: 'Giới thiệu', to: '/' },
            { label: 'Ngày 1 – Architecture', to: '/day01-architecture' },
          ],
        },
        {
          title: 'Tài liệu tham khảo',
          items: [
            { label: 'Camunda Docs', href: 'https://docs.camunda.io' },
            { label: 'Spring Zeebe SDK', href: 'https://github.com/camunda/camunda-spring-boot-starter' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} — Built with Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'yaml', 'bash', 'xml'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;