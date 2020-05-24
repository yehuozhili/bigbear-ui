import '../src/styles/index.scss'
import { create } from '@storybook/theming';
import { addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
        PreviewSource: 'open',
    },
    options: {
        theme: create({
            brandTitle: 'BigBear-UI',
            brandUrl: 'https://github.com/yehuozhili/bigbear-ui'
        }),
    },
    dependencies: {
        withStoriesOnly: true,
        hideEmpty: true,
    }
});
const loaderFn = () => {
    return [
        require('../src/stories/Welcome.stories.mdx'),
        require('../src/components/Button/button.stories.mdx'),
        require('../src/components/Input/input.stories.mdx'),
        require('../src/components/Alert/alert.stories.mdx'),
        require('../src/components/Menu/menu.stories.mdx'),
        require('../src/components/Menu/menuitem.stories.mdx'),
        require('../src/components/Menu/submenu.stories.mdx'),
        require('../src/components/Icon/icon.stories.mdx'),
        require('../src/components/Transition/transition.stories.mdx'),
        require('../src/components/Message/message.stories.mdx'),
    ]
}
configure(loaderFn, module);

