const exec = require('child_process').exec;

const runJs = (uid, filename, callback) => {
    exec(`docker run --name ${uid} --rm=false compiler:node`, function (error, stdout, stderr) {
        exec(`docker cp files/${uid} ${uid}:/src/${filename}`, function (error, stdout, stderr) {
            exec(`docker commit ${uid} ${uid}:${filename}`, function (error, stdout, stderr) {
                exec(`docker run --name run_${uid} --rm=true ${uid}:${filename} node ${filename}`, function (error, stdout, stderr) {
                    exec(`docker rm ${uid}`);
                    exec(`docker rmi ${uid}:${filename}`);
                    return callback(stdout);
                });
            });
        });
    });
}

module.exports = runJs