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


create table category {
    id int primary key auto_increment,
    name varchar(100) NOT NULL,
};
