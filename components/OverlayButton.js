import styles from '@/styles/OverlayButton.module.css'

function OverlayButton(props) {
  const { startRecording } = props;

  return (
    <button 
        className={styles.button}
        onClick={startRecording}
        style={{zIndex: 2}}
    >
        Ready?
    </button>
  )
}

export default OverlayButton