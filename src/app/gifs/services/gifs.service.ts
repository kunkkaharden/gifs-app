import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService   {
  private apiKey: string ='vin2RxCv0swedGDAWvU8SMRrn8U6QUAZ';
  private urlBase: string ='https://api.giphy.com/v1/gifs/search';
  resultados: Gif[] = [];
  constructor(private http: HttpClient) {
    this._historial = JSON.parse( localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse( localStorage.getItem("resultados")!) || [];
  }


  private _historial: string[] = [];
  get historial(): string[] {
    return [... this._historial];
  }
  buscarGifs(q: string) {
    q = q.trim().toLowerCase();
    if(!this._historial.includes(q)){
      this._historial.unshift(q);
      this._historial = this.historial.splice(0,10);
      localStorage.setItem("historial", JSON.stringify(this._historial) );
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', q)
    .set('limit', '10');
    this.http.get<SearchGifsResponse>(this.urlBase,{ params })
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem("resultados", JSON.stringify(this.resultados) );
    });
  }
}
