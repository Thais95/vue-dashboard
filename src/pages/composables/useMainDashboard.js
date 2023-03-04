import { ref } from 'vue';

import { pegarLicitacoes } from '../../services/licitacoes.service';

export function useMainDashboard() {
  const state = ref();

  async function fetchLicitacoes() {
    state.value.loader.isLoading = true;
    state.value.data.licitacoes = await pegarLicitacoes();
    state.value.data.currentLicitacoes = state.value.data.licitacoes;
    state.value.loader.isLoading = false;
  }

  function handleFilter() {
    const filter = state.value.form.inputFilter;

    if (filter) {
      state.value.data.currentLicitacoes = state.value.data.licitacoes.filter((licitacao) => {
        return licitacao.orgao.includes(filter)
      })
    } else {
      state.value.data.currentLicitacoes = state.value.data.licitacoes;
    }
  }

  return { state, fetchLicitacoes, handleFilter };
}
