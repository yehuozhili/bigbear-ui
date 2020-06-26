const gulp = require("gulp");
const ts = require("gulp-typescript");

const paths = {
	dest: {
		esm: "dist/esm",
		cjs: "dist/cjs"
	},
	styles: "src/**/*.scss",
	scripts: ["src/**/*.{ts,tsx}", "!src/**/*.example.{ts,tsx}"]
};

function compileCJS() {
	const { dest, scripts } = paths;
	return gulp
		.src(scripts)
		.pipe(
			ts({
				outDir: "dist",
				target: "es5",
				module: "commonjs",
				declaration: true,
				jsx: "react",
				moduleResolution: "node",
				allowSyntheticDefaultImports: true
			})
		)
		.pipe(gulp.dest(dest.cjs));
}

function compileESM() {
	const { dest, scripts } = paths;
	return gulp
		.src(scripts)
		.pipe(
			ts({
				outDir: "dist",
				target: "es5",
				module: "esnext",
				declaration: true,
				jsx: "react",
				moduleResolution: "node",
				allowSyntheticDefaultImports: true
			})
		)
		.pipe(gulp.dest(dest.esm));
}

function copyScss() {
	return gulp
		.src(paths.styles)
		.pipe(gulp.dest(paths.dest.esm))
		.pipe(gulp.dest(paths.dest.cjs));
}

const build = gulp.parallel(copyScss, compileCJS, compileESM);
exports.build = build;

exports.default = build;
