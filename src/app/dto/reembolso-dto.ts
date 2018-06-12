export class ReembolsoDTO {

  constructor(
    public id: number,
    public descricao: string,
    public categoria: string,
    public data: string,
    public status: string,
    public idUsuario: number,
    public nomeUsuario: string,
    public arquivoPath: string,
    public valor: string
  ) { }

}
