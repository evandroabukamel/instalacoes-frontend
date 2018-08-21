webpackJsonp([36],{1932:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a(94),o=(s=i)&&s.__esModule?s:{default:s};e.default={mixins:[o.default],data:function(){return{data:[],total:0,loading:!1,sortField:"e.nome",sortOrder:"asc",defaultSortOrder:"asc",page:1,perPage:20,text:""}},methods:{rating:function(t){var e=parseFloat(t);return e<2?"is-danger":e>=2&&e<4?"is-warning":e>=4?"is-success":void 0},buscar:_.debounce(function(){this.getList()},1500),onPageChange:function(t){this.page=t,this.getList()},onSort:function(t,e){this.sortField=t,this.sortOrder=e,this.getList()},getList:function(){var t=this;this.loading=!0,this.$route.meta.situacao&&(this.text=this.$route.meta.situacao),this.axios.get("/empresa/getList/page="+this.page+"&perPage="+this.perPage+"&text="+this.text+"&sortField="+this.sortField+"&sortOrder="+this.sortOrder).then(function(e){var a=e.data;t.data=[];var s=a.totalResults;a.totalResults/t.perPage>1e3&&(s=1e3*t.perPage),t.total=s,a.results.forEach(function(e){return t.data.push(e)}),t.loading=!1}).catch(function(e){t.data=[],t.total=0,t.loading=!1,t.$toast.open({message:e.data.message?e.data.message:"Falha ao carregar dados, tente novamente.",type:"is-warning",position:"is-top",duration:5e3})})}},mounted:function(){this.getList()}},t.exports=e.default},1974:function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticClass:"title is-clearfix"},[t._v("Lista de empresas")]),t._v(" "),a("div",{staticClass:"is-clearfix"},[t.$route.meta.situacao?t._e():a("b-field",{attrs:{position:"is-right",addons:!0,grouped:""}},[a("b-input",{attrs:{placeholder:"Procurar...",type:"search",icon:"magnify"},on:{input:function(e){t.buscar()}},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1),t._v(" "),a("b-table",{staticClass:"table is-fullwidth",attrs:{data:t.data,loading:t.loading,paginated:"","backend-pagination":"",total:t.total,"per-page":t.perPage,"backend-sorting":"","default-sort-direction":t.defaultSortOrder,"default-sort":[t.sortField,t.sortOrder],"mobile-cards":!0},on:{"page-change":t.onPageChange,sort:t.onSort},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-table-column",{attrs:{field:"e.nome",label:"Nome",sortable:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.nome)+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"e.cpfcnpj",label:"CPF/CNPJ",sortable:""}},[t._v("\n\t\t\t\t\t"+t._s(t._f("formatCpfCnpj")(e.row.cpfcnpj))+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"e.classificacao",label:"Classificação",centered:"",sortable:""}},[a("span",{staticClass:"tag is-medium",class:t.rating(e.row.classificacao)},[t._v("\n\t\t\t\t\t\t"+t._s(e.row.classificacao)+"\n\t\t\t\t\t")])]),t._v(" "),a("b-table-column",{attrs:{field:"en.cidade",label:"Localização",sortable:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.localizacao)+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"e.idSituacao",label:"Situação",sortable:""}},[t._v("\n\t\t\t\t\t"+t._s(t._f("capitalize")(e.row.situacao))+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{label:"Ações",numeric:""}},[a("router-link",{staticClass:"icon",attrs:{to:{name:"cadastro-empresa",params:{id:e.row.id}},title:"Editar"}},[a("b-icon",{attrs:{icon:"pencil",size:"is-medium"}})],1)],1)]}}])},[a("template",{slot:"empty"},[a("section",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],staticClass:"section"},[a("div",{staticClass:"content has-text-grey has-text-centered"},[a("p",[a("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),a("p",[t._v("Nada foi encontrado.")])])])])],2)],1)])},staticRenderFns:[]};e.a=s},578:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1932),i=a.n(s);for(var o in s)["default","default"].indexOf(o)<0&&function(t){a.d(e,t,function(){return s[t]})}(o);var n=a(1974),r=a(39)(i.a,n.a,!1,null,null,null);e.default=r.exports}});