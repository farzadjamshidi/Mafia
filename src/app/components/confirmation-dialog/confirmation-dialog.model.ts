export class ConfirmationDialogDataModel
{
  title!: string;
  content!: string;
  noLabel?: string = 'GENERAL.NO';
  yesLabel?: string = 'GENERAL.YES';

  constructor(model: ConfirmationDialogDataModel)
  {
    this.title = model.title;
    this.content = model.content;
    this.noLabel = model.noLabel ?? this.noLabel;
    this.yesLabel = model.yesLabel ?? this.yesLabel;
  }
}
