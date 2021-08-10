import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string='LWEmIy5jCIiJWdcpvRz86TZxBKTBwyGe';
  private _historial:string[]=[];
  private servicioUrl ="https://api.giphy.com/v1/gifs";
  
  
  public resultados:Gif[]=[];

  get historial(){
   
    return [...this._historial];
  }

  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('ultimaBusqueda')!) || [];
  /*  if(localStorage.getItem('historial')){
      this._historial=JSON.parse(localStorage.getItem('historial')!)  ;
    }*/

  }

  buscarGifs(query:string){
    
    query=query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
     

    }


    const params=new HttpParams().set('api_key',this.apiKey).set('q',query).set('limit','10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe( (resp) => {
      
        this.resultados=resp.data;
        localStorage.setItem('ultimaBusqueda',JSON.stringify(this.resultados));
        
      });
    
  
  }
  

}
