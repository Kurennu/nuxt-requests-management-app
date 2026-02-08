export interface Product {
    id: number
    name: string
    price: number
    quantity?: number
    color?: string
}

export interface Request {
    id: number
    number: string
    status: string
    checkResult?: string
    createdAt?: string
}

export interface RequestSubmitData {
    id: number
    products: Product[]
}

export interface RequestLocalData {
    id: number
    products: Product[]
    updatedAt: string
}