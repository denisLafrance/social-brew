


const pageNotFound = (req, res, next) => {
    const error = new Error(`Not found ++++++ ${req.originalUrl} +++++++ THIS PAGE DOESN'T EXIST ON SOCIAL BREW`);
    res.status(404);
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   // console.log('hello')
    res.status(statusCode)
    res.json({
        note: `THIS IS A ${statusCode} ERROR`,
        message: err.message,
        statusCode: statusCode,
        stack: process.env.NODE.ENV === 'production' ? null : err.stack
    })
 }


export {
    pageNotFound,
    errorHandler
}