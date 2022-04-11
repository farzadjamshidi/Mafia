import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }

}
