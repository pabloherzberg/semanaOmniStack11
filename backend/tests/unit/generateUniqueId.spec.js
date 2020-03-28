const generateUniqueId = require('../../src/utils/generateUniqueId')



describe('Generate Unique ID', ()=>{
  it('deve gerar um ID unico', ()=>{
    const id = generateUniqueId()

    expect(id).toHaveLength(8)
  })
})