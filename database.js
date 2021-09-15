const { readFile, writeFile } = require('fs')
const { promisify } = require('util')


const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.FILE_NAME = 'heroes.json'
    }

    async getDataOfFile() {
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString())
    }

    async writeFile(date) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(date))
        return true
    }

    async register(hero) {
        const data = await this.getDataOfFile()
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
        const date = await this.getDataOfFile()
        const filteredData = date.filter(item => (id ? (item.id === id) : true))
        return filteredData
    }

    async remove(id) {
        if(!id) {
            return await this.writeFile([])
        }
        
        const data = await this.getDataOfFile()
        const index = data.findIndex(item => item.id === parseInt(id))

        if(index === -1) {
            throw Error('The informed hero does not exist!')
        }

        data.splice(index, 1)
        return await this.writeFile(data)

    }

    async update(id, modification) {
        const data = await this.getDataOfFile()
        const index = data.findIndex(item => item.id === parseInt(id))

        if(index === -1) {
            throw Error('The informed hero does not exist!')
        }

        const current = data[index]
        const objectUpdated = {
            ...current,
            ...modification
        }

        data.splice(index, 1)

        return await this.writeFile([
            ...data,
            objectUpdated
        ])
    }

}

module.exports = new Database()