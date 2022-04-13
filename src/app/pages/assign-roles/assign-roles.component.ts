import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPlayersRequest } from 'src/app/core/models/get-players.model';
import { Player, PlayerRole, PlayerRoleByCount, roles } from 'src/app/core/models/player.model';
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
  rolesByCount: PlayerRoleByCount[] = [];
  maxPlayerNumber: number = 20;
  rolesCount: number[] = [];
  isDeactiveNextStep: boolean = true;

  constructor(
    private router: Router,
    @Inject('IPlayerRepo') private playerRepo: IPlayerRepo
  )
  {
  }

  ngOnInit(): void
  {
    this.rolesCount = Array.from(Array(this.maxPlayerNumber + 1).keys());

    this.rolesByCount = roles.map(role =>
    {
      return {
        role: role,
        count: 0
      };
    });

    const request: GetPlayersRequest =
    {
    };

    this.subscriptions.add(
      this.playerRepo.list(request).subscribe({
        next: (res) =>
        {
          this.players = res.players;
        },
        error: (err) =>
        {
        }
      })
    );

  }

  transformNumberedEnumToKeyValues(numberedEnum: { [key: string | number]: string | number; }): { name: string; value: number; }[]
  {
    const keyValueEnum: { name: string; value: number; }[] = [];

    for (let item in numberedEnum)
    {
      if (isNaN(Number(item)))
      {
        keyValueEnum.push({
          name: item,
          value: Number(numberedEnum[item])
        });
      }
    }

    return keyValueEnum;
  }

  changeRoleComboBox(): void
  {
    this.checkIsDeactiveNextStep();
  }

  checkIsDeactiveNextStep(): void
  {
    this.isDeactiveNextStep = this.players.length !== this.rolesByCount.reduce((acc, curr) => { return acc + curr.count; }, 0);
  }

  saveAndGoToNext(): void
  {

    const finalRoles: PlayerRole[] = [];

    this.rolesByCount.forEach(roleByCount =>
    {
      for (let i = 0; i < roleByCount.count; i++)
      {
        finalRoles.push(roleByCount.role);
      }
    });

    this.shuffle(finalRoles).forEach((role, index) =>
    {
      this.players[index].role = role;
    });

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

  shuffle(array: any[])
  {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0)
    {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
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
