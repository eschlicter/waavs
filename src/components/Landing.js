import React from 'react';


//Material Imports
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const Landing = () => (
    <section className="landing">

        <div className="landing-head">            
        </div>
    
        <Box display="flex" p={1} bgcolor="background.paper">

            <div className="point1">
                <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
            <div className="point2">
                <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                <p className="point-description">No arbitrary limits. No distractions.</p>
            </div>
            <div className="point3">
                <h2 className="point-title">Mobile enabled</h2>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>

        </Box>
    </section>
);

export default Landing;