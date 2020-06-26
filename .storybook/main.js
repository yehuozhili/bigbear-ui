const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
let maxAssetSize = 1024 * 1024;
let minSize = 30000;
module.exports = {
	stories: ["../src/**/*.stories.(tsx|mdx)"],
	addons: [
		"@storybook/preset-create-react-app",
		"@storybook/addon-actions",
		"@storybook/addon-links",
		{
			name: "@storybook/addon-docs",
			options: {
				configureJSX: true
			}
		},
		"@storybook/addon-viewport/register"
	],
	managerWebpack: async (config) => {
		config.optimization.splitChunks = { chunks: "all", maxSize: maxAssetSize };
		const isprod = config.mode === "production";
		let tser = isprod
			? [
					new TerserPlugin({
						terserOptions: {
							parse: {
								ecma: 8
							},
							compress: {
								ecma: 5,
								warnings: false,
								comparisons: false,
								inline: 2
							},
							mangle: {
								safari10: true
							},
							output: {
								ecma: 5,
								comments: false,
								ascii_only: true
							}
						}
					})
			  ]
			: [];
		config.performance = {
			maxAssetSize: maxAssetSize
		};
		config.optimization = {
			minimizer: tser,
			minimize: isprod ? true : false,
			splitChunks: {
				chunks: "all",
				maxSize: maxAssetSize,
				minSize
			},
			runtimeChunk: true
		};
		//config.plugins.push(new BundleAnalyzerPlugin())
		return config;
	},
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve("react-docgen-typescript-loader"),
					options: {
						shouldExtractLiteralValuesFromEnum: true,
						propFilter: (prop) => {
							if (prop.parent) {
								return !prop.parent.fileName.includes("node_modules");
							}
							return true;
						}
					}
				}
			]
		});
		config.module.rules.push({
			test: /\.(gif|jpe?g|png|svg)$/,
			use: {
				loader: "url-loader",
				options: { name: "[name].[ext]" }
			}
		});
		const isprod = config.mode === "production";
		isprod ? (config.devtool = "none") : null;

		let tser = isprod ? config.optimization.minimizer : [];

		config.performance = {
			maxAssetSize: maxAssetSize
		};
		config.optimization = {
			minimizer: tser,
			minimize: isprod ? true : false,
			splitChunks: {
				chunks: "all",
				maxSize: maxAssetSize,
				minSize
			},
			runtimeChunk: true
		};
		//config.plugins.push(new BundleAnalyzerPlugin())
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	}
};
