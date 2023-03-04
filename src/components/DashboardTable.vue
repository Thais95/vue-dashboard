<template>
  <div class="dashboard-container">
    <DataTable :value="licitacoes.data" v-model:filters="filters" v-model:expandedRows="expandedRows" :loading="loading" :paginator="true" :rows="5" responsiveLayout="scroll">
      <template #header>
        <InputText v-model="filters['global'].value" aria-placeholder="Buscar" />
      </template>
      <Column field="orgao" header="Órgão"></Column>
      <Column :expander="true" headerStyle="width: 3rem" header="Itens" />
      <Column field="objeto" header="Objeto"></Column>
      <Column field="idLicitacao" header="Id"></Column>
      <Column field="dataPublicacao" header="Data de Publicação"></Column>

      <template #expansion="slotProps">
        <div class="orders-subtable">
          <h3>Itens da Licitação {{slotProps.data.idLicitacao}}</h3>
          <DataTable :value="slotProps.data.itensEdital" responsiveLayout="scroll">
            <Column field="item" header="Item"></Column>
            <Column field="lote" header="Lote"></Column>
            <Column field="produtoLicitado" header="Produto"></Column>
            <Column field="diferenciado" header="Tratamento"></Column>
            <Column field="quantidade" header="Quantidade"></Column>
          </DataTable>
        </div>
      </template>

    </DataTable>
  </div>
</template>

<script>
import LicitacaoService from '../services/licitacaoService';
import { FilterMatchMode } from 'primevue/api';

export default {
  name: 'DashboardTable',
  data() {
    return {
      licitacoes: [],
      loading: true,
      licitacaoService: null,
      expandedRows: [],
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
      }
    }
  },
  created() {
    this.licitacaoService = new LicitacaoService();
  },
  mounted() {
    this.pegarLicitacoes();
  },
  methods: {
    async pegarLicitacoes() {
      this.loading = true;
      this.licitacoes = [];
      await this.licitacaoService.getLicitacoes().then((data) => {
        console.log(data);
        this.licitacoes = data;
        this.loading = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 60%;
}
</style>
