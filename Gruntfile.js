module.exports = function (grunt) {
	// Project configuration
	const autoprefixer = require('autoprefixer');
	const flexibility = require('postcss-flexibility');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		postcss: {
			options: {
				map: false,
				processors: [flexibility],
			},
			style: {
				expand: true,
				src: ['assets/css/**.css', '!assets/css/**-rtl.css'],
			},
		},
		rtlcss: {
			options: {
				// rtlcss options
				config: {
					preserveComments: true,
					greedy: true,
				},
				// generate source maps
				map: false,
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'assets/css',
						src: ['*.css', '!*-rtl.css'],
						dest: 'assets/css/',
						ext: '-rtl.css',
					},
				],
			},
		},

		cssmin: {
			options: {
				keepSpecialComments: 0,
			},
			css: {
				files: [
					{
						expand: true,
						src: ['**/*.css', '!**/*-rtl.css'],
						dest: 'assets/css/minified',
						cwd: 'assets/css/unminified',
						ext: '.min.css',
					},
				],
			},
		},

		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!node_modules/**',
					'!build/**',
					'!css/sourcemap/**',
					'!.git/**',
					'!bin/**',
					'!.gitlab-ci.yml',
					'!bin/**',
					'!tests/**',
					'!phpunit.xml.dist',
					'!*.sh',
					'!*.map',
					'!*.zip',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!phpunit.xml',
					'!README.md',
					'!sass/**',
					'!codesniffer.ruleset.xml',
					'!vendor/**',
					'!composer.json',
					'!composer.lock',
					'!package-lock.json',
					'!phpcs.xml.dist',
				],
				dest: 'domain-name-generator/',
			},
		},
		compress: {
			main: {
				options: {
					archive: 'domain-name-generator-<%= pkg.version %>.zip',
					mode: 'zip',
				},
				files: [
					{
						src: ['./domain-name-generator/**'],
					},
				],
			},
		},
		clean: {
			main: ['domain-name-generator'],
			zip: ['*.zip'],
		},
		makepot: {
			target: {
				options: {
					domainPath: '/',
					mainFile: 'domain-name-generator.php',
					potFilename: 'languages/domain-name-generator.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true,
					},
					type: 'wp-plugin',
					updateTimestamp: true,
				},
			},
		},
		addtextdomain: {
			options: {
				textdomain: 'domain-name-generator',
				updateDomains: true,
			},
			target: {
				files: {
					src: [
						'*.php',
						'**/*.php',
						'!node_modules/**',
						'!php-tests/**',
						'!bin/**',
						'!admin/bsf-core/**',
					],
				},
			},
		},

		bumpup: {
			options: {
				updateProps: {
					pkg: 'package.json',
				},
			},
			file: 'package.json',
		},

		replace: {
			plugin_main: {
				src: ['domain-name-generator.php'],
				overwrite: true,
				replacements: [
					{
						from: /Version: \bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?(?:\+[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?\b/g,
						to: 'Version: <%= pkg.version %>',
					},
				],
			},

			plugin_const: {
				src: ['classes/class-wpc-loader.php'],
				overwrite: true,
				replacements: [
					{
						from: /WPC_VER', '.*?'/g,
						to: "WPC_VER', '<%= pkg.version %>'",
					},
				],
			},
		},

		/* Minify Js and Css */
		cssmin: {
			options: {
				keepSpecialComments: 0,
			},
			css: {
				files: [
					{
						expand: true,
						cwd: 'assets/css',
						src: ['*.css'],
						dest: 'assets/min-css',
						ext: '.min.css',
					},
				],
			},
		},

		uglify: {
			js: {
				options: {
					compress: {
						drop_console: true, // <-
					},
				},
				files: [
					{
						expand: true,
						cwd: 'assets/js',
						src: ['*.js'],
						dest: 'assets/min-js',
						ext: '.min.js',
					},
				],
			},
		},
	});

	// Load grunt tasks
	//grunt.loadNpmTasks( 'grunt-rtlcss' );
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wp-i18n');
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Autoprefix
	grunt.registerTask('style', ['postcss:style']);
	grunt.registerTask('release', [
		'clean:zip',
		'copy',
		'compress',
		'clean:main',
	]);
	grunt.registerTask('i18n', ['addtextdomain', 'makepot']);

	// min all
	grunt.registerTask('minify', ['style', 'cssmin:css', 'uglify:js']);

	// Bump Version - `grunt version-bump --ver=<version-number>`
	grunt.registerTask('version-bump', function (ver) {
		let newVersion = grunt.option('ver');

		if (newVersion) {
			newVersion = newVersion ? newVersion : 'patch';

			grunt.task.run('bumpup:' + newVersion);
			grunt.task.run('replace');
		}
	});
};
