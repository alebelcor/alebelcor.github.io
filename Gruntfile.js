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
                    'cp -r public/* .deploy/'

                    // INFO: apparently we can't do a git push using grunt-shell
                    // so that will have to still be a manual step
                ].join('&&')
            }
        },

        watch: {
            options: {
                livereload: true
            },
            config: {
                files: ['**/*.yml'],
                tasks: ['clean:all', 'shell:generate']
            },
            posts: {
                files: ['source/**/*.md', 'themes/**/*.ejs'],
                tasks: ['shell:generate', 'htmlmin']
            },
            styles: {
                files: ['public/**/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('generate', ['shell:generate', 'htmlmin']);
    grunt.registerTask('deploy', 'shell:deploy');
};
