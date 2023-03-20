import React from "react";
import '../../Components/TrackPlayer/TrackPlayer.css'

export class TrackPlayer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <audio controls className="player-action">
                <source src={this.props.preview} type="audio/mpeg"></source>
            </audio>
        )
    }
}