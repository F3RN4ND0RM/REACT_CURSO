import { ChangeDetectionStrategy, Component, ElementRef, WritableSignal, ViewChild, AfterViewInit } from '@angular/core';
import { SongCreated } from '../../helpers/Songs.interface';
import { MusicService } from '../../services/music.service';
import { CommonModule } from '@angular/common';
import { ImagesPipe } from '../../pipes/images.pipe';
import { Mp3Pipe } from '../../pipes/mp3.pipe';
@Component({
  selector: 'player',
  imports: [CommonModule, ImagesPipe, Mp3Pipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone : true
})


export class PlayerComponent implements AfterViewInit {

  
  actualSong : WritableSignal<SongCreated>
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBarRef!: ElementRef<HTMLDivElement>;

  playing : boolean

  constructor(private _musicService : MusicService){
    
    this.actualSong = this._musicService.getPlayingSong()
    this.playing = false   
    
  }

  ngAfterViewInit(){
    this.audio.load()    
  }

  playPause(): void {
    this.playing ? this.audio.pause() : this.audio.play();
    this.playing = !this.playing;      
  }

  get audio(): HTMLAudioElement {
    return this.audioRef.nativeElement;  
  }
  
  updateAudio(){
    this.audio.load()
    this.audio.play()    
  }

  prev() : void{
    this._musicService.prevSong()
    this.updateAudio()
  }

  next() : void{
    this._musicService.nextSong()
    this.updateAudio()
  }

  loadProgressBar(): void {
    const audio = this.audio;
    const currentTime = audio.currentTime;
    const duration = audio.duration || 1; // Evitar división por 0
    const progress = (currentTime / duration) * 100;
    this.progressBarRef.nativeElement.style.width = `${progress}%`;    
  }



  

}
