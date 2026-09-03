import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }
}));

const Axios = require('axios').default;

test('renders the student registration and list', async () => {
  Axios.get.mockResolvedValue({ data: [] });

  render(<App />);
  expect(screen.getByText(/cadastro de aluno/i)).toBeInTheDocument();
  expect(screen.getByText(/lista de alunos/i)).toBeInTheDocument();

  await waitFor(() => expect(Axios.get).toHaveBeenCalledWith('http://localhost:3001/listar'));
});

test('executes create, update and delete from the client', async () => {
  const alunoInicial = { id: 1, nome: 'Ana', idade: 20 };
  const novoAluno = { id: 2, nome: 'Bia', idade: 22 };

  Axios.get
    .mockResolvedValueOnce({ data: [alunoInicial] })
    .mockResolvedValue({ data: [alunoInicial, novoAluno] });
  Axios.post.mockResolvedValue({
    data: { message: 'Aluno cadastrado com sucesso', aluno: novoAluno }
  });
  Axios.put.mockResolvedValue({
    data: { message: 'Aluno editado com sucesso' }
  });
  Axios.delete.mockResolvedValue({
    data: { message: 'Aluno excluído com sucesso' }
  });

  render(<App />);

  const findAluno = (nome) => screen
    .queryAllByRole('listitem')
    .find((item) => item.textContent.includes(nome));

  await waitFor(() => expect(findAluno('Ana')).toBeTruthy());

  fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Bia' } });
  fireEvent.change(screen.getByLabelText('Idade:'), { target: { value: '22' } });
  fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

  await waitFor(() => expect(Axios.post).toHaveBeenCalledWith(
    'http://localhost:3001/register',
    { nome: 'Bia', idade: '22' }
  ));
  await waitFor(() => expect(findAluno('Bia')).toBeTruthy());

  const itemAna = findAluno('Ana');
  fireEvent.click(within(itemAna).getByRole('button', { name: 'Editar' }));
  const [nomeEditado, idadeEditada] = within(itemAna).getAllByRole('textbox');
  fireEvent.change(nomeEditado, { target: { value: 'Ana Silva' } });
  fireEvent.change(idadeEditada, { target: { value: '21' } });
  fireEvent.click(within(itemAna).getByRole('button', { name: 'Salvar' }));

  await waitFor(() => expect(Axios.put).toHaveBeenCalledWith(
    'http://localhost:3001/editar/1',
    { nome: 'Ana Silva', idade: '21' }
  ));
  await waitFor(() => expect(findAluno('Ana Silva')).toBeTruthy());

  const itemBia = findAluno('Bia');
  fireEvent.click(within(itemBia).getByRole('button', { name: 'Excluir' }));

  await waitFor(() => expect(Axios.delete).toHaveBeenCalledWith('http://localhost:3001/excluir/2'));
  await waitFor(() => expect(findAluno('Bia')).toBeFalsy());
});
