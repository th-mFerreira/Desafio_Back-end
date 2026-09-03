import { useState } from 'react';
import './App.css';
import CadastroAluno from './components/CadastroAluno';
import ListaAlunos from './components/ListaAlunos';

function App() {
  const [atualizacaoLista, setAtualizacaoLista] = useState(0);

  const handleAlunoCadastrado = () => {
    setAtualizacaoLista((valorAtual) => valorAtual + 1);
  };

  return (
    <div className="App">
      <CadastroAluno onAlunoCadastrado={handleAlunoCadastrado} />
      <ListaAlunos atualizacao={atualizacaoLista} />
    </div>
  );
}

export default App;
