import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../shared/services/core.service';
import { filter, map, Observable, tap } from 'rxjs';
import { Card } from '../../shared/models/cards.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit {

  cardList: Observable<Card[]> = new Observable();
  deletedItems: number[] = [];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.getCardList();
  };

  getCardList() {

    this.cardList = this.coreService.getCards();

  };

  serchCard(value: string) {

    this.cardList = this.coreService.getCards()
      .pipe(
        map((cardList) =>
          cardList.filter((card) => !this.deletedItems.includes(card.id))
        ),
        map(
          cardList => cardList.filter(card => {
            if (card.description.includes(value)) {
              return card.description.includes(value)
            } else {
              return card.title.includes(value)
            }
          })
        )
      );
  };

  deleteCard(idCard: number) {

    this.deletedItems.push(idCard);

    this.cardList = this.cardList.pipe(
      map((cardList) =>
        cardList.filter((card) => !this.deletedItems.includes(card.id))
      ),
    );

  };

}
