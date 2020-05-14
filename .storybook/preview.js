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
    options:{
        theme:create({
            brandTitle:'BigBear-UI',
            brandUrl:'https://github.com/yehuozhili/bigbear-ui'
        })
    }
});
const loaderFn = () => {
    return [
        require('../src/stories/Welcome.stories.mdx'),
        require('../src/components/Button/button.stories.mdx')
    ]
}
configure(loaderFn, module);