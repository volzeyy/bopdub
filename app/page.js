"use client"
import styles from '@/styles/page.module.css'
import { useEffect, useState, useRef, Fragment } from "react";
import VideoUploadButton from '@/components/VideoUploadButton';
import GameInstructions from "@/components/GameInstructions";
import Logo from "@/components/Logo";
import VoiceAct from "@/components/VoiceAct";


function Home() {
  const [videoUrl, setVideoUrl] = useState(null);
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoUrl) {
      const video = videoRef.current;
      video.load();
    }
  }, [videoUrl]);

  return (
    <main className={styles.main}>
      <header>
        <Logo />
      </header>
      <div className={styles.container}>
      {!videoUrl ?
        <Fragment>
          <h2>Upload a video clip!</h2>
          <VideoUploadButton 
            setVideoUrl={setVideoUrl}
          />
          <p className={styles.note}>Only .MP4 supported</p>
        </Fragment>
      : (
        <VoiceAct 
          videoRef={videoRef} 
          videoUrl={videoUrl}
        />
      )}
      </div>
      <GameInstructions />
    </main>
  )
}

export default Home;