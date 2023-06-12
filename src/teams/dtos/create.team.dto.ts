export class CreateTeamDto {
  private readonly _name: string;
  constructor(name: string) {
    this._name = name;
  }

  getName() {
    return this._name;
  }
}
