export class TokenDTO {

  constructor(
    public accessToken: string,
    public expiresIn: number
  ) { }

}
