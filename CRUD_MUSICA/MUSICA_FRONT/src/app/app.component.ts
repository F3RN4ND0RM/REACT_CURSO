import { Component , WritableSignal} from '@angular/core';


import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../components/player/player.component';
import {ListPlayerComponent} from "../components/list-player/list-player.component"
import { AddSongComponent } from '../components/add-song/add-song.component';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, PlayerComponent, ListPlayerComponent, AddSongComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  title  ="MUSIC_FRONT"


}
