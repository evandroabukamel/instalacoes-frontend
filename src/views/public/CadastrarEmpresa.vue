<template>
  <div class="columns is-centered">
    <div class="column is-12-mobile is-8-tablet is-5-desktop">
      <h1 class="title is-clearfix has-text-centered">
        Cadastre-se como empresa especializada
      </h1>
      <b-message v-show="!successMessage" type="is-primary" :closable="false">
        <form
          name="cadastrarClienteForm"
          method="post"
          action="#"
          @submit.prevent="onSubmit"
          @keydown="form.errors.clear($event.target.name)"
          @change="form.errors.clear($event.target.name)"
        >
          <!-- ETAPA 1 -->
          <div v-show="etapa == 1">
            <!-- Dados do cliente -->
            <h2 class="subtitle">
              <span v-html="'Informa&ccedil;&otilde;es cadastrais'"></span>
            </h2>
            <input-text
              name="nome"
              v-model="form.nome"
              placeholder="Nome"
              size="is-medium"
              :has-error="form.errors.has('nome')"
              :error="form.errors.get('nome')"
            ></input-text>
            <input-text
              name="cpfcnpj"
              v-model="form.cpfcnpj"
              type="tel"
              placeholder="CPF / CNPJ"
              size="is-medium"
              :mask="['###.###.###-##', '##.###.###/####-##']"
              :has-error="form.errors.has('cpfcnpj')"
              :error="form.errors.get('cpfcnpj')"
            ></input-text>
            <div class="content"><!-- SPACE --></div>
            <!-- Contatos -->
            <h2 class="subtitle">Contatos</h2>
            <input-contato
              name="contato"
              v-on:add="form.addContato($event)"
              size="is-medium"
              :has-error="form.errors.has('contatos')"
              :error="form.errors.get('contatos')"
            ></input-contato>
            <lista-contato v-model="form.contatos"></lista-contato>
          </div>
          <!-- ETAPA 2 -->
          <div v-show="etapa == 2">
            <!-- Localização -->
            <h2 class="subtitle">
              <span v-html="'Localiza&ccedil;&atilde;o'"></span>
            </h2>
            <!-- FormEndereco -->
            <form-endereco
              ref="formEndereco"
              name="endereco"
              size="is-medium"
              v-model="form.endereco"
              @changed="form.errors.clear($event, 'endereco')"
              :has-error="form.errors.has('endereco')"
              :error="form.errors.get('endereco')"
            ></form-endereco>
            <div class="content"><!-- SPACE --></div>
            <!-- Mapa -->
            <here-maps
              v-if="etapa == 2"
              ref="hereMap"
              v-model="markers"
              @clickBuscarPosicao="buscarEnderecoPosicao"
              @markerPositioned="atualizaEnderecoPosicao($event)"
            ></here-maps>
            <div></div>
          </div>
          <!-- ETAPA 3 -->
          <div v-show="etapa == 3">
            <!-- Dados bancários -->
            <h2 class="subtitle">
              <span v-html="'Conta banc&aacute;ria'"></span>
            </h2>
            <!-- FormUsuario -->
            <select-ajax
              name="idBanco"
              v-model="form.idBanco"
              placeholder="Banco"
              control-type="is-primary"
              size="is-medium"
              api-route="/bancoGeral/listar"
              :has-error="form.errors.has('idBanco')"
              :error="form.errors.get('idBanco')"
              v-on:errorSelectAjax="form.setSelectError('idBanco', $event)"
            >
            </select-ajax>
            <div class="content"><!-- SPACE --></div>
            <input-text
              name="titularConta"
              v-model="form.titularConta"
              placeholder="Nome do Titular"
              size="is-medium"
              :has-error="form.errors.has('titularConta')"
              :error="form.errors.get('titularConta')"
            ></input-text>
            <input-text
              name="cpfTitular"
              v-model="form.cpfTitular"
              type="tel"
              placeholder="CPF / CNPJ do Titular"
              size="is-medium"
              :mask="['###.###.###-##', '##.###.###/####-##']"
              :has-error="form.errors.has('cpfTitular')"
              :error="form.errors.get('cpfTitular')"
            ></input-text>
            <input-text
              name="agencia"
              v-model="form.agencia"
              type="tel"
              placeholder="Agência"
              size="is-medium"
              :mask="['####', '####-#', '####-##']"
              :masked="true"
              :has-error="form.errors.has('agencia')"
              :error="form.errors.get('agencia')"
            ></input-text>
            <input-text
              name="conta"
              v-model="form.conta"
              type="tel"
              placeholder="Conta"
              size="is-medium"
              :mask="[
                '#####-#',
                '######-#',
                '#######-#',
                '########-#',
                '#########-#',
                '##########-#',
                '###########-#',
              ]"
              :masked="true"
              :has-error="form.errors.has('conta')"
              :error="form.errors.get('conta')"
            ></input-text>
            <div class="content"><!-- SPACE --></div>
          </div>
          <!-- ETAPA 4 -->
          <div v-show="etapa == 4">
            <!-- FormUsuario -->
            <form-usuario
              ref="formUsuario"
              name="usuario"
              size="is-medium"
              outterClass=""
              columnClass=""
              v-model="form.usuario"
              @changed="form.errors.clear($event, 'usuario')"
              :has-error="form.errors.has('usuario')"
              :error="form.errors.get('usuario')"
            >
            </form-usuario>
            <div class="content"><!-- SPACE --></div>
          </div>
          <!-- Botões -->
          <div class="columns is-flex-mobile">
            <div class="column is-half">
              <div class="control">
                <button
                  type="button"
                  class="button is-primary is-medium"
                  v-show="etapa > 1"
                  @click="etapa--"
                  @dblclick.prevent
                >
                  Voltar
                </button>
              </div>
            </div>
            <div
              class="column is-half field has-addons has-addons-right"
              v-show="etapa < 4"
            >
              <div class="control">
                <button
                  type="button"
                  class="button is-primary is-medium"
                  @click="etapa++"
                  @dblclick.prevent
                >
                  Continuar
                </button>
              </div>
            </div>
            <div
              class="column is-half field has-addons has-addons-right"
              v-if="etapa == 4"
            >
              <div class="control">
                <button
                  type="button"
                  class="button is-primary is-medium"
                  :class="{ 'is-loading': form.isLoading }"
                  @click="onSubmit"
                  @dblclick.prevent
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="content"><!-- SPACE --></div>
        <b-field v-if="Boolean(errorMessage)">
          <b-message
            type="is-danger"
            :active="Boolean(errorMessage)"
            :closable="false"
            :has-icon="false"
          >
            {{ errorMessage }}
          </b-message>
        </b-field>
      </b-message>
      <b-field v-if="Boolean(successMessage)">
        <b-message
          type="is-success"
          :active="Boolean(successMessage)"
          :closable="false"
          :has-icon="false"
        >
          {{ successMessage }}
        </b-message>
      </b-field>
    </div>
  </div>
</template>

<script>
import InputContato from '../../components/InputContato.vue';
import ListaContato from '../../components/ListaContato.vue';
import Endereco from '../../core/Endereco.js';
import FormEndereco from '../../components/FormEndereco.vue';
import FormUsuario from '../../components/FormUsuario.vue';
import HereMaps from '../../components/HereMaps.vue';

export default {
  components: {
    InputContato,
    ListaContato,
    HereMaps,
    FormEndereco,
    FormUsuario,
  },
  data() {
    return {
      form: new Form({
        nome: '',
        cpfcnpj: '',
        idBanco: null,
        titularConta: '',
        cpfTitular: '',
        conta: '',
        agencia: '',
        contatos: [],
        endereco: {},
        usuario: {},
      }),
      successMessage: null,
      errorMessage: null,
      markers: [],
      etapa: 1, // controla o exibição das etapas do cadastro
    };
  },
  computed: {},
  methods: {
    buscarEnderecoPosicao() {
      this.form.errors.clear('posicao', 'endereco');

      let position = null;

      // busca a posição para o endereço
      this.$refs.hereMap
        .searchPositionForAddress(this.form.endereco.toMapString())
        .then((response) => {
          // adiciona o marcador
          let marker = {
            position: {
              lat: response.Latitude,
              lng: response.Longitude,
            },
            draggable: true,
          };
          this.$refs.hereMap.addUniqueMarker(null, marker);
          // Salva os dados do marcador num array
          this.markers.push(marker);
        })
        .catch((response) => {
          // Nada é feito
        });
    },

    atualizaEnderecoPosicao(posicao) {
      this.form.errors.clear('posicao', 'endereco');
      this.form.endereco.posicao = {
        latitude: posicao.lat,
        longitude: posicao.lng,
      };
    },

    onSubmit() {
      this.clearMessages();
      this.form
        .post('/empresa/cadastrar')
        .then((response) => {
          // console.log(response);
          if (response.message) {
            this.successMessage = response.message;
          }
        })
        .catch((error) => {
          // console.log(error);
          this.etapa = 1;
          if (error.message) {
            this.errorMessage = error.message;
          }
        });
    },

    clearMessages() {
      this.successMessage = null;
      this.errorMessage = null;
    },
  },
};
</script>
