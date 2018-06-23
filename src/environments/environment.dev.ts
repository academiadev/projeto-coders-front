export const environment = {
  production: false,
  backEndUrl: 'http://localhost:8080',
  tokenName: 'access_token',
  urls: {
    auth: {
      login: 'http://localhost:8080/login',
      refresh: 'http://localhost:8080/refresh',
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
      trocaSenha: 'http://localhost:8080/trocar-senha'
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
