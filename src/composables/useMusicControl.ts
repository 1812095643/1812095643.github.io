import { ref } from 'vue'

// 全局音乐控制状态
const musicVolume = ref(0.02) // 默认音量2%
const originalVolume = ref(0.02) // 保存原始音量
const isVideoPlaying = ref(false) // 视频播放状态

// 音乐播放器实例引用
let musicPlayerInstance: {
    setVolume: (volume: number) => void
    getVolume: () => number
} | null = null

export function useMusicControl() {
    // 注册音乐播放器实例
    const registerMusicPlayer = (instance: {
        setVolume: (volume: number) => void
        getVolume: () => number
    }) => {
        musicPlayerInstance = instance
        // 初始化音量
        musicVolume.value = instance.getVolume()
        originalVolume.value = musicVolume.value
    }

    // 设置音乐音量
    const setMusicVolume = (volume: number) => {
        musicVolume.value = volume
        if (musicPlayerInstance) {
            musicPlayerInstance.setVolume(volume)
        }
    }

    // 视频开始播放时降低音乐音量
    const onVideoPlay = () => {
        if (!isVideoPlaying.value) {
            isVideoPlaying.value = true
            // 保存当前音量
            if (musicPlayerInstance) {
                originalVolume.value = musicPlayerInstance.getVolume()
            }
            // 降低到1%
            setMusicVolume(0.01)
        }
    }

    // 视频停止播放时恢复音乐音量
    const onVideoPause = () => {
        if (isVideoPlaying.value) {
            isVideoPlaying.value = false
            // 恢复原始音量
            setMusicVolume(originalVolume.value)
        }
    }

    // 获取当前音乐音量
    const getMusicVolume = () => {
        return musicVolume.value
    }

    return {
        musicVolume,
        originalVolume,
        isVideoPlaying,
        registerMusicPlayer,
        setMusicVolume,
        onVideoPlay,
        onVideoPause,
        getMusicVolume
    }
}
