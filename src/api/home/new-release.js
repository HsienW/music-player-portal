import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const getNewReleaseAlbum = () => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getNewReleases();
};

export {
    getNewReleaseAlbum
};


