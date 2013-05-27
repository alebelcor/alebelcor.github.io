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

        cssmin: {
            dist: {
                src : 'public/css/style.css',
                dest: 'public/css/style.css'
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
            generate: {
                command: 'hexo generate'
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
                files  : ['source/**/*.md', 'themes/**/*.ejs'],
                tasks  : ['shell:generate']
            },
            styles: {
                files: ['public/css/style.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('generate', 'shell:generate');
};
