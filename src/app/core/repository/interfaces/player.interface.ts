import { Observable } from "rxjs";
import { GetPlayersRequest, GetPlayersResponse } from "../../models/get-players.model";
import { PostPlayersRequest, PostPlayersResponse } from "../../models/post-players.model";

export interface IPlayerRepo
{
  list(request: GetPlayersRequest): Observable<GetPlayersResponse>;
  saveAll(request: PostPlayersRequest): Observable<PostPlayersResponse>;
}
