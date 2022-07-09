import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogDataModel } from 'src/app/components/confirmation-dialog/confirmation-dialog.model';
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
    public dialog: MatDialog,
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
    this.selectedPlayer = new Player();

    const data = new ConfirmationDialogDataModel({
      title: 'SHOW_ROLES.TITLE',
      content: this.translate.instant('GENERAL.DIALOG_CONTENT', { playerName: event.value.name })
    });

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result: boolean) =>
      {
        if (result)
          this.selectedPlayer = event.value;
      })
    );
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
