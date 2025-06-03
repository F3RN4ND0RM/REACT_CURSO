export interface SongTemplate {
    name: string;
    album: string;
    artist: string;
}

export interface SongCreated  extends SongTemplate{
    id : number, 
    createdAt : Date;
    updatedAt : Date
}

