import { Component, Input } from '@angular/core';
import { Gif } from '../../../interfaces/Gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  constructor() { }

  @Input()
  public gif!: Gif;

}
