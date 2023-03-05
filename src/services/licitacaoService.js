import { API } from '../api/api';

export default class LicitacaoService {
  async getLicitacoes() {
    try {
      const data = await API.get('/licitacoes');
      await new Promise(resolve => {
        return setTimeout(() => resolve(''), 2500)
      })
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
