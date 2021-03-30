let getUploadFileName = (ext) => {
    return new Date().getTime() + "." + ext
}

module.exports = getUploadFileName