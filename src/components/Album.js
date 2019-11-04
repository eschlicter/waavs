import React, { Component } from "react";
import Box from '@material-ui/core/Box';
import albumData from '../data/albums';
import Playerbar from './Playerbar';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';



class Album extends Component{
    constructor(props){
        super(props);

        const album = albumData.find(album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            currentVolume: 0.5,
            volumePercent: 100,
            duration: album.songs[0].duration,
            isPlaying: false,
            isHovered: false,
        };
        
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }
    componentDidMount(){
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumechange: e => {
                this.setState({ currentVolume: this.audioElement.volume });
            }
        };

        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);

    }

    componentWillUnmount(){
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

    play(){
        this.audioElement.play();
        this.setState({isPlaying: true});
    }

    pause(){
        this.audioElement.pause();
        this.setState({isPlaying: false});
    }

    setSong(song){
        this.audioElement.src = song.audioSrc;
        this.setState({currentSong: song});
    }

    handleSongClick(song){
        const isSameSong = this.state.currentSong === song;
        if(this.state.isPlaying && isSameSong){
            this.pause();
        } else {
            if(!isSameSong){
                this.setSong(song);
            }
            this.play();
        }
    }
    handlePrevClick(){
        const currentIndex = this.state.album.songs.findIndex(
            song => this.state.currentSong === song
        );
        const newIndex = Math.max(0, currentIndex -1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong (newSong);
        this.play(newSong);
    }

    handleNextClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(currentIndex +1, this.state.album.songs.length -1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong (newSong);
        this.play(newSong);

    }

    handleTimeChange(e){
        const newTime=this.audioElement.duration * e.target.value;
        this.audioElement.currentTime= newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e){
        const newVolume=(e.target.value);
        const newVolumePercent= Math.round((e.target.value)*100);
        this.audioElement.volume= newVolume;
        this.setState({ currentVolume: newVolume });
        this.setState({ volumePercent: newVolumePercent });
    }

    formatTime(time){
        if(time){
            const formattedTime = Math.floor(time / 60) + ":" + (((time%60) < 10) ? 
            ("0" + (Math.floor(time % 60))) : 
            (Math.floor(time % 60)));
            return formattedTime;
        }
    }

    render(){
        return(
            <section className="album">
                <Box justifyContent="center" p={1}>
                <img id="album-cover-art" 
                    src={this.state.album.albumCover} 
                    alt={this.state.album.title} 
                />

           <section id="album-info">
               <h1 id="album-title">{this.state.album.title}</h1>
               <h2 className="artist">{this.state.album.artist}</h2>
               <div id="release-info">{this.state.album.releaseInfo}</div>
           </section>
           
           <table id="song-list" align="center">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>

            <tbody>
            {
            this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => this.setState({isHovered: index + 1})}
                onMouseLeave={() => this.setState({isHovered: false})}>

                <td className="song-actions">
                    <button id="song-action-btns">
                    { (this.state.currentSong.title === song.title) ?
                    
                    <span className={this.state.isPlaying}>{index + 1}</span>
                    :
                    (this.state.isHovered === index+1) ?
                    <PlayArrowIcon />
                    :
                    <span className="song-number">{index + 1}</span>
                    }
                    </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
                </tr>
            )
            }
            </tbody>
        </table>

        <Playerbar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            currentVolume={this.audioElement.currentVolume}
            duration={this.audioElement.duration}
            volumePercent={this.state.volumePercent}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e)=> this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            formatTime={this.formatTime(this.state.currentTime)}
        />
        </Box>
        </section>
        )
    }
}

export default Album;