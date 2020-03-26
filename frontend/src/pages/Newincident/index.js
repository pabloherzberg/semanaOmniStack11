import React, { useState } from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Newincident(){
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleNewIncident(e){
    e.preventDefault()
    const data = { title, description, value}

    try{
      await api.post('incidents', data, {
        headers:{
          authorization: ongId
        }
      })
      history.push('/profile')
    }catch(err){
      alert(err)
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo be the hero"/>
          
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          
          <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color='#e02141'/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input  
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Título do caso'/>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Descrição'/>
          <input  
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Valor em reais'/>

          <button className='button' type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}