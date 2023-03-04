import { API } from '../api/api';

export const pegarLicitacoes = async () => {
  try {
    const { data } = await API.get('/licitacoes');
    await new Promise(resolve => {
      return setTimeout(() => resolve(''), 2000)
    })
    return data;
  } catch (error) {
    console.log(error);
  }
}
