import styles from '@/styles/OverlayButton.module.css'

function OverlayButton(props) {
  const { startRecording } = props;

  return (
    <button 
        className={styles.button}
        onClick={startRecording}
    >
        Ready?
    </button>
  )
}

export default OverlayButton