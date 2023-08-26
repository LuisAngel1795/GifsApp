import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/Gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: 'card-list.component.html'
})

export class CardListComponent{
  constructor(private service: GifsService) { }

  @Input()
  public gifs: Gif[] = [];



}
