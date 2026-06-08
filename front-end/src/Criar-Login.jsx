import { useState } from 'react'

function Login({ onLogin, irParaCadastro }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:3000/tatuadores/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            senha
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      localStorage.setItem(
        'usuario',
        JSON.stringify(data.tatuador)
      )

      onLogin()

    } catch (error) {
      console.error(error)
      alert('E-mail ou senha inválidos')
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
          'linear-gradient(180deg, #000000 0%, #111111 45%, #ff6b00 100%)',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          width: '420px',
          background: 'rgba(0,0,0,0.95)',
          padding: '40px',
          borderRadius: '25px',
          boxShadow: '0 0 40px rgba(255,107,0,0.6)',
          border: '1px solid #ff6b00'
        }}
      >
        <h1
          style={{
            color: '#ff6b00',
            textAlign: 'center',
            fontSize: '3rem',
            marginBottom: '10px'
          }}
        >
          🦊
        </h1>

        <h2
          style={{
            color: '#ff6b00',
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '2rem'
          }}
        >
          Vanes Tattoo
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '12px',
              border: '1px solid #333',
              background: '#1a1a1a',
              color: 'white',
              boxSizing: 'border-box'
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '25px',
              borderRadius: '12px',
              border: '1px solid #333',
              background: '#1a1a1a',
              color: 'white',
              boxSizing: 'border-box'
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              border: 'none',
              borderRadius: '12px',
              background:
                'linear-gradient(90deg, #ff6b00 0%, #ff8c00 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={irParaCadastro}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              border: '1px solid #ff6b00',
              borderRadius: '10px',
              background: 'transparent',
              color: '#ff6b00',
              cursor: 'pointer'
            }}
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login