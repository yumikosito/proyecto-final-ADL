const products = [{
    id_product: 1,
    product_name: 'Polera FF VI',
    product_price: 20000,
    product_photo: ' https://cdnx.jumpseller.com/disenos-de-la-rata-otaku/image/36562686/thumb/1438/1438?1698820206',
    category: "Ropa",
    product_description: 'Polera negra de FFVI con personajes modo pixel',
    product_quantity: 20,
    seller: 'FFVI fan-club'
},{
    id_product: 2,
    product_name: 'Taza Tifa FFVII',
    product_price: 40000,
    product_photo: 'https://http2.mlstatic.com/D_NQ_NP_2X_931230-MLC81449895006_122024-T.webp',
    category: "Vajilla",
    product_description: 'Taza de 300mL con imagen impresa de Tifa modo chibi',
    product_quantity: 15,
    seller: 'Tifa lover'
},{
    id_product: 3,
    product_name: 'Juego Final Fantasy IX',
    product_price: 35000,
    product_photo: 'https://upload.wikimedia.org/wikipedia/en/5/51/Ffixbox.jpg',
    category: 'Juego fisico',
    product_description: 'Juego para Play Station 1, trae 4 discos. Idioma: Espanol',
    product_quantity: 3,
    seller:'Retro gamer'
},{
    id_product: 4,
    product_name: 'Pin Haurchefant',
    product_price: 14990,
    product_photo: 'https://i.etsystatic.com/18833319/r/il/33060a/6237173934/il_794xN.6237173934_n489.jpg',
    category: 'Accesorios',
    product_description: 'Pin de personaje de FFXIV Haurchefant.Origen: Indonesia',
    product_quantity: 5,
    seller:'LeorenArts'
}, {
    id_product: 5,
    product_name: 'Vinilo de FFXIV HEAVENSWARD Vol.2',
    product_price: 29990,
    product_photo: 'https://cdn11.bigcommerce.com/s-6rs11v9w2d/images/stencil/1280x1280/products/3126/16335/HEAVENSWARD_Vinyl_LP_Vol._2__36754.1698706501.jpg?c=1',
    category: 'Musica',
    product_description: 'Pin de fates de FFXIV Haurchefant.Origen: Indonesia',
    product_quantity: 10,
    seller:'SQUARE ENIX store'
},{
    id_product: 6,
    product_name: 'Peluche de Moogle/Moguri',
    product_price: 12990,
    product_photo: 'https://cdn11.bigcommerce.com/s-6rs11v9w2d/images/stencil/1280x1280/products/1466/14898/beb55fbe116f6cecac78987a5e8bc243__21309.1684895420.jpg?c=1',
    category: 'Peluche',
    product_description: 'A reprint of the cute plush of Moogle, the traditional mascot of the FINAL FANTASY series. This Moogle is based on Lulus plush Moogle doll from FINAL FANTASY X. Made like a teddy bear it has moveable arms and legs',
    product_quantity: 6,
    seller:'SQUARE Enix store'
},{
    id_product: 7,
    product_name: 'Pixel art ff9 6 personajes',
    product_price: 40000,
    product_photo: 'https://i.pinimg.com/736x/7d/68/5a/7d685a1a8a7cc35b45b386ad2239cbd8.jpg',
    category: 'Pixel art',
    product_description: 'pixel art hecho de hama beads de 6 personajes del juego FF9',
    product_quantity: 2,
    seller:'RoninsArt'
}];

export const getProducts = async () => {
    return products
}
