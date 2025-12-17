/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  bookSidebar: [
    'intro',
    {
      type: 'category',
      label: '1. Foundations of Physical AI',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Foundations of Physical AI',
        description: 'Learn the fundamental concepts of Physical AI and build your first system.',
      },
      items: [
        '01-foundations/lesson-01-what-is-physical-ai',
        '01-foundations/lesson-02-components-of-physical-ai',
        '01-foundations/lesson-03-your-first-physical-ai-system',
      ],
    },
    {
      type: 'category',
      label: '2. Perception',
      link: { type: 'generated-index', title: 'Perception' },
      items: [
        '02-perception/lesson-01-sensors-and-sensing',
        '02-perception/lesson-02-computer-vision-basics',
        '02-perception/lesson-03-processing-sensor-data',
      ],
    },
    {
      type: 'category',
      label: '3. Reasoning',
      link: { type: 'generated-index', title: 'Reasoning' },
      items: [
        '03-reasoning/lesson-01-decision-making-fundamentals',
        '03-reasoning/lesson-02-state-machines-and-behavior',
        '03-reasoning/lesson-03-planning-and-navigation',
      ],
    },
    {
      type: 'category',
      label: '4. Actuation',
      link: { type: 'generated-index', title: 'Actuation' },
      items: [
        '04-actuation/lesson-01-motors-and-movement',
        '04-actuation/lesson-02-control-systems-basics',
        '04-actuation/lesson-03-building-a-robotic-arm',
      ],
    },
    {
      type: 'category',
      label: '5. Learning',
      link: { type: 'generated-index', title: 'Learning' },
      items: [
        '05-learning/lesson-01-machine-learning-for-robotics',
        '05-learning/lesson-02-reinforcement-learning-intro',
        '05-learning/lesson-03-training-your-physical-ai',
      ],
    },
    {
      type: 'category',
      label: '6. Integration',
      link: { type: 'generated-index', title: 'Integration' },
      items: [
        '06-integration/lesson-01-system-architecture',
        '06-integration/lesson-02-real-time-processing',
        '06-integration/lesson-03-capstone-autonomous-robot',
      ],
    },
    {
      type: 'category',
      label: '7. Ethics & Future',
      link: { type: 'generated-index', title: 'Ethics and Future' },
      items: [
        '07-ethics-and-future/lesson-01-safety-and-responsibility',
        '07-ethics-and-future/lesson-02-ethical-considerations',
        '07-ethics-and-future/lesson-03-future-of-physical-ai',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      link: { type: 'generated-index', title: 'Resources' },
      items: [
        'resources/hardware-guide',
        'resources/software-setup',
        'resources/additional-resources',
      ],
    },
    'glossary',
  ],
};

module.exports = sidebars;