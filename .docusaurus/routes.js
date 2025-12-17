import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '20d'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '816'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e62'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '883'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/actuation/lesson-01-motors-and-movement',
                component: ComponentCreator('/docs/actuation/lesson-01-motors-and-movement', '1e8'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/actuation/lesson-02-control-systems-basics',
                component: ComponentCreator('/docs/actuation/lesson-02-control-systems-basics', 'e09'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/actuation/lesson-03-building-a-robotic-arm',
                component: ComponentCreator('/docs/actuation/lesson-03-building-a-robotic-arm', '3fd'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/1-foundations-of-physical-ai',
                component: ComponentCreator('/docs/category/1-foundations-of-physical-ai', 'd1d'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/2-perception',
                component: ComponentCreator('/docs/category/2-perception', 'b70'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/3-reasoning',
                component: ComponentCreator('/docs/category/3-reasoning', 'a9e'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/4-actuation',
                component: ComponentCreator('/docs/category/4-actuation', 'c62'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/5-learning',
                component: ComponentCreator('/docs/category/5-learning', '347'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/6-integration',
                component: ComponentCreator('/docs/category/6-integration', '2ff'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/7-ethics--future',
                component: ComponentCreator('/docs/category/7-ethics--future', 'f90'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/category/resources',
                component: ComponentCreator('/docs/category/resources', '5db'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/ethics-and-future/lesson-01-safety-and-responsibility',
                component: ComponentCreator('/docs/ethics-and-future/lesson-01-safety-and-responsibility', '59a'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/ethics-and-future/lesson-02-ethical-considerations',
                component: ComponentCreator('/docs/ethics-and-future/lesson-02-ethical-considerations', '29e'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/ethics-and-future/lesson-03-future-of-physical-ai',
                component: ComponentCreator('/docs/ethics-and-future/lesson-03-future-of-physical-ai', '18a'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/foundations/lesson-01-what-is-physical-ai',
                component: ComponentCreator('/docs/foundations/lesson-01-what-is-physical-ai', '920'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/foundations/lesson-02-components-of-physical-ai',
                component: ComponentCreator('/docs/foundations/lesson-02-components-of-physical-ai', '4e8'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/foundations/lesson-03-your-first-physical-ai-system',
                component: ComponentCreator('/docs/foundations/lesson-03-your-first-physical-ai-system', '818'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/glossary',
                component: ComponentCreator('/docs/glossary', '332'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/integration/lesson-01-system-architecture',
                component: ComponentCreator('/docs/integration/lesson-01-system-architecture', '947'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/integration/lesson-02-real-time-processing',
                component: ComponentCreator('/docs/integration/lesson-02-real-time-processing', '5fd'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/integration/lesson-03-capstone-autonomous-robot',
                component: ComponentCreator('/docs/integration/lesson-03-capstone-autonomous-robot', 'a89'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/learning/lesson-01-machine-learning-for-robotics',
                component: ComponentCreator('/docs/learning/lesson-01-machine-learning-for-robotics', '7c9'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/learning/lesson-02-reinforcement-learning-intro',
                component: ComponentCreator('/docs/learning/lesson-02-reinforcement-learning-intro', 'ad0'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/learning/lesson-03-training-your-physical-ai',
                component: ComponentCreator('/docs/learning/lesson-03-training-your-physical-ai', 'c4e'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/perception/lesson-01-sensors-and-sensing',
                component: ComponentCreator('/docs/perception/lesson-01-sensors-and-sensing', 'f3b'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/perception/lesson-02-computer-vision-basics',
                component: ComponentCreator('/docs/perception/lesson-02-computer-vision-basics', '420'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/perception/lesson-03-processing-sensor-data',
                component: ComponentCreator('/docs/perception/lesson-03-processing-sensor-data', 'd17'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/reasoning/lesson-01-decision-making-fundamentals',
                component: ComponentCreator('/docs/reasoning/lesson-01-decision-making-fundamentals', '60e'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/reasoning/lesson-02-state-machines-and-behavior',
                component: ComponentCreator('/docs/reasoning/lesson-02-state-machines-and-behavior', '46d'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/reasoning/lesson-03-planning-and-navigation',
                component: ComponentCreator('/docs/reasoning/lesson-03-planning-and-navigation', 'e2f'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/resources/additional-resources',
                component: ComponentCreator('/docs/resources/additional-resources', '078'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/resources/hardware-guide',
                component: ComponentCreator('/docs/resources/hardware-guide', 'c20'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/docs/resources/software-setup',
                component: ComponentCreator('/docs/resources/software-setup', '608'),
                exact: true,
                sidebar: "bookSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
