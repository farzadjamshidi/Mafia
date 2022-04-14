import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPlayersRequest } from 'src/app/core/models/get-players.model';
import { Player, PlayerRole } from 'src/app/core/models/player.model';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-show-roles',
  templateUrl: './show-roles.component.html',
  styleUrls: ['./show-roles.component.scss']
})
export class ShowRolesComponent implements OnInit, OnDestroy
{

  players: Player[] = [];
  subscriptions: Subscription = new Subscription();
  isDeactiveNextStep: boolean = true;
  selectedPlayer: Player = new Player();

  constructor(
    private router: Router,
    @Inject('IPlayerRepo') private playerRepo: IPlayerRepo
  )
  {
  }

  ngOnInit(): void
  {
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
  }

  goToPrevious(): void
  {
    this.router.navigate(['/assign-roles']);
  }

  saveAndGoToNext(): void
  {
    this.router.navigate(['/night-phase']);
  }

  changePlayerComboBox(event: MatSelectChange): void
  {
  }

  actionFinished(): void
  {
    this.players = [...this.players.filter(p => p.id !== this.selectedPlayer.id)];
    this.selectedPlayer = new Player();
    this.isDeactiveNextStep = this.players.length !== 0;
  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }
}
