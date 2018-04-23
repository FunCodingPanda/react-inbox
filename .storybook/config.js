import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/ToolbarComponent.story');
}

configure(loadStories, module);
