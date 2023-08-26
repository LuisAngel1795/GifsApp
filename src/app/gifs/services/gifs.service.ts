import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/Gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private apiKey: string = 'l7tiLIkHYmJs8g6aBxn0aPj9mc4GCoAI';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  private _tagHistory: string[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history') ) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagHistory[0]);

  }


  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceURL}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
      });
  }
}
