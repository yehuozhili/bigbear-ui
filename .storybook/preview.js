import "../src/styles/index.scss";
import { create } from "@storybook/theming";
import { addParameters, configure } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
		PreviewSource: "open"
	},
	options: {
		theme: create({
			brandTitle: "BigBear-UI",
			brandUrl: "https://github.com/yehuozhili/bigbear-ui"
		})
	},
	dependencies: {
		withStoriesOnly: true,
		hideEmpty: true
	}
});
const loaderFn = () => {
	return [
		require("../src/stories/Welcome.stories.mdx"),
		require("../src/stories/color.stories.mdx"),
		require("../src/components/Layout/layout.stories.mdx"),
		require("../src/components/Grid/grid.stories.mdx"),
		require("../src/components/Divider/divider.stories.mdx"),
		require("../src/components/Alert/alert.stories.mdx"),
		require("../src/components/Avatar/avatar.stories.mdx"),
		require("../src/components/Badge/badge.stories.mdx"),
		require("../src/components/Button/button.stories.mdx"),
		require("../src/components/Card/card.stories.mdx"),
		require("../src/components/Carousel/carousel.stories.mdx"),
		require("../src/components/Input/input.stories.mdx"),
		require("../src/components/InputNumber/inputnumber.stories.mdx"),
		require("../src/components/Switch/switch.stories.mdx"),
		require("../src/components/Radio/radio.stories.mdx"),
		require("../src/components/CheckBox/checkbox.stories.mdx"),
		require("../src/components/Select/select.stories.mdx"),
		require("../src/components/MultiSelect/multiselect.stories.mdx"),
		require("../src/components/AutoComplete/autocomplete.stories.mdx"),
		require("../src/components/Form/form.stories.mdx"),
		require("../src/components/Upload/upload.stories.mdx"),
		require("../src/components/List/list.stories.mdx"),
		require("../src/components/VirtualList/virtuallist.stories.mdx"),
		require("../src/components/Icon/icon.stories.mdx"),
		require("../src/components/Pagination/pagination.stories.mdx"),
		require("../src/components/Table/table.stories.mdx"),
		require("../src/components/Modal/modal.stories.mdx"),
		require("../src/components/Menu/menu.stories.mdx"),
		require("../src/components/Menu/menuitem.stories.mdx"),
		require("../src/components/Menu/submenu.stories.mdx"),
		require("../src/components/Progress/progress.stories.mdx"),
		require("../src/components/Popconfirm/popconfirm.stories.mdx"),
		require("../src/components/Message/message.stories.mdx"),
		require("../src/components/I18n/i18n.stories.mdx"),
		require("../src/page/login.stories.mdx"),
		require("../src/page/register.stories.mdx"),
		require("../src/components/Transition/transition.stories.mdx"),
		require("../src/hooks/useForm.stories.mdx"),
		require("../src/hooks/useClickOutside.stories.mdx"),
		require("../src/hooks/useDebounce.stories.mdx"),
		require("../src/hooks/useStopScroll.stories.mdx"),
		require("../src/hooks/useControlReverse.stories.mdx")
	];
};
configure(loaderFn, module);
