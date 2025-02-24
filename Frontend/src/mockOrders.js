const orders = [
    {
        id_compra: 1,
        id_usuario: 1,
        total: 80000,
        productos_comprados: [
            {
                id_producto: 1,
                nombre: 'Polera FF VI',
                precio: 20000,
                foto: ' https://cdnx.jumpseller.com/disenos-de-la-rata-otaku/image/36562686/thumb/1438/1438?1698820206',
                descripcion: 'Polera negra de FFVI con personajes modo pixel',
                cantidad: 2,
                vendedor: 'FFVI fan-club'
            },
            {
                id_producto: 2,
                nombre: 'Taza Tifa FFVII',
                precio: 40000,
                foto: 'https://http2.mlstatic.com/D_NQ_NP_2X_931230-MLC81449895006_122024-T.webp',
                descripcion: 'Taza de 300mL con imagen impresa de Tifa modo chibi',
                cantidad: 1,
                vendedor: 'Tifa lover'
            }
        ]
    },
    {
        id_compra: 2,
        id_usuario: 1,
        total: 70000,
        productos_comprados: [
            {
                id_producto: 3,
                nombre: 'Juego Final Fantasy IX',
                precio: 35000,
                foto: 'https://upload.wikimedia.org/wikipedia/en/5/51/Ffixbox.jpg',
                descripcion: 'Juego para Play Station 1, trae 4 discos. Idioma: Espanol',
                cantidad: 2,
                vendedor: 'Retro gamer'
            }
        ]
    },
    {
        id_compra: 3,
        id_usuario: 101,
        total: 40000,
        productos_comprados: [
            {
                id_producto: 2,
                nombre: 'Taza Tifa FFVII',
                precio: 40000,
                foto: 'https://http2.mlstatic.com/D_NQ_NP_2X_931230-MLC81449895006_122024-T.webp',
                descripcion: 'Taza de 300mL con imagen impresa de Tifa modo chibi',
                cantidad: 1,
                vendedor: 'Tifa lover'
            }
        ]
    },
    {
        id_compra: 4,
        id_usuario: 101,
        total: 35000,
        productos_comprados: [
            {
                id_producto: 3,
                nombre: 'Juego Final Fantasy IX',
                precio: 35000,
                foto: 'https://upload.wikimedia.org/wikipedia/en/5/51/Ffixbox.jpg',
                descripcion: 'Juego para Play Station 1, trae 4 discos. Idioma: Espanol',
                cantidad: 1,
                vendedor: 'Retro gamer'
            },
            {
                id_producto: 6,
                nombre: 'Peluche de Moogle/Moguri',
                precio: '12990',
                foto: 'https://resize.cdn.otakumode.com/ex/1000.1000/u/ff3f251dcc66416fae21af4d3b30d6b1.jpg',
                descripcion: 'Size: approx. W47-67 mm x D30-70 mm x H77-115 mm. Weight: approx. 18-24 g. Materials: polyester, cotton, polyamide, polyurethane, polystyrene. ',
                cantidad: 1,
                vendedor: 'Tokyo Otaku Mode'
            }
            
        ]
    },
    {
        id_compra: 5,
        id_usuario: 101,
        total: 12990,
        productos_comprados: [
            {
                id_producto: 6,
                nombre: 'Peluche de Moogle/Moguri',
                precio: '12990',
                foto: 'https://resize.cdn.otakumode.com/ex/1000.1000/u/ff3f251dcc66416fae21af4d3b30d6b1.jpg',
                descripcion: 'Size: approx. W47-67 mm x D30-70 mm x H77-115 mm. Weight: approx. 18-24 g. Materials: polyester, cotton, polyamide, polyurethane, polystyrene. ',
                cantidad: 1,
                vendedor: 'Tokyo Otaku Mode'
            }
        ]
    }
]

export const getOrders = async () => {
    return orders
}
