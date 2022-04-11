export class Player
{
  id!: string;
  name!: string;
  role!: PlayerRoleEnum;
  roleGroup!: PlayerRoleGroupEnum;
}

enum PlayerRoleEnum
{
  Godfather,
  DrLecter,
  Mafia,
  Joker,
  Sheriff,
  Citizen,
  Sniper,
  Doctor,
  Bodyguard,
  Angel,
  Psychologist
}

enum PlayerRoleGroupEnum
{
  Mafia,
  Citizen
}
