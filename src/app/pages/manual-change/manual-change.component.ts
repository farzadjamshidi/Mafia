import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GetPlayersRequest } from 'src/app/core/models/get-players.model';
import { ManualActionEnum, Player, PlayerRole, PlayerStatusEnum } from 'src/app/core/models/player.model';
import { PostPlayersRequest } from 'src/app/core/models/post-players.model';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-manual-change',
  templateUrl: './manual-change.component.html',
  styleUrls: ['./manual-change.component.scss']
})
export class ManualChangeComponent implements OnInit, OnDestroy
{

  players: Player[] = [];
  subscriptions: Subscription = new Subscription();
  selectedPlayer: Player = new Player();
  manualActions: { name: string; value: number; }[] = [];
  selectedAction!: { name: string; value: number; };

  constructor(
    private traslate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject('IPlayerRepo') private playerRepo: IPlayerRepo
  )
  {
  }

  ngOnInit(): void
  {
    this.manualActions = this.transformNumberedEnumToKeyValues(ManualActionEnum);
    this.selectedPlayer.role = new PlayerRole();

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
  };

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

  saveChanges(): void
  {
    const selectedPlayer = this.players.find(p => p.id === this.selectedPlayer.id)!;

    switch (this.selectedAction.value)
    {
      case ManualActionEnum.Killing:
        selectedPlayer.status = PlayerStatusEnum.Dead;
        break;
      case ManualActionEnum.MakeAlive:
        selectedPlayer.status = PlayerStatusEnum.Alive;
        break;
      default:
        break;
    }

    const request: PostPlayersRequest = {
      players: this.players
    };

    this.subscriptions.add(
      this.playerRepo.saveAll(request).subscribe({
        next: () =>
        {
          this.snackBar.open(
            this.traslate.instant("GENERAL.SUCCESS_MESSAGE"),
            '',
            {
              duration: 2000
            }
          );
        },
        error: () =>
        {
        }
      }
      ));
  };

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }
}
