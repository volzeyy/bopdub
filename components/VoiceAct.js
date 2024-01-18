"use client"

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import styles from '@/styles/VoiceAct.module.css'
import { useState, Fragment, useEffect, useRef } from 'react';
import OverlayButton from './OverlayButton';

function VoiceAct(props) {
  const {videoRef, videoUrl} = props;

  const [loaded, setLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [merged, setMerged] = useState(false);

  const ffmpegRef = useRef(new FFmpeg());
  const mountedRef = useRef(false);
  const mediaRecorderRef = useRef();

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    createMediaStream();
    load();
  }, []);

  useEffect(() => {
    if (videoUrl) {
      videoRef.current.ondurationchange = () => {
        setDuration(videoRef.current.duration * 1000);
      }
    }
  }, [videoUrl])

  useEffect(() => {
    if (duration) {
        console.log("duration: ", duration)
    }
  }, [duration])

  useEffect(() => {
    if (!(videoUrl && audioUrl))
        return;

    if (merged)
        return;

    if (!loaded)
        return;

    merge();
  }, [videoUrl, audioUrl])

  function createMediaStream() {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      alert("There are no audio devices connected!");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        if (mediaRecorderRef) {
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (chunks.length == 0) {
              chunks.push(event.data);
            }
            console.log(chunks);
            mediaRecorderRef.current?.stop();
          };

          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            setChunks([]);
            const audioURL = window.URL.createObjectURL(blob);
            setAudioUrl(audioURL);
            console.log("audio URL is made: ", audioURL);
          };
        }
      })
      .catch((err) => {
        console.error(`>> The following error occured: ${err}`);
      });
  };

  function startRecording() {
    setIsReady(true);
    setChunks([]);

    const video = videoRef.current;
    video.currentTime = 0;
    video.controls = false;
    video.muted = true;

    mediaRecorderRef.current?.start(duration || undefined);
    video.play();

    console.log("started recording");
  };

  async function load() {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
        console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    setLoaded(true);
  }

  async function merge() {
    const ffmpeg = ffmpegRef.current;

    console.log("Video url in merge: ", videoUrl);
    console.log("Audio url in merge: ", audioUrl);

    await ffmpeg.writeFile('input.mp4', await fetchFile(videoUrl));
    await ffmpeg.writeFile('input.ogg', await fetchFile(audioUrl));

    await ffmpeg.exec(['-i', 'input.mp4', '-c', 'copy', '-an', 'output.mp4']);
    await ffmpeg.exec(['-i', 'output.mp4', '-i', 'input.ogg', '-c', 'copy', 'final.mp4']);

    const data = await ffmpeg.readFile('final.mp4');
    const url = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}))

    videoRef.current.src = url;
    videoRef.current.muted = false;
    videoRef.current.controls = true;
    videoRef.current.currentTime = 0;

    setMerged(true);
  }

  return (
    <Fragment>
        {!isReady ?
            <OverlayButton
                startRecording={startRecording}
            />
        : null}
        <video className={styles.video} ref={videoRef} controls>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
        </video>
    </Fragment>
  )
}

export default VoiceAct