export interface RSVP {
  id: string;
  name: string;
  guestsCount: number;
  comment: string;
  createdAt: string;
}

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  suggestedBy: string;
  createdAt: string;
}

export interface DBStructure {
  rsvps: RSVP[];
  songs: SongRequest[];
}
