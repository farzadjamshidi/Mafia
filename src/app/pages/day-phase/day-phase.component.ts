import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GetPlayersRequest } from 'src/app/core/models/get-players.model';
import { Player, PlayerRole, PlayerRoleEnum, PlayerRoleGroupEnum, PlayerStatusEnum } from 'src/app/core/models/player.model';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-day-phase',
  templateUrl: './day-phase.component.html',
  styleUrls: ['./day-phase.component.scss']
})
export class DayPhaseComponent implements OnInit, OnDestroy
{

  subscriptions: Subscription = new Subscription();
  isDeactiveNextStep: boolean = true;
  selectedPlayer: Player = new Player();
  selectedVotingPlayer: VotingPlayer = new VotingPlayer();
  votingPlayers: VotingPlayer[] = [];
  voterPlayers: Player[] = [];
  isSelectPlayersForVoteStep: boolean = true;
  isVotingStep: boolean = false;
  isReportStep: boolean = false;
  playerRoleEnum = PlayerRoleEnum;

  sheriffAction: any;////////////

  constructor(
    private translate: TranslateService,
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
          this.voterPlayers = res.players.filter(p => p.status === PlayerStatusEnum.Alive);
          this.votingPlayers = res.players.filter(p => p.status === PlayerStatusEnum.Alive).map(player =>
          {
            return {
              ...player,
              isSelected: false,
              count: 0
            };
          });

          const numberOfMafias = this.voterPlayers.filter(p => p.role.roleGroup === PlayerRoleGroupEnum.Mafia).length;
          if (numberOfMafias === 0)
          {
            alert(this.translate.instant("GENERAL.CITIZENS_WINS"));
          }
          if (numberOfMafias > this.voterPlayers.length - numberOfMafias)
          {
            alert(this.translate.instant("GENERAL.MAFIA_WINS"));
          }
        },
        error: (err) =>
        {
        }
      })
    );
  }

  selectPlayersForVoteFinished(): void
  {
    const copyVotingPlayers = [...this.votingPlayers];
    this.votingPlayers = copyVotingPlayers.filter(p => p.isSelected);
    this.voterPlayers = copyVotingPlayers.filter(p => !p.isSelected);
    this.isSelectPlayersForVoteStep = false;
    this.isVotingStep = true;
  }

  actionFinished(): void
  {
    if (this.selectedVotingPlayer && this.selectedVotingPlayer.id)
    {
      this.votingPlayers.find(p => p.id === this.selectedVotingPlayer.id)!.count++;
    }

    this.voterPlayers = [...this.voterPlayers.filter(p => p.id !== this.selectedPlayer.id)];
    this.selectedVotingPlayer = new VotingPlayer();
    this.selectedPlayer = new Player();
    this.selectedPlayer.role = new PlayerRole();
    this.isReportStep = this.voterPlayers.length === 0;
    this.isVotingStep = this.voterPlayers.length !== 0;
    this.isDeactiveNextStep = this.voterPlayers.length !== 0;
  }

  saveAndGoToNext(): void
  {
    this.router.navigate(['/night-phase']);
  }

  changePlayerComboBox(event: MatSelectChange): void
  {
  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }
}

class VotingPlayer extends Player
{
  isSelected: boolean = false;
  count!: number;
}
