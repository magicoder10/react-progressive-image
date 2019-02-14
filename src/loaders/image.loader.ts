
export interface ImageLoader {
    loadAsync(imageUrl: string): Promise<string>
}
