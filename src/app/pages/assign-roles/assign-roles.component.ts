import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IPlayerRepo } from 'src/app/core/repository/interfaces/player.interface';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.scss']
})
export class AssignRolesComponent implements OnInit, OnDestroy
{
  constructor(
    @Inject('IPlayerRepo') private playerRepo: IPlayerRepo
  )
  {
  }

  ngOnInit(): void
  {
  }

  ngOnDestroy(): void
  {
  }

}
