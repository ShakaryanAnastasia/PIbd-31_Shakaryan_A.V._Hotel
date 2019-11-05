export interface Room {
    id: number
    description: string
    title: string
    price: number
    images: Array<Images>
    images_files: File[]
}

export interface Images {
    id: number
    original: string
    small: string
    room_id: number
} 