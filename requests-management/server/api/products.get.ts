export default defineEventHandler(async (event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const query = getQuery(event)
    const requestId = query.id as string
    const productsByRequest: Record<string, any[]> = {
        '1': [
            { id: 1, name: '15.6" Ноутбук Dell Vostro 3520', price: 40999, quantity: 2, color: 'black' },
            { id: 2, name: 'iPhone 16 Pro Max 256', price: 124499, quantity: 5, color: 'white' }
        ],
        '2': [
            { id: 3, name: 'Мышь беспроводная Logitech G PRO X', price: 12299, quantity: 1, color: 'black' },
            { id: 4, name: 'Клавиатура проводная Logitech G512 Carbon', price: 9999, quantity: 3, color: 'grey' }
        ],
        '3': [
            { id: 5, name: 'Принтер лазерный HP LaserJet 107a', price: 14000, quantity: 1, color: 'white' },
            { id: 6, name: 'Сканер Canon CanoScan LiDE 400', price: 9700, quantity: 2, color: 'black' }
        ]
    }

    return productsByRequest[requestId] || productsByRequest['1']
})