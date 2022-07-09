import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogDataModel } from 'src/app/components/confirmation-dialog/confirmation-dialog.model';
import { Player, PlayerStatusEnum } from 'src/app/core/models/player.model';
import { PostPlayersRequest } from 'src/app/core/models/post-players.model';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy
{

  players: Player[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    @Inject('IPlayerRepo') private playerRepo: IPlayerRepo
  )
  {
  }

  ngOnInit(): void
  {
  }

  addPlayer(playerName: string): void
  {
    const newPlayer = new Player();
    newPlayer.id = Math.random().toString();
    newPlayer.name = playerName;
    newPlayer.revealed = false;
    newPlayer.status = PlayerStatusEnum.Alive;
    this.players.push(newPlayer);
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
          this.router.navigate(['/assign-roles']);
        },
        error: () =>
        {
        }
      }
      ));
  }

  deletePlayer(player: Player): void
  {
    const data = new ConfirmationDialogDataModel({
      title: 'PLAYERS.DELETE_PLAYER',
      content: this.translate.instant('PLAYERS.DELETE_PLAYER_CONTENT', { playerName: player.name })
    });

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result: boolean) =>
      {
        if (result)
          this.players = this.players.filter(p => p.id !== player.id);
      })
    );

  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }

}
