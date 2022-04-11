import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPlayersRequest } from 'src/app/core/models/get-players.model';
import { Player, PlayerRoleEnum, PlayerRoleGroupEnum } from 'src/app/core/models/player.model';
import { PostPlayersRequest } from 'src/app/core/models/post-players.model';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.scss']
})
export class AssignRolesComponent implements OnInit, OnDestroy
{
  subscriptions: Subscription = new Subscription();
  players: Player[] = [];
  roles: Role[] = [];
  roleGroups: RoleGroup[] = [];

  constructor(
    private router: Router,
    @Inject('IPlayerRepo') private playerRepo: IPlayerRepo
  )
  {
  }

  ngOnInit(): void
  {
    this.roles = this.transformNumberedEnumToKeyValues(PlayerRoleEnum);
    this.roleGroups = this.transformNumberedEnumToKeyValues(PlayerRoleGroupEnum);

    const request: GetPlayersRequest =
    {
    };

    this.subscriptions.add(
      this.playerRepo.list(request).subscribe({
        next: (res) =>
        {
          this.players = res.players;
          console.log(this.players);
        },
        error: (err) =>
        {
        }
      })
    );

  }

  transformNumberedEnumToKeyValues(numberedEnum: { [key: string | number]: string | number; }): Role[]
  {
    const roles: Role[] = [];

    for (let item in numberedEnum)
    {
      if (isNaN(Number(item)))
      {
        roles.push({
          name: item,
          value: Number(numberedEnum[item])
        });
      }
    }

    return roles;
  }

  changeRoleComboBox(event: MatSelectChange, player: Player): void
  {
    if (event.value)
    {
      this.players.find(p => p.id === player.id)!.role = event.value as PlayerRoleEnum;
    }
    else
    {
    }
  }

  changeRoleGroupComboBox(event: MatSelectChange, player: Player): void
  {
    if (event.value)
    {
      this.players.find(p => p.id === player.id)!.roleGroup = event.value as PlayerRoleGroupEnum;
    }
    else
    {
    }
  }

  saveAndGoToNext(): void
  {
    const request: PostPlayersRequest = {
      players: this.players
    };

    this.subscriptions.add(
      this.playerRepo.saveAll(request).subscribe({
        next: () =>
        {
          this.router.navigate(['/night-phase']);
        },
        error: () =>
        {
        }
      }
      ));
  }

  goToPrevious(): void
  {
    this.router.navigate(['/players']);
  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }

}

class Role
{
  name!: string;
  value!: PlayerRoleEnum;
}

class RoleGroup
{
  name!: string;
  value!: PlayerRoleEnum;
}
