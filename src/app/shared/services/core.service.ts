import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/cards.model';
import { API_KEY_URL } from '../../environments/apiKey';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get<Card[]>(API_KEY_URL)
  }
}
