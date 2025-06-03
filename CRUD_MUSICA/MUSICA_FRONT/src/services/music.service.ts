import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SongCreated, SongTemplate } from '../helpers/Songs.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',  
})


export class MusicService {
  private API : string 
  private songs : WritableSignal<SongCreated[]>
  private playingSong : WritableSignal<SongCreated>
  private indexOfSong = 0
  private editingSong :  WritableSignal<any>


  constructor(private http: HttpClient, private alertsService : AlertsService) {     
    this.API = environment.API;
    this.songs = signal([])        
    this.loadSongs()
    this.playingSong = signal(this.songs()[this.indexOfSong])  
    this.editingSong = signal(null)      
  }


  loadSongs(): void {
    this.http.get<SongCreated[]>(`${this.API}/songs`)
    .pipe(
      map(songs => {        
        return songs.map(song => ({
          ...song}));
      })
    ).subscribe(
      response => {
        this.songs.set(response)
        this.playingSong.set(this.songs()[this.indexOfSong])    
      }
    )
  }
  
  getSongs(): WritableSignal<SongCreated[]> {
    return this.songs;
  }

  getPlayingSong() : WritableSignal<SongCreated> {    
    return this.playingSong
  }

  setEditingSong(_song : SongCreated) : void{        
    this.editingSong.set(_song)    
  }

  getEditingSong() : WritableSignal<any> {    
    return this.editingSong
  }

  editSong(_song : SongTemplate, _id : number) {

    return this.http.put(`${this.API}/songs/${_id}`, _song).pipe(
      catchError(error => {
        alert('Error: ' + (error?.error || 'Unknown error'));
        return throwError(() => error);
      })
    )
  }

  prevSong(){
    if(this.indexOfSong > 0){
      this.indexOfSong --    
      this.playingSong.set(this.songs()[this.indexOfSong])  
    }else{
      this.indexOfSong = this.songs().length - 1
      this.playingSong.set(this.songs()[this.indexOfSong])  
    }
  }

  nextSong(){
   if(this.indexOfSong < this.songs().length - 1){
      this.indexOfSong ++
      this.playingSong.set(this.songs()[this.indexOfSong])
    }else{
      this.indexOfSong = 0
      this.playingSong.set(this.songs()[this.indexOfSong])  

    }
  }

  addSong(song : SongTemplate, _url : string) : Observable<any>{
    const options = {
      url : _url,
      ... song
    }
    
    return this.http.post(`${this.API}/songs`, options).pipe(
      catchError(error => {
        alert('Error: ' + (error?.error || 'Unknown error'));
        return throwError(() => error);
      })
    )


  }

  deleteSong(_id : number){
    return this.http.delete(`${this.API}/songs/${_id}`).pipe(
      catchError(error => {
        alert('Error: ' + (error?.error || 'Unknown error'));
        return throwError(() => error);
      })
    )
  }
  

}
