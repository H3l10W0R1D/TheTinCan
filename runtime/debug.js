global["getCaller"] = () => {
    let c, e, o, f, r;
    [_, e, o] = [undefined, new Error(), Error.prepareStackTrace];
    Error.prepareStackTrace = (_, s) => s;
    f = a => a.stack.shift().getFileName();
    [c, r] = [f(e), _];
    for (let _ in e.stack) {
        r = f(e);
        if (r != c) break;
    }
    Error.prepareStackTrace = o;
    return r;
}

exports.info = info => {
    if (info) {
        if (info instanceof Error) {
            console.error(info);
        }
        else if (info instanceof Object) {
            try {
                console.log(`[${getCaller()}] : ${JSON.stringify(info, null, 4)}`);
            } catch (error) {
                [info.author, info.file, info.callback] = [undefined, undefined, undefined];
                console.log(`[${getCaller()}] : ${JSON.stringify(info)}`);
            }
        }
        else {
            console.log(`[${getCaller()}] : ${info}`);
        }    
    }
}
