"use strict";

var fs = require('fs');
var env_dir = __dirname + "/env";

// Read in env vars
fs.readdirSync(env_dir).forEach(function (file) {
    var file_contents;

    if (!process.env[file]) {
        console.log("Setting: " + file);

        file_contents = fs.readFileSync(env_dir + "/" + file, "UTF-8");
        file_contents = file_contents.replace(/\n[\s\S]*/, '');
        process.env[file] = file_contents;
    }
});

require(__dirname + '/lib/clone_all_repos');