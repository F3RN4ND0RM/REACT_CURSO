import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { SongCreated } from '../../helpers/Songs.interface';
import { MusicService } from '../../services/music.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'list-player',
  imports: [CommonModule],
  templateUrl:'./list-player.component.html' ,
  styleUrl: './list-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListPlayerComponent {
  songs : WritableSignal<SongCreated[]>
  actualSong : WritableSignal<SongCreated>
  
  constructor(private musicService : MusicService){
    this.songs = this.musicService.getSongs()
    this.actualSong = this.musicService.getPlayingSong()
  }


  editSong(song: SongCreated) {    
     this.musicService.setEditingSong(song)
  }
  deleteSong(_id :number){
    this.musicService.deleteSong(_id).subscribe({
      next : (response : any) =>{
        alert(response.msg)
        this.musicService.loadSongs()
      }
    })
  }
}
