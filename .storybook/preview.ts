import type { Preview } from '@storybook/react';
import React, { Suspense } from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'fullscreen'
  },
  decorators: [
    (Story) =>
      React.createElement(
        Suspense,
        { fallback: React.createElement('div', null, 'Loading…') },
        React.createElement(Story)
      )
  ]
};

export default preview;
