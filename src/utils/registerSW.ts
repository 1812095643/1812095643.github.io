// Service Worker 注册和管理
export async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported')
        return
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })

        console.log('Service Worker registered:', registration)

        // 检查更新
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (!newWorker) return

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // 新的 Service Worker 已安装，提示用户刷新
                    showUpdateNotification()
                }
            })
        })

        // 定期检查更新（每小时）
        setInterval(() => {
            registration.update()
        }, 60 * 60 * 1000)

    } catch (error) {
        console.error('Service Worker registration failed:', error)
    }
}

function showUpdateNotification() {
    // 创建更新提示
    const notification = document.createElement('div')
    notification.className = 'sw-update-notification'
    notification.innerHTML = `
    <div class="sw-update-content">
      <span>发现新版本</span>
      <button class="sw-update-btn" onclick="window.location.reload()">
        立即更新
      </button>
      <button class="sw-dismiss-btn" onclick="this.parentElement.parentElement.remove()">
        ×
      </button>
    </div>
  `

    document.body.appendChild(notification)

    // 添加样式
    if (!document.getElementById('sw-update-styles')) {
        const style = document.createElement('style')
        style.id = 'sw-update-styles'
        style.textContent = `
      .sw-update-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        background: rgba(17, 17, 17, 0.95);
        color: #fff;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        animation: slideUp 0.3s ease;
      }
      
      .sw-update-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
      }
      
      .sw-update-btn {
        background: #6461f1;
        color: white;
        border: none;
        padding: 6px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: background 0.2s;
      }
      
      .sw-update-btn:hover {
        background: #5651d1;
      }
      
      .sw-dismiss-btn {
        background: transparent;
        color: #999;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0 4px;
        line-height: 1;
      }
      
      .sw-dismiss-btn:hover {
        color: #fff;
      }
      
      @keyframes slideUp {
        from {
          transform: translateX(-50%) translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
    `
        document.head.appendChild(style)
    }
}

// 卸载 Service Worker（用于开发调试）
export async function unregisterServiceWorker() {
    if (!('serviceWorker' in navigator)) return

    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
        await registration.unregister()
    }
    console.log('Service Worker unregistered')
}
