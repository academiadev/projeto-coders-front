export const environment = {
  production: true,
  backEndUrl: 'https://powerful-retreat-98533.herokuapp.com',
  tokenName: 'access_token',
  urls: {
    auth: {
      login: 'https://powerful-retreat-98533.herokuapp.com/login',
      refresh: 'https://powerful-retreat-98533.herokuapp.com/refresh',
      recuperarSenha: 'https://powerful-retreat-98533.herokuapp.com/recuperarSenha'
    },
    empresa: {
      url: 'https://powerful-retreat-98533.herokuapp.com/empresa'
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
