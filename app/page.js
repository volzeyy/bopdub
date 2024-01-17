"use client"

import { useEffect, useState, useRef } from "react";
import FfmpegTest from '@/components/FFmpeg';
import VideoUploadButton from '@/components/VideoUploadButton';
import styles from '@/styles/page.module.css'

function Home() {
  const [videoUrl, setVideoUrl] = useState(null);
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoUrl) {
      const video = videoRef.current;
      video.load();
      video.play();
    }
  }, [videoUrl]);

  return (
    <main className={styles.main}>
      {!videoUrl ?  
        <div className={styles.container}>
          <h1>Upload a video clip!</h1>
          <VideoUploadButton 
            setVideoUrl={setVideoUrl}
          />
          <p className={styles.note}>Only .MP4 supported</p>
        </div>
      : (
        <video ref={videoRef}>
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
        </video>
      )}
    </main>
  )
}

export default Home;