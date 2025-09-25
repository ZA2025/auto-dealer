"use client";

import { useState } from "react";
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
    const [videoSrc, setVideoSrc] = useState("/videos/Auto-Galerie-Trier.mp4");

    return (
        <>
            <section className={styles.videoPlayer}>
                
                <div>
                    <video
                        // src="/videos/profile2.mp4" // Place video in public/videos/
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.videoPlayerVideo}
                         
                    />
                </div>
            </section>
        </>
    )
}

export default VideoPlayer;