/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  bookSidebar: [
    'intro',
    {
      type: 'category',
      label: '1. Foundations of Physical AI',
      collapsed: false,
      link: { type: 'generated-index', title: 'Foundations of Physical AI' },
      items: [
        'foundations/lesson-01-what-is-physical-ai',
        'foundations/lesson-02-components-of-physical-ai',
        'foundations/lesson-03-your-first-physical-ai-system',
      ],
    },
    {
      type: 'category',
      label: '2. Perception',
      link: { type: 'generated-index', title: 'Perception' },
      items: [
        'perception/lesson-01-sensors-and-sensing',
        'perception/lesson-02-computer-vision-basics',
        'perception/lesson-03-processing-sensor-data',
      ],
    },
    {
      type: 'category',
      label: '3. Reasoning',
      link: { type: 'generated-index', title: 'Reasoning' },
      items: [
        'reasoning/lesson-01-decision-making-fundamentals',
        'reasoning/lesson-02-state-machines-and-behavior',
        'reasoning/lesson-03-planning-and-navigation',
      ],
    },
    {
      type: 'category',
      label: '4. Actuation',
      link: { type: 'generated-index', title: 'Actuation' },
      items: [
        'actuation/lesson-01-motors-and-movement',
        'actuation/lesson-02-control-systems-basics',
        'actuation/lesson-03-building-a-robotic-arm',
      ],
    },
    {
      type: 'category',
      label: '5. Learning',
      link: { type: 'generated-index', title: 'Learning' },
      items: [
        'learning/lesson-01-machine-learning-for-robotics',
        'learning/lesson-02-reinforcement-learning-intro',
        'learning/lesson-03-training-your-physical-ai',
      ],
    },
    {
      type: 'category',
      label: '6. Integration',
      link: { type: 'generated-index', title: 'Integration' },
      items: [
        'integration/lesson-01-system-architecture',
        'integration/lesson-02-real-time-processing',
        'integration/lesson-03-capstone-autonomous-robot',
      ],
    },
    {
      type: 'category',
      label: '7. Ethics & Future',
      link: { type: 'generated-index', title: 'Ethics and Future' },
      items: [
        'ethics-and-future/lesson-01-safety-and-responsibility',
        'ethics-and-future/lesson-02-ethical-considerations',
        'ethics-and-future/lesson-03-future-of-physical-ai',
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