import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GetPlayersRequest } from 'src/app/core/models/get-players.model';
import { Bodyguard, Player, PlayerRole, PlayerRoleEnum, PlayerRoleGroupEnum, PlayerStatusEnum } from 'src/app/core/models/player.model';
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
  aliveAndNotSelectedPlayers: Player[] = [];
  subscriptions: Subscription = new Subscription();
  alivePlayers!: Player[];
  isDeactiveNextStep: boolean = true;
  selectedPlayer: Player = new Player();
  nightHappeningTypeEnum = NightHappeningTypeEnum;
  playerRoleGroupEnum = PlayerRoleGroupEnum;
  playerRoleEnum = PlayerRoleEnum;
  actionReport: string = '';
  nightReport: string = '';
  bodyguardInquiry: string = '';
  happenings: NightHappening = {
    [PlayerRoleEnum.Godfather]: {
      name: 'shootByMafia',
      type: NightHappeningTypeEnum.choosePlayer,
      title: 'NIGHT_PHASE.SHOOTBYMAFIA',
      playerId: ''
    },
    [PlayerRoleEnum.DrLecter]: {
      name: 'savedByMafia',
      type: NightHappeningTypeEnum.choosePlayer,
      title: 'NIGHT_PHASE.SAVEDBYMAFIA',
      playerId: ''
    },
    [PlayerRoleEnum.Mafia]: {
      name: 'simpleMafia',
      type: NightHappeningTypeEnum.simple,
      title: 'NIGHT_PHASE.SIMPLEMAFIA'
    },
    [PlayerRoleEnum.Doctor]: {
      name: 'savedByDoctor',
      type: NightHappeningTypeEnum.choosePlayer,
      title: 'NIGHT_PHASE.SAVEDBYDOCTOR',
      playerId: ''
    },
    [PlayerRoleEnum.Detective]: {
      name: 'askedByDetective',
      type: NightHappeningTypeEnum.choosePlayer,
      title: 'NIGHT_PHASE.ASKEDBYDETECTIVE',
      playerId: ''
    },
    [PlayerRoleEnum.Sniper]:
    {
      name: 'killedBySniper',
      type: NightHappeningTypeEnum.choosePlayer,
      title: 'NIGHT_PHASE.KILLEDBYSNIPER',
      playerId: ''
    },
    [PlayerRoleEnum.Bodyguard]:
    {
      name: 'bodyguardChoose',
      type: NightHappeningTypeEnum.yesOrNo,
      title: 'NIGHT_PHASE.BODYGUARDCHOOSE',
      choose: false
    },
    [PlayerRoleEnum.BodyguardWithoutGuard]:
    {
      name: 'bodyguardChoose',
      type: NightHappeningTypeEnum.yesOrNo,
      title: 'NIGHT_PHASE.BODYGUARDCHOOSE',
      choose: false
    },
    [PlayerRoleEnum.Sheriff]: {
      name: 'sheriff',
      type: NightHappeningTypeEnum.simple,
      title: 'NIGHT_PHASE.SHERIFF'
    },
    [PlayerRoleEnum.Citizen]: {
      name: 'simpleCitizen',
      type: NightHappeningTypeEnum.simple,
      title: 'NIGHT_PHASE.SIMPLECITIZEN'
    }
  };

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
          this.aliveAndNotSelectedPlayers = res.players.filter(p => p.status === PlayerStatusEnum.Alive);
          this.alivePlayers = res.players.filter(p => p.status === PlayerStatusEnum.Alive);
          this.players = res.players;

          const numberOfMafias = this.alivePlayers.filter(p => p.role.roleGroup === PlayerRoleGroupEnum.Mafia).length;
          if (numberOfMafias === 0)
          {
            alert(this.translate.instant("GENERAL.CITIZENS_WINS"));
          }
          if (numberOfMafias >= this.alivePlayers.length - numberOfMafias)
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

  goToPrevious(): void
  {
    this.router.navigate(['/show-roles']);
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

  changePlayerComboBox(event: MatSelectChange): void
  {
  }

  changeKilledPlayerByMafiaComboBox(event: MatSelectChange): void
  {
    this.happenings[PlayerRoleEnum.Godfather].playerId = event.value;
  }

  changeActionPlayerComboBox(event: MatSelectChange): void
  {
    if (this.selectedPlayer.role.value === PlayerRoleEnum.Detective)
    {

      const actionPlayer = this.players.find(p => p.id === event.value);
      if (actionPlayer?.role.roleGroup === PlayerRoleGroupEnum.Mafia && actionPlayer?.role.value !== PlayerRoleEnum.Godfather)
      {
        this.actionReport = this.translate.instant("GENERAL.POSITIVE");
      } else
      {
        this.actionReport = this.translate.instant("GENERAL.NEGATIVE");
      }

      setTimeout(() =>
      {
        this.actionReport = '';
        this.actionFinished();
      }, 2000);
    }
  }

  actionFinished(): void
  {
    this.aliveAndNotSelectedPlayers = [...this.aliveAndNotSelectedPlayers.filter(p => p.id !== this.selectedPlayer.id)];
    this.selectedPlayer = new Player();
    this.isDeactiveNextStep = this.aliveAndNotSelectedPlayers.length !== 0;
  }

  showNightReport(): void
  {
    let nightReport: string = '';
    let bodyguardInquiry: string = '';

    const bodyguard = this.players.find(p => p.role.value === PlayerRoleEnum.Bodyguard);

    if (this.happenings[PlayerRoleEnum.Godfather].playerId !== this.happenings[PlayerRoleEnum.Doctor].playerId)
    {
      if (bodyguard && this.happenings[PlayerRoleEnum.Godfather].playerId === bodyguard.id)
      {
        if ((bodyguard.role as Bodyguard).lives < 2)
        {
          nightReport += this.translate.instant("GENERAL.WAS_KILLED", { name: bodyguard.name });
          this.players.find(p => p.id === bodyguard.id)!.status = PlayerStatusEnum.Dead;
        }
        else
        {
          (this.players.find(p => p.id === bodyguard.id)!.role as Bodyguard).lives--;
        }
      }
      else
      {
        const killedPlayer: Player = this.players.find(p => p.id === this.happenings[PlayerRoleEnum.Godfather].playerId)!;
        nightReport += this.translate.instant("GENERAL.WAS_KILLED", { name: killedPlayer.name });
        this.players.find(p => p.id === killedPlayer.id)!.status = PlayerStatusEnum.Dead;
      }
    }

    // if doctor save sniper???
    if (this.happenings[PlayerRoleEnum.Sniper].playerId)
    {
      let killedPlayer: Player = new Player();
      let shootedPlayer: Player = this.players.find(p => p.id === this.happenings[PlayerRoleEnum.Sniper].playerId)!;

      if (shootedPlayer.role.roleGroup !== PlayerRoleGroupEnum.Mafia)
      {
        killedPlayer = this.players.find(p => p.role.value === PlayerRoleEnum.Sniper)!;
      }
      else if (shootedPlayer.id !== this.happenings[PlayerRoleEnum.DrLecter].playerId)
      {
        killedPlayer = shootedPlayer;
      }

      if (killedPlayer.id)
      {
        nightReport += this.translate.instant("GENERAL.WAS_KILLED", { name: killedPlayer.name });
        this.players.find(p => p.id === killedPlayer.id)!.status = PlayerStatusEnum.Dead;
      }
    }

    if (this.happenings[PlayerRoleEnum.Bodyguard].choose || this.happenings[PlayerRoleEnum.BodyguardWithoutGuard].choose)
    {
      this.players.forEach(player =>
      {
        if (player.status === PlayerStatusEnum.Dead)
        {
          bodyguardInquiry += this.translate.instant("GENERAL.WAS_KILLED", { name: player.role.name });
        }
      });
    }

    nightReport = nightReport ? nightReport : this.translate.instant("NIGHT_PHASE.NOTHING_HAPPENED");
    bodyguardInquiry = bodyguardInquiry ? bodyguardInquiry : this.translate.instant("NIGHT_PHASE.BODYGUARD_NOT_INQUIRY");
    this.nightReport = nightReport;
    this.bodyguardInquiry = bodyguardInquiry;
  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }
}

class NightHappening
{
  [key: number]: {
    name: string;
    type: NightHappeningTypeEnum;
    title: string;
    playerId?: string;
    choose?: boolean;
  };
}

enum NightHappeningTypeEnum
{
  simple,
  choosePlayer,
  yesOrNo
}
