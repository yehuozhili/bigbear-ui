module.exports = {
	extends: [
		"stylelint-config-standard",
		"stylelint-config-sass-guidelines",
		"stylelint-config-prettier"
	],
	plugins: ["stylelint-order", "stylelint-scss"],
	rules: {
		"declaration-property-value-blacklist": null,
		"max-nesting-depth": null,
		"no-descending-specificity": null,
		"selector-max-compound-selectors": null
	}
};
