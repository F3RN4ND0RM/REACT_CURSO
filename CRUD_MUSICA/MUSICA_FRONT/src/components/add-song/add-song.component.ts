import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../services/music.service';
import { SongCreated, SongTemplate } from '../../helpers/Songs.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'add-song',
  imports: [FormsModule, CommonModule],
  templateUrl: 'add-song.component.html',
  styleUrl: './add-song.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone : true
})
export class AddSongComponent {


  url : string = ""
  loading : boolean = false
  song  : SongTemplate = {    
    name: '',
    artist: '',
    album: ''
  };

  editingSong : WritableSignal<any>
  

  constructor(private musicServer : MusicService ){
    this.editingSong = this.musicServer.getEditingSong()             
  }



  submitSong(): void {
    this.loading = true
    this.musicServer.addSong(this.song, this.url).subscribe({
      next: (response: any) => {
        this.musicServer.loadSongs()  
        alert(response.msg);        
      },
      complete: () => {
        this.loading = false
        this.resetForm
      },
    });


    





    
  }


  
  resetForm() {
  this.url = "";
  this.song = {
    name: "",
    artist: "",
    album: ""
  };
  }


  editSong(): void {
   
    this.song.name = this.editingSong().name
    this.song.artist = this.editingSong().artist
    this.song.album = this.editingSong().album
    console.log(this.song)
    this.musicServer.editSong(this.song, this.editingSong().id).subscribe({
      next: (response: any) => {
        this.musicServer.loadSongs()  
        alert(response.msg);        
      },
      complete: () => {
        this.loading = false
        this.resetForm
      },
    });
  }


}
