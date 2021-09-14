const { readFile, writeFile } = require('fs')
const { promisify } = require('util')


const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.FILE_NAME = 'heroes.json'
    }

    async getDateOfFile() {
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString())
    }

    async writeFile(date) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(date))
        return true
    }

    async register(hero) {
        const data = await this.getDateOfFile()
        const id = hero.id <= 2 ? hero.id : Date.now()

        const heroWithId = {
            id,
            ...hero
        }
        const finalData = [
            ...data,
            heroWithId
        ]

        const result = await this.writeFile(finalData)
        return result
    }
    
    async listar(id) {
        const date = await this.getDateOfFile()
        const filteredData = date.filter(item => (id ? (item.id === id) : true))
        return filteredData
    }

}

module.exports = new Database()