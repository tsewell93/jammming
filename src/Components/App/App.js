import './App.css';
import React from 'react';
import {SearchBar} from '../../Components/SearchBar/SearchBar.js';
import {SearchResults} from '../../Components/SearchResults/SearchResults';
import {Playlist} from '../../Components/Playlist/Playlist';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name: "Song Name 1", artist: 'Artist Name 1', album: 'Album Name 1', id: 'Song ID 1'},
      {name: "Song Name 2", artist: 'Artist Name 2', album: 'Album Name 2', id: 'Song ID 2'},
      {name: "Song Name 3", artist: 'Artist Name 3', album: 'Album Name 3', id: 'Song ID 3'}],
      playlistName: 'Playlist Name',
      playlistTracks: [{name: "PL Song Name 1", artist: 'PL Artist Name 1', album: 'PL Album Name 1', id: 'PL Song ID 1'},
      {name: "PL Song Name 2", artist: 'PL Artist Name 2', album: 'PL Album Name 2', id: 'PL Song ID 2'},
      {name: "PL Song Name 3", artist: 'PL Artist Name 3', album: 'PL Album Name 3', id: 'PL Song ID 3'}]
  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
    tracks.push(track);
    this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(thisTrack => thisTrack.id !== track.id)
    this.setState({playlistTracks: tracks});
  }

  render(){
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}/>
          </div>
        </div>
    </div>
    )
  }
}

export default App;
