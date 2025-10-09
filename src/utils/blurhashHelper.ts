// BlurHash 辅助工具
// 注意：生成 BlurHash 需要在服务端或构建时完成
// 这里提供一些常用图片的预生成哈希值

export const imageHashes: Record<string, string> = {
    // 作品展示图片
    '/assets/work/qdesign.png': 'L6Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/tob.png': 'L5O|9pxu00~q-;WB4nIU009F-;M{',
    '/assets/work/other.png': 'L4Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/cnmp.png': 'L7Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/migua.png': 'L8Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/fuli.png': 'L9Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/anchen.png': 'L3Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/yiboyihui.png': 'L2Pj0^xv00~q-;WB4nIU009F-;M{',
    '/assets/work/zdoai.png': 'L1Pj0^xv00~q-;WB4nIU009F-;M{',

    // 首页图标
    '/assets/index/github.png': 'L00000fQfQfQ~qfQfQfQ00fQfQfQ',
    '/assets/index/Gitee.png': 'L00000fQfQfQ~qfQfQfQ00fQfQfQ',
    '/assets/index/CSDN.png': 'L00000fQfQfQ~qfQfQfQ00fQfQfQ',
}

// 获取图片的 BlurHash
export function getImageHash(src: string): string | undefined {
    return imageHashes[src]
}

// 为新图片生成默认的 BlurHash（灰色模糊）
export function getDefaultHash(): string {
    return 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'
}

// 检查图片是否有预定义的 BlurHash
export function hasImageHash(src: string): boolean {
    return src in imageHashes
}
