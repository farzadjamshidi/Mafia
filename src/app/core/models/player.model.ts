export class Player
{
  id!: string;
  name!: string;
  role!: PlayerRole | Bodyguard;
  status!: PlayerStatusEnum;
  revealed!: boolean;
}

export class PlayerRole
{
  name!: string;
  value!: PlayerRoleEnum;
  roleGroup!: PlayerRoleGroupEnum;
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
  BodyguardWithoutGuard,
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

export enum ManualActionEnum
{
  MakeAlive = 1,
  Killing
}

export class Godfather extends PlayerRole
{
  override name = 'Godfather';
  override value = PlayerRoleEnum.Godfather;
  override roleGroup = PlayerRoleGroupEnum.Mafia;
}
export class DrLecter extends PlayerRole
{
  override name = 'DrLecter';
  override value = PlayerRoleEnum.DrLecter;
  override roleGroup = PlayerRoleGroupEnum.Mafia;
}
export class Mafia extends PlayerRole
{
  override name = 'Mafia';
  override value = PlayerRoleEnum.Mafia;
  override roleGroup = PlayerRoleGroupEnum.Mafia;
}
export class Joker extends PlayerRole
{
  override name = 'Joker';
  override value = PlayerRoleEnum.Joker;
  override roleGroup = PlayerRoleGroupEnum.Mafia;
}
export class Detective extends PlayerRole
{
  override name = 'Detective';
  override value = PlayerRoleEnum.Detective;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Sheriff extends PlayerRole
{
  override name = 'Sheriff';
  override value = PlayerRoleEnum.Sheriff;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Citizen extends PlayerRole
{
  override name = 'Citizen';
  override value = PlayerRoleEnum.Citizen;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Sniper extends PlayerRole
{
  override name = 'Sniper';
  override value = PlayerRoleEnum.Sniper;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Doctor extends PlayerRole
{
  override name = 'Doctor';
  override value = PlayerRoleEnum.Doctor;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Bodyguard extends PlayerRole
{
  override name = 'Bodyguard';
  override value = PlayerRoleEnum.Bodyguard;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
  lives: number = 2;
}
export class BodyguardWithoutGuard extends PlayerRole
{
  override name = 'BodyguardWithoutGuard';
  override value = PlayerRoleEnum.BodyguardWithoutGuard;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Angel extends PlayerRole
{
  override name = 'Angel';
  override value = PlayerRoleEnum.Angel;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}
export class Psychologist extends PlayerRole
{
  override name = 'Psychologist';
  override value = PlayerRoleEnum.Psychologist;
  override roleGroup = PlayerRoleGroupEnum.Citizen;
}

export const roles: PlayerRole[] = [
  new Godfather(),
  new DrLecter(),
  new Mafia(),
  new Joker(),
  new Detective(),
  new Sheriff(),
  new Citizen(),
  new Sniper(),
  new Doctor(),
  new Bodyguard(),
  new BodyguardWithoutGuard(),
  new Angel(),
  new Psychologist()
];

export class PlayerRoleByCount
{
  role!: PlayerRole;
  count!: number;
}
