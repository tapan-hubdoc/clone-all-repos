var request = require('request');
var util = require('util')
var exec = require('child_process').exec;

function exit_if_err(err){ 
	if (err){ 
		console.error(err); 
		process.exit(1) 
	} 
}

function log(error, stdout, stderr) { 
	exit_if_err(error); 
	console.log(stdout);
	console.log(stderr);
}

var access_token = process.env.GITHUB_ACCESS_TOKEN;
var organization = process.env.GITHUB_ORGANIZATION || "hubdoc";

var base_url = 'https://api.github.com/orgs/' + organization;
var repos_endpoint = base_url + '/repos?access_token=' + access_token;

var options = {
  url: repos_endpoint,
  headers: {
    'User-Agent': organization,
    'Accept': 'application/json'
  }
};

request(options, function(err, res, json){
	exit_if_err(err);
	var repos;
	try {
		repos = JSON.parse(json);
	} catch (err){
		exit_if_err(err)
	}
	var num_repos = repos.length;
	var r = 0;
	for (; r < num_repos; r++){
		exec("git clone " + repos[r].ssh_url, {cwd: __dirname + "/../.."}, log);
	}
})
