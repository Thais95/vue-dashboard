<template>
  <div class="dashboard-container">
    <DataTable :value="licitacoes.data" v-model:filters="filters" v-model:expandedRows="expandedRows" :loading="loading" :paginator="true" :rows="5" responsiveLayout="scroll" filterDisplay="row">

      <!-- <template class="table-header" #header>
        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
        <MultiSelect v-model="filters['global'].value" :options="licitacoes.palavraEncontrada" option-label="Palavras-Chave" />
      </template> -->

      <template v-if="!loading" #empty>
        Nenhum resultado encontrado.
      </template>
      <template #loading>
        Os dados estão carregando, por favor aguarde.
      </template>

      <Column field="idLicitacao" header="Id" sortable></Column>

      <Column style="font-weight: 600;" field="orgao" header="Órgão" sortable>
        <template #body="slotProps">
          {{ slotProps.data.orgao }}
        </template>
        <template>
          <InputText v-model="filters['global'].value" placeholder="Buscar..." />
        </template>
      </Column>

      <Column style="font-weight: 600;" field="uf" header="UF" sortable></Column>
      <Column field="portal" header="Portal" sortable></Column>

      <!-- MODALIDADES -->
      <Column field="modalidade" header="Modalidade" filterField="modalidade" :showFilterMenu="false">
        <template #body="slotProps">
          {{ slotProps.data.modalidade }}
        </template>
        <template #filter="{ filterModel,filterCallback }">
          <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="modalidade" placeholder="Selecione" class="p-column-filter" :filter="true">
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <span class="image-text">{{slotProps.option}}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>

      <!-- OBJETO -->
      <Column header="Objeto">
        <template #body="slotProps">
          {{ formatarTexto(slotProps.data.objeto) }}
        </template>
      </Column>

      <!-- ÍCONE DOS ITENS -->
      <Column :expander="true" headerStyle="width: 3rem" header="Itens"/>

      <!-- DATA INICIAL DA PROPOSTA -->
      <Column field="dataInicialProposta" header="Início" sortable></Column>

      <!-- DATA FINAL DA PROPOSTA -->
      <Column field="dataFinalProposta" header="Término" sortable></Column>

      <!-- EXPANSÃO DOS ITENS -->
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-eye" title="Mais informações" class="p-button-rounded p-button-info mr-2" @click="verDetalhes(slotProps.data)" />
          <Button icon="pi pi-paperclip" title="Anexos" class="p-button-rounded p-button-info" @click="verAnexos(slotProps.data.anexos)" />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="items-subtable">
          <h3>Itens da Licitação {{slotProps.data.idLicitacao}}</h3>
          <h5>Publicado em {{ slotProps.data.dataPublicacao }}</h5>
          <DataTable :value="slotProps.data.itensEdital" responsiveLayout="scroll">
            <template v-if="!loading" #empty>
              Nenhum resultado encontrado.
            </template>
            <template #loading>
              Os dados estão carregando, por favor aguarde.
            </template>
            <Column field="lote" header="Lote" sortable></Column>
            <Column field="item" header="Item" sortable></Column>
            <Column field="quantidade" header="Quantidade" sortable></Column>
            <Column header="Objeto">
              <template #body="slotProps">
                {{ formatarTexto(slotProps.data.produtoLicitado) }}
              </template>
            </Column>
            <Column field="diferenciado" header="Tratamento">
              <template #body="slotProps">
                {{  slotProps.data.diferenciado ? slotProps.data.diferenciado : 'Nada encontrado.'  }}
              </template>
            </Column>
          </DataTable>
        </div>
      </template>

    </DataTable>

    <Dialog v-model:visible="detalhesDialog" :style="{width: '450px'}" header="Mais Detalhes" :modal="true" class="p-fluid">
      <div>
        <span v-if="licitacao">{{ licitacao.objeto }}</span>
      </div>
    </Dialog>

    <Dialog v-model:visible="anexosDialog" :style="{width: '450px'}" header="Anexos da Licitação" :modal="true" class="p-fluid">
      <div 
      v-for="anexo in anexos">
        <p>{{ anexo.nome }}</p>
        <a :href="anexo.url">Download PDF</a>
      </div>
    </Dialog>
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
      detalhesDialog: false,
      anexosDialog: false,
      licitacao: {},
      anexos: [],
      filters: {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modalidade': { value: null, matchMode: FilterMatchMode.IN }
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
        this.licitacoes = data;
        this.loading = false;
      })
    },
    formatarTexto(string){
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
    },
    verDetalhes(licitacao) {
      this.licitacao = {...licitacao};
      this.detalhesDialog = true;
    },
    verAnexos(anexos) {
      this.anexos = [...anexos];
      this.anexosDialog = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
}

.items-subtable {
  padding: 0.3rem;
  background-color: #008cff;
  color: white;
  border-radius: 8px;
  h3 {
    text-align: center;
    cursor: default;
  }
  h5 {
    text-align: center;
    font-weight: 600;
    margin-top: -8px;
    cursor: default;
  }
}
</style>
