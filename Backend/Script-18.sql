create table users(
id_user serial primary key,
username varchar(20),
name varchar(20),
lastname varchar(20),
email varchar,
password varchar,
birthday date,
address varchar,
tokenid varchar
);

create table products(
id_product serial primary key,
product_name varchar,
product_description varchar,
product_price integer, 
product_quantity integer default 1,
product_photo varchar,
product_category varchar,
seller integer,
constraint fk_seller_user foreign key(seller) references users(id_user) on delete cascade
);

create table cart(
user_id integer,
product_id integer,
total_quantity integer,
constraint pk_cart_products primary key(user_id, product_id),
constraint fk_cart_user foreign key(user_id) references users(id_user),
constraint fk_cart_product foreign key(product_id) references products(id_product)
);

create table orders(
id_order serial primary key,
order_user integer,
order_total integer,
order_date timestamp,
constraint fk_order_user foreign key(order_user) references users(id_user)
);

create table order_details(
id_order_details serial primary key,
order_id integer, 
order_product integer,
product_order_price integer,
product_order_quantity integer,
constraint fk_order_details_orders foreign key (order_id) references orders(id_order),
constraint fk_order_details_products foreign key (order_product) references products(id_product)
);

INSERT INTO users(username, name, lastname, email, password, birthday,address) VALUES ('Vivi_tienda', 'Vivi', 'Ornitier', 'vivi@tienda.cl','$2b$12$1F.NWoupFD9f/THt1rPV5.eH2Lwa9qK4JoygbtS91dsjUdgFrJMC6', '2000-01-01', 'No se registra dirección');


INSERT INTO products(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller) VALUES ('Polera ff9', 'Polera del juego de PS1 Final Fantasy 9', 20000, 15, 'https://cdnx.jumpseller.com/disenos-de-la-rata-otaku/image/32581477/thumb/1438/1438?1677423239', 'Ropa', 1);

INSERT INTO products
(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller)
VALUES('Figura Garnet y Zidane ff9', '¡Zidane Tribal & Garnet Til Alexandros XVII de Final Fantasy IX!

Increíbles figuras Bring Arts de Zidane Tribal & Garnet Til Alexandros XVII del videojuego Final Fantasy IX.
Estas figuras miden 12 y 17 cms y han sido fabricadas por Square Enix en PVC de alta calidad.', 15000, 5, 'https://cdn11.bigcommerce.com/s-uak4l72xa0/images/stencil/1280x1280/products/1228/6222/FF9_BRING_ARTS_ZIDANE_GARNET_bg11__94158.1673472621.jpg?c=1', 'Figura', 1);
INSERT INTO products
(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller)
VALUES('Figura Zidane ff9', 'Yitán Tribal de la compañía de teatro Tántalus y la princesa Garnet von Alexandros de Alexandria de FINAL FANTASY IX se unen al catálogo de Bring Arts. El fabuloso aspecto de estos dos personajes se ha reproducido fielmente, manteniendo las proporciones del juego original y aplicando la pintura de forma que destaca las diferentes texturas, elementos desgastados y detalles brillantes de su ropa. ', 20000, 10, 'https://cdn11.bigcommerce.com/s-hfy8688lak/images/stencil/1280x1280/products/1196/6256/FF9_BRING_ARTS_ZIDANE_GARNET_bg01__79377.1673472629.jpg?c=1', 'Figura', 1);
INSERT INTO products
(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller)
VALUES('Polera Tifa Lockhart', 'Camiseta con imagen de Tifa Lockhart de Final Fantasy VII', 1000, 20, 'https://ae01.alicdn.com/kf/S448ccd7ae84f4334a3c8792176d34b14O.jpg_960x960.jpg', 'Ropa', 1);
INSERT INTO products
(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller)
VALUES('Collar espada Cloud', 'The Buster Sword, one of gaming''s most iconic weapons, is now available as part of a beautiful silver necklace based on its depiction in FINAL FANTASY VII Remake. This miniature Buster Sword comes equipped with two green materia stones, based on the game''s Magic-type materia.

Material: SV925', 50000, 14, 'https://cdn11.bigcommerce.com/s-6rs11v9w2d/images/stencil/1280x1280/products/2310/10566/6e0778fa76d71acaa8f51b37f1599b19_1920_KR__79179.1674774062.jpg?c=1', 'Accesorios', 1);
INSERT INTO products
(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller)
VALUES('Bowl Gato gordo', 'These Japanese-style ceramic bowls are patterned with cute creatures from FINAL FANTASY XIV!

Choose from three different patterns: Moogle, Carbuncle, and Fat Cat. We also have tenugui towels and Japanese teacups with the same designs!

Product Size: Approx. H 2.76 in x  Diameter 4.53 in
Material: Ceramic', 45000, 10, 'https://cdn11.bigcommerce.com/s-6rs11v9w2d/images/stencil/1280x1280/products/3521/18221/FF14_JapaneseBowl_FatCat_02__71014.1737518679.jpg?c=1', 'Vajilla', 1);


