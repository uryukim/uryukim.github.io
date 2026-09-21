export const useBackgroundMedia = () => {
  const entered = useState('bg-entered', () => false)
  const musicPlaying = useState('bg-music-playing', () => false)

  return { entered, musicPlaying }
}
