// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backEndUrl: 'http://localhost:8080',
  tokenName: 'access_token',
  urls: {
    auth: {
      login: 'http://localhost:8080/login',
      refresh: 'http://localhost:8080/refresh',
      recuperarSenha: 'http://localhost:8080/recuperarSenha'
    },
    empresa: {
      url: 'http://localhost:8080/empresa'
    },
    usuario: {
      cadastro: 'http://localhost:8080/cadastrarUsuario',
      listar: 'http://localhost:8080/listarUsuarioEmpresa',
      editar: 'http://localhost:8080/editarUsuario',
      whoami: 'http://localhost:8080/whoami',
      pesquisaUsuario: 'http://localhost:8080/pesquisaUsuario',
      trocaSenha: 'http://localhost:8080/trocarSenha'
    },
    reembolso: {
      editar: 'http://localhost:8080/editarReembolso',
      cadastrar: 'http://localhost:8080/cadastrarReembolso',
      buscarReembolsosUsuario: 'http://localhost:8080/listaReembolsosUsuario',
      buscarReembolsosEmpresa: 'http://localhost:8080/listaReembolsosEmpresa',
      alteraStatusReembolso: 'http://localhost:8080/alterarStatusReembolso',
      excluir: 'http://localhost:8080/excluirReembolso',
      salvarArquivo: 'http://localhost:8080/salvarArquivo',
      downloadArquivo: 'http://localhost:8080/downloadArquivo'
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
