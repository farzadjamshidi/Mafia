export class Player
{
  id!: string;
  name!: string;
  role!: PlayerRoleEnum;
  roleGroup!: PlayerRoleGroupEnum;
  status!: PlayerStatusEnum;
  revealed!: boolean;
}

export enum PlayerRoleEnum
{
  Godfather = 1,
  DrLecter,
  Mafia,
  Joker,
  Detective,
  Sheriff,
  Citizen,
  Sniper,
  Doctor,
  Bodyguard,
  Angel,
  Psychologist
}

export enum PlayerRoleGroupEnum
{
  Mafia = 1,
  Citizen
}

export enum PlayerStatusEnum
{
  Alive = 1,
  Dead
}
