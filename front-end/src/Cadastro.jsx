import { useState } from 'react'

function Cadastro({ voltar }) {

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(
        'http://localhost:3000/tatuadores/cadastro',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: form.nome,
            email: form.email,
            senha: form.senha,
            especialidade: 'Tattoo Artist'
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      alert('Conta criada com sucesso!')

      setForm({
        nome: '',
        email: '',
        senha: ''
      })

      voltar()

    } catch (error) {
      console.error(error)
      alert('Erro ao criar conta')
    }
  }


  return (

    
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(180deg, #000000 0%, #111111 45%, #ff6b00 100%)'
      }}
    >
      <div
        style={{
          width: '450px',
          background: 'rgba(0,0,0,0.95)',
          padding: '40px',
          borderRadius: '25px',
          border: '1px solid #ff6b00',
          boxShadow: '0 0 40px rgba(255,107,0,0.5)'
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#ff6b00'
          }}
        >
          🦊 Criar Conta
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            name="nome"
            placeholder="Nome Completo"
            value={form.nome}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Criar Conta
          </button>

          <button
            type="button"
            onClick={voltar}
            style={voltarStyle}
          >
            Voltar para Login
          </button>

        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '12px',
  border: '1px solid #333',
  background: '#1a1a1a',
  color: 'white',
  boxSizing: 'border-box'
}

const buttonStyle = {
  width: '100%',
  padding: '15px',
  border: 'none',
  borderRadius: '12px',
  background: 'linear-gradient(90deg, #ff6b00 0%, #ff8c00 100%)',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
}

const voltarStyle = {
  width: '100%',
  padding: '15px',
  marginTop: '10px',
  borderRadius: '12px',
  border: '1px solid #ff6b00',
  background: 'transparent',
  color: '#ff6b00',
  cursor: 'pointer'
}

export default Cadastro