create table user(
    id int primary key auto_increment,
    name varchar(100) ,
    password varchar(10) NOT NULL,
    contactNo varchar(10) ,
    email varchar(100) NOT NULL,
    status varchar(10),
    role varchar(10) ,
    UNIQUE (email)
);


insert into user(name,password,contactNo,email,status,role) values ('admin','123',1234567890','admin@gmail.com','active','admin');


create table category (
    id int primary key auto_increment,
    name varchar(100) NOT NULL,
);

create table product (
    id int primary key auto_increment,
    name varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    price int NOT NULL,
    img_url varchar(100),
    category_id int NOT NULL,
    status int NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id),
);

create table bill (
    id int primary key auto_increment,
    uuid varchar(200) NOT NULL,
    name varchar(100) NOT NULL,
    contactNo varchar(10) NOT NULL,
    email varchar(100) NOT NULL,
    paymentMethod varchar(100) NOT NULL,
    total int NOT NULL,
    productDetails JSON Default NULL,
    CreatedBy varchar(100) NOT NULL,
    CreatedDate datetime NOT NULL
);

create table cart (
    id int primary key auto_increment,
    product_id int NOT NULL,
    quantity int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
