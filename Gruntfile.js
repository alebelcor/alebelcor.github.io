module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        clean: {
            options: {
                force: true
            },
            deploy: ['public'],
            all   : ['public', 'db.json']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments            : true,
                    collapseBooleanAttributes : true,
                    removeAttributeQuotes     : true,
                    removeRedundantAttributes : true,
                    useShortDoctype           : true,
                    removeEmptyAttributes     : true
                },
                files: [{
                    expand: true,
                    cwd   : 'public',
                    src   : ['**/*.html'],
                    dest  : 'public'
                }]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd   : 'public',
                    src   : ['**/*.css', '!**/*.min.css'],
                    dest  : 'public'
                }]
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive      : true
                },
                files: [{
                    expand: true,
                    cwd   : 'public',
                    src   : '**/*.{png,jpg,jpeg,gif,webp,svg}',
                    dest  : 'public'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    base     : 'public'
                }
            }
        },

        shell: {
            options: {
                failOnError: true
            },
            generate: {
                command: 'hexo generate'
            },
            deploy: {
                command: [
                    'cd .deploy',
                    'rm -rf *',
                    'cd ..',
                    'cp -r public/* .deploy/',
                    'cd .deploy',
                    'git add -A',
                    'git commit -m "Site updated: ' + new Date() + '"'

                    // INFO: apparently we can't do a git push using grunt-shell
                    // saying something like:
                    // Warning: Command failed: Permission denied (publickey).
                    // fatal: The remote end hung up unexpectedly
                    //
                    // so pushing will have to remain a manual step
                ].join('&&')
            }
        },

        watch: {
            options: {
                livereload: true
            },
            config: {
                files: ['**/*.yml', 'themes/**/*.ejs'],
                tasks: ['clean:all', 'shell:generate', 'htmlmin']
            },
            posts: {
                files: ['source/**/*.md'],
                tasks: ['shell:generate', 'htmlmin']
            },
            styles: {
                files: ['public/**/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('generate', [
        'shell:generate',
        'imagemin',
        'htmlmin',
        'cssmin'
    ]);

    grunt.registerTask('deploy', [
        'shell:generate',
        'imagemin',
        'htmlmin',
        'cssmin',
        'shell:deploy'
    ]);
};
