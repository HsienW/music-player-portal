import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const getFeaturedPlaylist = () => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getFeaturedPlaylists();
};

export {
    getFeaturedPlaylist,
};



