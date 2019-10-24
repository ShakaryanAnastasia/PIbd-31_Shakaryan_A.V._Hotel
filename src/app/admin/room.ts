export interface Room {
    id: number
    description: string
    title: string
    price: number
    images: Array<Images>
}

export interface Images {
    id: number
    original: string
    small: string
    room_id: number
} 