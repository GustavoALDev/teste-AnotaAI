import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../shared/models/cards.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() card: Card =
  {
    id:0,
    title:'',
    type:'',
    description:'',
    img:''
  };

  @Output() deleteCardButton = new EventEmitter<number>();

  type: {[key:string]:string} = {
    "1": "Paisagem",
    "2": "Flor",
    "3": "Pizza"
  }

  idCardEmitter (idCard:number){
    this.deleteCardButton.emit(idCard)
  }
}
