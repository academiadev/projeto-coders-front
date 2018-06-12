import { EmpresaDTO } from '../dto/empresa-dto';

export class UsuarioDTO {

  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public senha: string,
    public isAdmin: boolean,
    public empresa: EmpresaDTO
  ) { }

}
