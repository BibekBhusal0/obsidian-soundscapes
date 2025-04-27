import { PLAYER_STATE } from "./Enums";

export interface LocalMusicFile {
	fileName: string;
	fullPath: string;
	title: string | undefined | null;
	artist: string | undefined | null;
	album: string | undefined | null;
	duration: number | undefined | null;
}

export interface LocalPlayerState {
	currentTrack?: LocalMusicFile | undefined;
	playerState?: PLAYER_STATE | undefined;
	currentTime?: number | undefined;
}
export interface Soundscape {
	id: string;
	name: string;
	nowPlayingText: string;
}
