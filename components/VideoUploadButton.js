"use client"

import styles from '@/styles/VideoUploadButton.module.css';
import UploadIcon from '@mui/icons-material/Upload';

function VideoUploadButton({ setVideoUrl }) {

  function handleVideoUpload(event) {
    const files = event.target.files;

    if (!files[0]) 
        return;

    const file = files[0];

    if (file.type !== 'video/mp4') {
        alert('Only .MP4 supported');
        return;
    }

    const videoUrl = URL.createObjectURL(file);
    setVideoUrl(videoUrl);
  }

  return (
    <label htmlFor='video-upload' className={styles.button}>
        <UploadIcon className={styles.icon} />
        <input 
            type='file'
            id='video-upload'
            style={{ display: 'none' }}
            accept='video/mp4'
            onChange={handleVideoUpload}
        />
    </label>
  )
}

export default VideoUploadButton;