function log(message, where = "BOT", who = "") {
    var now = new Date();
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    let date = now.toLocaleString("ru", options);
    let log_str = `[${date}] (${where}) ${who} ${message}`
    console.log(log_str)

    fs.appendFile("log.txt", log_str, function (error) {
        if (error) throw console.error(error);
    });
}

exports.log = log;