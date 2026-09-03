import React, { useState } from 'react';
import Axios from "axios";

// Defina o componente CadastroAluno.
function CadastroAluno({ onAlunoCadastrado }) {
  // Defina o estado inicial para os valores do formulário.
  const [values, setValues] = useState({ nome: '', idade: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Função para manipular a mudança nos campos de entrada e atualizar o estado 'values'.
  const handleChangeValues = (value) => {
    // Use a função de atualização do estado para garantir que os valores antigos sejam preservados.
    setValues(prevValue => ({
      ...prevValue, // Mantém os valores antigos do objeto.
      [value.target.name]: value.target.value, // Atualiza o campo correspondente com o novo valor.
    }))
  };

  // Função para lidar com o clique no botão de cadastro.
  const handleClickButton = async (event) => {
    event.preventDefault();
    setMensagem('');
    setErro('');

    // Faça uma solicitação POST para a URL especificada com os dados do aluno.
    try {
      const response = await Axios.post("http://localhost:3001/register", {
        nome: values.nome,
        idade: values.idade
      });

      setValues({ nome: '', idade: '' });
      setMensagem(response.data.message);
      onAlunoCadastrado();
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.error || 'Não foi possível cadastrar o aluno');
    }
  }

  // Renderize o formulário de cadastro de aluno.
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
         <div className="bg-primary p-3 mt-3 p-4 bg-primary rounded">
          <h2>Cadastro de Aluno</h2>
          <form onSubmit={handleClickButton}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                className="form-control"
                 id="nome"
                 name='nome'
                 value={values.nome}
                 onChange={handleChangeValues}
                 required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idade">Idade:</label>
              <input
                type="number"
                name='idade'
                className="form-control"
                id="idade"
                value={values.idade}
                onChange={handleChangeValues}
                min="0"
                required
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Cadastrar
            </button>
           </form>
           {mensagem && <p className="alert alert-success mt-3">{mensagem}</p>}
           {erro && <p className="alert alert-danger mt-3">{erro}</p>}
           </div>    
        </div>
      </div>
     
    </div>
  );
}

// Exporte o componente CadastroAluno para uso em outros lugares.
export default CadastroAluno;
