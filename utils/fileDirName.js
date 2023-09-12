const {dirname} = require("path")

const { fileURLToPath } = require("url")

function fileDirName(meta){
    const __filename = fileURLToPath(meta.url)
    const __dirname = dirname(__filename)

    return { __dirname, __filename}
}
module.exports = fileDirName()