import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/core/models/player.model';
import { PostPlayersRequest } from 'src/app/core/models/post-players.model';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-night-phase',
  templateUrl: './night-phase.component.html',
  styleUrls: ['./night-phase.component.scss']
})
export class NightPhaseComponent implements OnInit, OnDestroy
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

  saveAndGoToNext(): void
  {
    const request: PostPlayersRequest = {
      players: this.players
    };

    this.subscriptions.add(
      this.playerRepo.saveAll(request).subscribe({
        next: () =>
        {
          this.router.navigate(['/day-phase']);
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
