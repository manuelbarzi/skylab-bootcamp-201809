
const spotifyLogic = {

    token: 'BQB4001l2qzCqWa7iBdXUsNlOODxHUmp7DgLJTAVso2e95kB1hjnuNCiitpLdsXZ9n3U4r6DBWC2ZzCzASw7qSm1Pte5TV9C6-zPhzGoJv5cSi_5TvagE6-dcnCl74GSi27VFw64HA2CnEnmL6Vowf0JsAsbeFgDzCS-feWKwmEm7prgGvbxlg9xMIfYtu7B6d6Uyq7pvHAl2Vr3',

    getArtistById(id) {

        if(!(typeof id === 'string')) throw TypeError (`${id} is not a a string`)
        if(!(id.length)) throw Error (`${id} is empty or blank`)

        return fetch(`https://api.spotify.com/v1/artists/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            },
            // body: JSON.stringify({ name, surname, username, password })
        })
            .then(res => res.json())
            .then((res) => {
                if(res.error) throw Error (res.error)
                return res
            })
            
    },

    getArtists(query) {

        if(!(typeof query === 'string')) throw TypeError (`${query} is not a a string`)
        if(!(query.trim().length)) throw Error ('query cannot be empty')
        
        return fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
               
                'Authorization': 'Bearer ' + this.token
            },
           
        })
            .then(res => res.json())
            .catch(err => {throw Error(err.message)})
    },

    getTrack(id) {
        return fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                const track = {}
                track.id = res.id
                track.name = res.name
                track.preview_url = res.preview_url ? res.preview_url : require("../assets/audio/default.mp3")
                track.image = res.album.images ? res.album.images[0].url : 'https://i.scdn.co/image/557a6058e3de72bf37ffcd2c12dd5932276df344'
                return track
            })
    },

    getPlaylistsTracks(playlistId) {

        if(!(typeof playlistId === 'string')) throw TypeError (`${playlistId} is not a a string`)
        if(!(playlistId.trim().length)) throw Error ('query cannot be empty')
        
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            },
            // body: JSON.stringify({ name, surname, username, password })
        })
            .then(res => res.json())
    },

    getAlbumsByArtistId(artistId) {
        return fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            },
            // body: JSON.stringify({ name, surname, username, password })
        })
            .then(res => res.json())
            .then(res => res)
    },

    getSongsbyAlbumId(id) {
        return fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            },
        })
            .then((res) => res.json())
            .then(res => res)
    },

    createPlaylist(name) {
        return fetch(`https://api.spotify.com/v1/me/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify({name: name})
        })
            .then((res) => res.json())
            .then(res => res)
    },

    //id, name, preview_url, picture

    getTrack(id) {
        return fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                const track = {}
                track.id = res.id
                track.name = res.name
                track.preview_url = res.preview_url
                track.image = res.album.images ? res.album.images[0].url : 'https://i.scdn.co/image/557a6058e3de72bf37ffcd2c12dd5932276df344'
                return track
            })
    }
}

// export default spotifyLogic

module.exports = spotifyLogic
