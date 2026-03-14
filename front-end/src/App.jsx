import { useEffect, useState } from 'react'

function App() {
  const [tatuagens, setTatuagens] = useState([])
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    preco_base: '',
    estilo: '',
    tatuador_id: 1
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/tatuagens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        buscarTatuagens()
        setForm({
          titulo: '',
          descricao: '',
          preco_base: '',
          estilo: '',
          tatuador_id: 1
        })
      })
  }
const deletarTatuagem = (id) => {
  fetch(`http://localhost:3000/tatuagens/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(() => buscarTatuagens())
}
  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Tatuagens</h1>

      <form onSubmit={handleSubmit}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
        <br /><br />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <br /><br />
        <input name="preco_base" placeholder="Preço" value={form.preco_base} onChange={handleChange} />
        <br /><br />
        <input name="estilo" placeholder="Estilo" value={form.estilo} onChange={handleChange} />
        <br /><br />
        <button type="submit">Cadastrar</button>
      </form>

      <hr />

      <h2>Lista de Tatuagens</h2>

      {tatuagens.map(t => (
        <div key={t.id} style={{
          border: '1px solid #ccc',
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <button onClick={() => deletarTatuagem(t.id)}>Excluir</button>
          <h3>{t.titulo}</h3>
          <p>{t.descricao}</p>
          <p><strong>Estilo:</strong> {t.estilo}</p>
          <p><strong>Preço:</strong> R$ {t.preco_base}</p>
        </div>
      ))}
    </div>
  )
}

export default App