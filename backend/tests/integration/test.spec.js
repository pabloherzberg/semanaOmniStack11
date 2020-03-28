const supertest = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', ()=>{

  let res

  beforeAll( async ()=>{
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async ()=>{
    await connection.destroy()
  })

  it('Deve criar uma nova ONG', async ()=>{
    const response = await supertest(app)
                      .post('/ongs')
                      .send({
                        
                          name: "ABAP",
                          email: "contato@apad.com.br",
                          whatsapp: "53981053550",
                          city: "Pelotas",
                          uf: "RS"
                        
                      })
    
    res = response.body

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })

  it('Deve logar em algum perfil de ONG', async ()=>{

    const response = await supertest(app)
                            .post('/session')
                            .send({
  
                              id: res.id
  
                            })
  
    expect(response.body).toHaveProperty('name')
  })

  it('Deve listar ONGs', async ()=>{
    const response = await supertest(app).get('/ongs')
                         
    expect(response.body.length).toEqual(1)
  })

  it('Deve criar um caso para um profile', async ()=>{
    const response = await supertest(app)
                              .post('/incidents')
                              .set('authorization', res.id)
                              .send({
                                
                                  title: "teste",
                                  description: "abadbadfbsadb",
                                  value: 50
                                
                              })

    expect(response.body).toHaveProperty('id')
  })

  it('Deve listar um profile com casos', async ()=>{
    const response = await supertest(app)
                            .get('/profile')
                            .set('authorization', res.id)

    
    expect(response.body.length).toEqual(1)
  })

  it('Deve deletar um caso de um profile', async () =>{
    const response = await supertest(app).get('/incidents')

    expect(response.body.length).toBeGreaterThan(0)
  })
})