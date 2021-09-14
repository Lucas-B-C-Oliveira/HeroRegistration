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

describe('Suite de manipulação de Heróis', () => {

    before(async () => {
        await database.register(DEFAULT_OBJECT_RECORD)
        await database.register(DEFAULT_OBJECT_UPDATE)
    })

    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_OBJECT_RECORD
        const [result] = await database.listar(expected.id)

        deepStrictEqual(result, expected)
    })

    it('deve cadastrar um herói, usando arquivos', async () => {

        const expected = DEFAULT_OBJECT_RECORD
        const result = await database.register(DEFAULT_OBJECT_RECORD)
        const [current] = await database.listar(DEFAULT_OBJECT_RECORD.id)
        deepStrictEqual(current, expected)
    })

    it('deve remover um herói por id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_OBJECT_RECORD.id)
        deepStrictEqual(result, expected)
    })

    it('deve atualizar um herói pelo id', async () => {
        
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