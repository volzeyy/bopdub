import styles from '@/styles/Logo.module.css'
import Image from 'next/image'

function Logo() {
  return (
    <Image
        className={styles.logo}
        src="/logo.png" 
        alt="logo" 
        width={400} 
        height={200}
    />
  )
}

export default Logo