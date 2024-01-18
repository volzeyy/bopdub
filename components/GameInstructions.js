import styles from '@/styles/GameInstructions.module.css';
import Image from 'next/image';

function GameInstructions() {
  return (
    <div className={styles.container}>
        <div className={styles.gameInstructions}>
            <div className={styles.instruction}>
                <Image 
                    src="/upload-video-instruction.png"
                    alt="upload video instruction image" 
                    width={300} 
                    height={300} 
                />
                <div className={styles.description}>
                    Upload a clip of a video!
                </div>
            </div>
            <div className={styles.instruction}>
                <Image 
                    src="/voice-act-instruction.png"
                    alt="voice act instruction image" 
                    width={300} 
                    height={300} 
                />
                <div className={styles.description}>
                    When you are ready, act with your voice!
                </div>
            </div>
            <div className={styles.instruction}>
                <Image 
                    src="/view-result-instruction.png"
                    alt="view result instruction image" 
                    width={300} 
                    height={300} 
                />
                <div className={styles.description}>
                    View the result!
                </div>
            </div>
        </div>
    </div>
  )
}

export default GameInstructions