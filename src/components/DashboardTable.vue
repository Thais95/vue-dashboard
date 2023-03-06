<template>
  <div class="dashboard-container">
    <DataTable
     :value="licitacoes.data"
     v-model:filters="filters"
     v-model:expandedRows="expandedRows"
     :loading="loading"
     :rows="4"
     filterDisplay="row"
     :autoLayout="true"
     :paginator="true"
     :paginatorTemplate="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown'
      }"
      responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

      <template v-if="!loading" #empty>
        Nenhum resultado encontrado.
      </template>
      <template #loading>
        Os dados estão carregando, por favor aguarde.
      </template>

      <!-- ID -->
      <Column field="idLicitacao" header="Id" sortable :showFilterMenu="false" :showClearButton="false" headerStyle="min-width: 100px; max-width: 100px">
        <template #body="slotProps">
          {{ slotProps.data.idLicitacao }}
        </template>
        <template #filter="{filterModel,filterCallback}" v-if="!loading" :showClear="true">
          <InputText v-model="filters['idLicitacao'].value" placeholder="Id..." />
        </template>
      </Column>

      <!-- ÓRGÃO -->
      <Column style="font-weight: 600;" field="orgao" header="Órgão" sortable :showFilterMenu="false" :showClearButton="false" headerStyle="min-width: 200px; max-width: 200px">
        <template #body="slotProps">
          {{ slotProps.data.orgao ? slotProps.data.orgao : 'Nada encontrado.' }}
        </template>
        <template #filter="{filterModel,filterCallback}" v-if="!loading" :showClear="true">
          <InputText v-model="filters['orgao'].value" placeholder="Órgão..." />
        </template>
      </Column>

      <!-- ESTADO -->
      <Column field="uf" header="UF" sortable :showFilterMenu="false" :showClearButton="false" headerStyle="min-width: 100px; max-width: 100px">
        <template #body="slotProps">
          {{ slotProps.data.uf ? slotProps.data.uf : 'Nada encontrado.' }}
        </template>

        <template #filter="{filterModel,filterCallback}" v-if="!loading">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="estados" placeholder="UF..." :showClear="true">
            <template #value="slotProps">
              <span v-if="slotProps.value">{{slotProps.value}}</span>
              <span v-else>{{slotProps.placeholder}}</span>
            </template>
            <template #option="slotProps">
              <span>{{slotProps.option}}</span>
            </template>
          </Dropdown>
        </template>
      </Column>

      <!-- PORTAL -->
      <Column field="portal" header="Portal" sortable :showFilterMenu="false" :showClearButton="false" headerStyle="min-width: 200px; max-width: 200px">
        <template #body="slotProps">
          {{  slotProps.data.portal ? slotProps.data.portal : 'Nada encontrado.'  }}
        </template>
        <template #filter="{filterModel,filterCallback}" v-if="!loading" :showClear="true">
          <InputText v-model="filters['portal'].value" placeholder="Portal..." />
        </template>
      </Column>

      <!-- MODALIDADES -->
      <Column field="modalidade" header="Modalidade" :showFilterMenu="false" :showClearButton="false" headerStyle="min-width: 200px; max-width: 200px">
        <template #body="slotProps">
          <span>{{slotProps.data.modalidade}}</span>
        </template>

        <template #filter="{filterModel,filterCallback}" v-if="!loading">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="modalidades" placeholder="Modalidade..." :showClear="true">
            <template #value="slotProps">
              <span v-if="slotProps.value">{{slotProps.value}}</span>
              <span v-else>{{slotProps.placeholder}}</span>
            </template>
            <template #option="slotProps">
              <span>{{slotProps.option}}</span>
            </template>
          </Dropdown>
        </template>
      </Column>

      <!-- OBJETO -->
      <Column header="Objeto" style="min-width: 320px;" :showFilterMenu="false" :showClearButton="false" >
        <template #body="slotProps">
          {{ formatarTexto(slotProps.data.objeto) }}
        </template>
        <template #filter="{filterModel,filterCallback}" v-if="!loading" :showClear="true" headerStyle="min-width: 200px; max-width: 200px">
          <InputText v-model="filters['objeto'].value" placeholder="Objeto..." />
        </template>
      </Column>

      <!-- ÍCONE DOS ITENS -->
      <Column :expander="true" headerStyle="width: 3rem" header="Itens"/>

      <!-- DATA INICIAL DA PROPOSTA -->
      <Column field="dataInicialProposta" header="Início" sortable>
        <template #body="slotProps">
          {{  slotProps.data.dataInicialProposta ? slotProps.data.dataInicialProposta : 'Nada encontrado.'  }}
        </template>
      </Column>

      <!-- DATA FINAL DA PROPOSTA -->
      <Column field="dataFinalProposta" header="Término" sortable>
        <template #body="slotProps">
          {{  slotProps.data.dataFinalProposta ? slotProps.data.dataFinalProposta : 'Nada encontrado.'  }}
        </template>
      </Column>

      <!-- ÍCONES DE "MAIS INFORMAÇÕES" E "ANEXOS" -->
      <Column :exportable="false" header="Ações">
        <template #body="slotProps">
          <Button icon="pi pi-eye" title="Mais informações" class="p-button-rounded p-button-info" style="width: 38px; height: 38px; margin-bottom: 8px;" @click="verDetalhes(slotProps.data)" />
          <Button icon="pi pi-paperclip" title="Anexos" class="p-button-rounded p-button-info" style="width: 38px; height: 38px;" @click="verAnexos(slotProps.data.anexos)" />
        </template>
      </Column>

      <!-- SUBMENU COM ITENS DA LICITAÇÃO -->
      <template #expansion="slotProps">
        <div class="items-subtable">
          <h3>Itens da Licitação {{slotProps.data.idLicitacao}}</h3>
          <h5>Publicado em {{ slotProps.data.dataPublicacao }}</h5>
          <DataTable :value="slotProps.data.itensEdital" responsiveLayout="scroll" class="items-subtable-list">
            <template v-if="!loading" #empty>
              Nada encontrado.
            </template>
            <template #loading>
              Os dados estão carregando, por favor aguarde.
            </template>
            <Column field="lote" header="Lote" sortable style="min-width: 100px; max-width: 100px;"></Column>
            <Column field="item" header="Item" sortable style="min-width: 100px; max-width: 100px;"></Column>
            <Column field="quantidade" header="Quantidade" sortable style="min-width: 100px; max-width: 100px;"></Column>
            <Column header="Objeto" style="max-width: 600px; min-width: 600px;">
              <template #body="slotProps">
                {{ formatarTexto(slotProps.data.produtoLicitado) }}
              </template>
            </Column>
            <Column field="diferenciado" header="Tratamento" style="min-width: 200px; max-width: 200px;">
              <template #body="slotProps">
                {{  slotProps.data.diferenciado ? slotProps.data.diferenciado : 'Nada encontrado.'  }}
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>

    <!-- MODAL DE MAIS INFORMAÇÕES -->
    <Dialog v-model:visible="detalhesDialog" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '500px'}" header="Mais informações" :modal="true">
      <div
      class="modal-detalhes"
      >
        <div class="container-palavras">
          <template
          v-for="(palavra, index) in licitacao.palavraEncontrada"
          :key="index"
          >
            <span class="palavras">{{ palavra }}</span>
          </template>
        </div>

        <div class="mais-detalhes">
          <p>UASG:</p>
          <span>{{ licitacao.uasg }}</span>
        </div>

        <div class="mais-detalhes">
          <p>SRP?</p>
          <span>{{ licitacao.srp ? "Sim" : "Não" }}</span>
        </div>

        <div class="mais-detalhes">
          <p>Favorito?</p>
          <span>{{  licitacao.favorito ? "Sim" : "Não"  }}</span>
        </div>
      </div>
    </Dialog>

    <!-- MODAL DE ANEXOS -->
    <Dialog v-model:visible="anexosDialog" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '500px'}" header="Anexos da Licitação" :modal="true" contentClass="modal-anexo">
      <div
      class="modal-anexos">
        <article
        v-for="(anexo, index) in anexos"
        :key="index"
        >
          <p>{{ anexo.nome }}</p>
          <a :href="anexo.url" title="Clique para baixar o PDF do Edital">Download PDF</a>
        </article>
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
      licitacaoService: null,
      loading: true,
      detalhesDialog: false,
      anexosDialog: false,
      licitacao: {},
      licitacoes: [],
      modalidades: [],
      estados: [],
      expandedRows: [],
      anexos: [],
      filters: {
        'idLicitacao': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'orgao': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modalidade': { value: null, matchMode: FilterMatchMode.EQUALS },
        'uf': { value: null, matchMode: FilterMatchMode.EQUALS },
        'portal': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'objeto': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    }
  },
  created() {
    this.licitacaoService = new LicitacaoService();
  },
  mounted() {
    this.pegarLicitacoes();
  },
  updated() {
    if(this.licitacoes.data) {
      this.filtrarModalidades();
      this.filtrarEstados();
    }
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
    filtrarModalidades() {
      const modalidadesFiltradas = Array.from(new Set(this.licitacoes.data.map((obj) => obj.modalidade)));
      this.modalidades = modalidadesFiltradas.sort();
    },
    filtrarEstados() {
      const estadosFiltrados = Array.from(new Set(this.licitacoes.data.map((obj) => obj.uf)));
      this.estados = estadosFiltrados.sort();
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
  background-color: var(---primary);
  color: white;
  border-radius: 8px;
  padding: 10px;
  .items-subtable-list {
    background-color: white;
  }
  h3 {
    text-align: center;
    cursor: default;
    margin-bottom: 8px;
    font-size: 1.6rem;
    font-weight: 600;
  }
  h5 {
    text-align: center;
    font-weight: 500;
    cursor: default;
    margin-bottom: 12px;
    font-size: 1rem;
  }
}
.modal-anexos {
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  article {
    font-weight: 500;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(---secondary);
  }
  a {
    color: darken($color: #008cff, $amount: 12);
    transition: 0.2s;
    &:hover {
      transition: 0.2s;
      color: var(---primary);
    }
  }
}
.modal-detalhes {
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 32px;
  padding: 20px;
  border-radius: 8px;
  .container-palavras {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    cursor: default;
    .palavras {
      padding: 10px;
      display: block;
      width: auto;
      border-radius: 8px;
      background-color: var(---secondary);
      color: white;
      font-weight: 500;
    }
  }
  .mais-detalhes {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 1.1rem;
    p {
      font-weight: 600;
      color: var(---secondary);
    }
    span {
      font-weight: 500;
    }
  }
}
</style>
