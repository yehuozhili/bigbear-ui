import '../src/styles/index.scss'

import { addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
        PreviewSource: 'open',
    },
});
const loaderFn = () => {
    return [
        require('../src/stories/Welcome.stories.mdx'),
        require('../src/components/Button/button.stories.mdx')
    ]
}
configure(loaderFn, module);