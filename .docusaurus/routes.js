import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '8de'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '0af'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '7f5'),
            routes: [
              {
                path: '/actuation/lesson-01-motors-and-movement',
                component: ComponentCreator('/actuation/lesson-01-motors-and-movement', 'e45'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/actuation/lesson-02-control-systems-basics',
                component: ComponentCreator('/actuation/lesson-02-control-systems-basics', 'c7f'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/actuation/lesson-03-building-a-robotic-arm',
                component: ComponentCreator('/actuation/lesson-03-building-a-robotic-arm', 'e7b'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/1-foundations-of-physical-ai',
                component: ComponentCreator('/category/1-foundations-of-physical-ai', '88f'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/2-perception',
                component: ComponentCreator('/category/2-perception', '22d'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/3-reasoning',
                component: ComponentCreator('/category/3-reasoning', '87e'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/4-actuation',
                component: ComponentCreator('/category/4-actuation', '9a2'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/5-learning',
                component: ComponentCreator('/category/5-learning', 'f38'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/6-integration',
                component: ComponentCreator('/category/6-integration', '0aa'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/7-ethics--future',
                component: ComponentCreator('/category/7-ethics--future', 'e84'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/category/resources',
                component: ComponentCreator('/category/resources', '69c'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/ethics-and-future/lesson-01-safety-and-responsibility',
                component: ComponentCreator('/ethics-and-future/lesson-01-safety-and-responsibility', 'eba'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/ethics-and-future/lesson-02-ethical-considerations',
                component: ComponentCreator('/ethics-and-future/lesson-02-ethical-considerations', 'b7f'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/ethics-and-future/lesson-03-future-of-physical-ai',
                component: ComponentCreator('/ethics-and-future/lesson-03-future-of-physical-ai', '909'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/foundations/lesson-01-what-is-physical-ai',
                component: ComponentCreator('/foundations/lesson-01-what-is-physical-ai', '2fe'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/foundations/lesson-02-components-of-physical-ai',
                component: ComponentCreator('/foundations/lesson-02-components-of-physical-ai', 'fab'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/foundations/lesson-03-your-first-physical-ai-system',
                component: ComponentCreator('/foundations/lesson-03-your-first-physical-ai-system', '0da'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/glossary',
                component: ComponentCreator('/glossary', 'aff'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/integration/lesson-01-system-architecture',
                component: ComponentCreator('/integration/lesson-01-system-architecture', 'ec2'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/integration/lesson-02-real-time-processing',
                component: ComponentCreator('/integration/lesson-02-real-time-processing', 'a5e'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/integration/lesson-03-capstone-autonomous-robot',
                component: ComponentCreator('/integration/lesson-03-capstone-autonomous-robot', '396'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/learning/lesson-01-machine-learning-for-robotics',
                component: ComponentCreator('/learning/lesson-01-machine-learning-for-robotics', 'b9b'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/learning/lesson-02-reinforcement-learning-intro',
                component: ComponentCreator('/learning/lesson-02-reinforcement-learning-intro', '0c0'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/learning/lesson-03-training-your-physical-ai',
                component: ComponentCreator('/learning/lesson-03-training-your-physical-ai', '26b'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/perception/lesson-01-sensors-and-sensing',
                component: ComponentCreator('/perception/lesson-01-sensors-and-sensing', '4d8'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/perception/lesson-02-computer-vision-basics',
                component: ComponentCreator('/perception/lesson-02-computer-vision-basics', '3bd'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/perception/lesson-03-processing-sensor-data',
                component: ComponentCreator('/perception/lesson-03-processing-sensor-data', 'dbb'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/reasoning/lesson-01-decision-making-fundamentals',
                component: ComponentCreator('/reasoning/lesson-01-decision-making-fundamentals', '6cb'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/reasoning/lesson-02-state-machines-and-behavior',
                component: ComponentCreator('/reasoning/lesson-02-state-machines-and-behavior', '105'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/reasoning/lesson-03-planning-and-navigation',
                component: ComponentCreator('/reasoning/lesson-03-planning-and-navigation', 'ebc'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/resources/additional-resources',
                component: ComponentCreator('/resources/additional-resources', 'af6'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/resources/hardware-guide',
                component: ComponentCreator('/resources/hardware-guide', '564'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/resources/software-setup',
                component: ComponentCreator('/resources/software-setup', '613'),
                exact: true,
                sidebar: "bookSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '7e7'),
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
