const appClientID = '530cd8e3ee7c404b8c0ed9501f1b67a5';
const redirectURI = 'http://localhost:3000/';
let accessToken;


const Spotify = {
    getAccessToken(){
        if (accessToken){
            return accessToken;
        }
        //check if access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const tokenExpirationMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && tokenExpirationMatch){
            //Index 1 returns just the access key (...), index 0 would return (access_token=...)
            accessToken = accessTokenMatch[1];
            //convert tokenExpirationMatch array index to a number.
            const tokenExpiration = Number(tokenExpirationMatch[1]);
            //This clears the parameters and allows us to get a new access token when it expires
            window.setTimeout(() => accessToken = '', tokenExpiration * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } 
        else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${appClientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },
    
    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
            headers: {
                Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json(); //convert returned response to a JSON object
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) { //if the json object has no tracks, return an empty array
                return [];
            } 
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(name, trackUris){
        if (!name || !trackUris.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });

    }
    
}



export default Spotify;
