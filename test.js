const { deepStrictEqual, ok } = require('assert')

const database = require('./database')
const DEFAULT_OBJECT_RECORD = {
    name: 'Flash',
    power: 'Speed',
    id: 1
}
const DEFAULT_OBJECT_UPDATE = {
    name: 'Green Lantern',
    power: 'Power of the Ring',
    id: 2
}

describe('Hero manipulation suite', () => {

    before(async () => {
        await database.register(DEFAULT_OBJECT_RECORD)
        await database.register(DEFAULT_OBJECT_UPDATE)
    })

    it('must search for a hero using files', async () => {
        const expected = DEFAULT_OBJECT_RECORD
        const [result] = await database.listar(expected.id)

        deepStrictEqual(result, expected)
    })

    it('must register a hero, using files', async () => {

        const expected = DEFAULT_OBJECT_RECORD
        const result = await database.register(DEFAULT_OBJECT_RECORD)
        const [current] = await database.listar(DEFAULT_OBJECT_RECORD.id)
        deepStrictEqual(current, expected)
    })

    it('must remove a hero by id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_OBJECT_RECORD.id)
        deepStrictEqual(result, expected)
    })

    it('must update a hero by id', async () => {
        
        const expected = {
            ...DEFAULT_OBJECT_UPDATE,
            name: 'Batman',
            power: 'Money'
        }
        const newData = {
            name: 'Batman',
            power: 'Money'
        }
        await database.update(DEFAULT_OBJECT_UPDATE.id, newData)
        const [result] = await database.listar(DEFAULT_OBJECT_UPDATE.id)
        deepStrictEqual(result, expected)
    })

})