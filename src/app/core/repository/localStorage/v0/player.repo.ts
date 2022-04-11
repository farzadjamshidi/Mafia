import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPlayersRequest, GetPlayersResponse } from 'src/app/core/models/get-players.model';
import { PostPlayersRequest, PostPlayersResponse } from 'src/app/core/models/post-players.model';
import { IPlayerRepo } from '../../interfaces/player.interface';

@Injectable()
export class LocalStorageV0PlayerRepo implements IPlayerRepo
{

  constructor(
  )
  {
  }

  list(request: GetPlayersRequest): Observable<GetPlayersResponse>
  {
    return new Observable<GetPlayersResponse>(observer =>
    {
      try
      {
        JSON.parse(localStorage.getItem('players') || '[]');
        observer.next(
          { players: JSON.parse(localStorage.getItem('players') || '[]') } as GetPlayersResponse
        );
      } catch (error)
      {
        observer.error();
      }
    });
  }

  saveAll(request: PostPlayersRequest): Observable<PostPlayersResponse>
  {
    return new Observable<PostPlayersResponse>(observer =>
    {
      try
      {
        localStorage.setItem('players', JSON.stringify(request.players));
        observer.next(
          new PostPlayersResponse()
        );
      } catch (error)
      {
        observer.error();
      }
    });
  }

}

