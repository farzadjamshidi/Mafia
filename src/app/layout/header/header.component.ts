import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent
{

  defaultLanguage: string = 'en';

  constructor(
    private translate: TranslateService
  )
  {
  }

  changeLanguage(change: MatButtonToggleChange)
  {
    this.translate.use(change.value);
  }
}
