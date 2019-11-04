import React, { Component } from 'react';
import './../App.css';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Playerbar extends Component {
    render(){
        return(
            <section className="playerbar">

                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <FastRewindIcon />
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        {this.props.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <FastForwardIcon />
                    </button>
                </section>

                <section id="time-control">
                    <div className="current-time">
                        {this.props.formatTime}
                    </div>

                    {/* <Slider
                        defaultValue={(this.props.currentTime / this.props.duration) || 0}
                        max={1}
                        min={0}
                        step={0.01}
                        onChange={this.props.handleTimeChange}
                    /> */}



                    <input
                    type="range"
                    className="seek-bar"
                    value={(this.props.currentTime / this.props.duration) || 0}
                    max="1"
                    min="0"
                    step="0.01"
                    onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">
                        {this.props.formatDuration}
                    </div>
                </section>

                <section id="volume-control">
                
                    <VolumeDown />
                    <input
                    type="range"
                    className="seek-bar"
                    value= {this.props.currentVolume}
                    max="1"
                    min="0"
                    step="0.01"
                    onChange={this.props.handleVolumeChange}
                    />
                    <VolumeUp />
                </section>


            </section>
        );
    }
}
export default Playerbar;