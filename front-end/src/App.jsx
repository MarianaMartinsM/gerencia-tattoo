import Cadastro from './Cadastro'
import Login from './Criar-Login'
import { useEffect, useState } from 'react'

function App() {
  const [tela, setTela] = useState('login')

  const [tatuagens, setTatuagens] = useState([])

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    preco_base: '',
    estilo: '',
    imagem: null,
    tatuador_id: 1
  })

  const [logado, setLogado] = useState(false)

  const buscarTatuagens = () => {
    fetch('http://localhost:3000/tatuagens')
      .then(res => res.json())
      .then(data => setTatuagens(data))
  }

  useEffect(() => {
    buscarTatuagens()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const dados = new FormData()

      dados.append('titulo', form.titulo)
      dados.append('descricao', form.descricao)
      dados.append('preco_base', form.preco_base)
      dados.append('estilo', form.estilo)
      dados.append('tatuador_id', form.tatuador_id)

      if (form.imagem) {
        dados.append('imagem', form.imagem)
      }

      const response = await fetch(
        'http://localhost:3000/tatuagens',
        {
          method: 'POST',
          body: dados
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao cadastrar')
      }

      buscarTatuagens()

      setForm({
        titulo: '',
        descricao: '',
        preco_base: '',
        estilo: '',
        imagem: null,
        tatuador_id: 1
      })

      alert('Tatuagem cadastrada com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao cadastrar tatuagem')
    }
  }

  const deletarTatuagem = (id) => {
    fetch(`http://localhost:3000/tatuagens/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => buscarTatuagens())
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
    fontSize: '16px',
    cursor: 'pointer'
  }

  if (!logado) {
    if (tela === 'cadastro') {
      return (
        <Cadastro
          voltar={() => setTela('login')}
        />
      )
    }

    return (
      <Login
        onLogin={() => setLogado(true)}
        irParaCadastro={() => setTela('cadastro')}
      />
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #000000 0%, #111111 45%, #ff6b00 100%)',
        display: 'flex',
        justifyContent: 'center',
        padding: '40px'
      }}
    >
      <div
        style={{
          width: '900px',
          background: 'rgba(0,0,0,0.95)',
          padding: '40px',
          borderRadius: '25px',
          border: '1px solid #ff6b00',
          boxShadow: '0 0 40px rgba(255,107,0,0.5)',
          color: 'white'
        }}
      >
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <button
            onClick={() => setLogado(false)}
            style={{
              background: '#ff4500',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>
        </div>

        <h2
          style={{
            textAlign: 'center',
            color: '#ff6b00'
          }}
        >
          Bem-vinda,{' '}
          {JSON.parse(
            localStorage.getItem('usuario')
          )?.nome}
        </h2>

        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          Cadastro de Tatuagens
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="preco_base"
            placeholder="Preço"
            value={form.preco_base}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="estilo"
            placeholder="Estilo"
            value={form.estilo}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({
                ...form,
                imagem: e.target.files[0]
              })
            }
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            type="submit"
          >
            Cadastrar
          </button>
        </form>

        <hr
          style={{
            borderColor: '#ff6b00',
            marginTop: '30px',
            marginBottom: '30px'
          }}
        />

        <h2 style={{ color: '#ff6b00' }}>
          Lista de Tatuagens
        </h2>

        {tatuagens.map(t => (
          <div
            key={t.id}
            style={{
              background: '#1a1a1a',
              border: '1px solid #ff6b00',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow:
                '0 0 15px rgba(255,107,0,0.3)'
            }}
          >
            <button
              onClick={() => deletarTatuagem(t.id)}
              style={{
                background: '#ff4500',
                border: 'none',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Excluir
            </button>

            {t.imagem_url && (
              <img
                src={`http://localhost:3000/uploads/${t.imagem_url}`}
                alt={t.titulo}
                style={{
                  width: '250px',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  display: 'block',
                  marginTop: '15px',
                  marginBottom: '15px'
                }}
              />
            )}

            <h3 style={{ color: '#ff6b00' }}>
              {t.titulo}
            </h3>

            <p>{t.descricao}</p>

            <p>
              <strong>Estilo:</strong> {t.estilo}
            </p>

            <p>
              <strong>Preço:</strong> R$ {t.preco_base}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App