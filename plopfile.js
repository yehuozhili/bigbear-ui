module.exports = function(plop) {
	// controller generator
	plop.addHelper("lowerCase", function(p) {
		return p.toLowerCase().trim();
	});
	plop.setGenerator("component", {
		description: "create component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "component name please"
			}
		],
		actions: [
			{
				type: "add",
				path: "src/components/{{name}}/{{lowerCase name}}.tsx",
				templateFile: "plop-template/component.hbs"
			},
			{
				type: "add",
				path: "src/components/{{name}}/index.tsx",
				templateFile: "plop-template/componentIndex.hbs"
			},
			{
				type: "add",
				path: "src/components/{{name}}/_style.scss",
				templateFile: "plop-template/componentStyle.hbs"
			},
			{
				type: "add",
				path: "src/components/{{name}}/{{lowerCase name}}.stories.mdx",
				templateFile: "plop-template/componentStories.hbs"
			}
		]
	});
};
