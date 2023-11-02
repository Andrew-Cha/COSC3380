const initializeQuery = `
DROP DATABASE postgres;

CREATE TABLE role(
    id serial PRIMARY KEY,
    role_name text,
    max_allowed_books integer,
    max_allowed_media integer,
    max_allowed_devices integer
);
INSERT INTO role(role_name, max_allowed_books, max_allowed_media, max_allowed_devices)
VALUES
    ('customer', 1, 1, 1),
    ('Faculty', 3, 1, 1),
    ('Admin', 5, 5, 5);

   
CREATE TABLE customer(
        id serial PRIMARY KEY,
        first_name text,
        last_name text,
        password text,
        registration_date timestamp,
        role_id integer REFERENCES role(id)
    );
INSERT INTO customer(first_name, last_name, password, registration_date, role_id)
VALUES
    ('John', 'Doe', 'password1', '2023-01-15 10:00:00', 1),
    ('Jane', 'Smith', 'password2', '2023-02-20 14:30:00', 2),
    ('Alice', 'Johnson', 'password3', '2023-03-25 16:45:00', 3);


CREATE TABLE publisher(
        id serial PRIMARY KEY,
        city varchar(50),
        company_name varchar(50)
    );
INSERT INTO publisher(city, company_name)
values
    ('San Francisco', 'Chronicle Books'),
    ('Chicago', 'Amaxon');


CREATE TABLE book(
        id serial PRIMARY KEY,
        publisher_id integer references publisher(id),
        condition_book varchar,
        isbn varchar,
        title varchar,
        year_book varchar(4),
        edition varchar,
        genre varchar
    );
INSERT INTO book(publisher_id, condition_book, isbn, title, year_book, edition, genre)
VALUES
    (1, 'NEW', '9780451524935', 'Moby', 1851, '1st', 'Adventure'),
    (2, 'GOOD', '9780061122415', 'The Da Vinci Code', 2003, '1st', 'Thriller');


CREATE TABLE book_to_customer(
        id serial PRIMARY key,
        customer_id integer REFERENCES customer(id),
        book_id integer REFERENCES book(id),
        loaned_at date,
        loaned_until date
    );
INSERT INTO book_to_customer(customer_id, book_id, loaned_at, loaned_until)
VALUES
    (1, 2, '2023-06-15', '2023-07-15'),
    (3, 2, '2023-08-08', '2023-10-01');


CREATE table media(
        id serial primary key,
        publisher_id integer references publisher(id),
        title varchar,
        file_link varchar,
        file_type varchar,
        author varchar,
        upload_day date,
        file_size numeric
    );
insert into media(publisher_id, title, file_link, file_type, author, upload_day, file_size)
values(1, 'Bergstrom Podcast', 'https://sample.edu/railway', '.MP3', 'Joe Rogan', '2022-01-02', '50'),
    (2, 'Bermuda Triangle Map', 'https://btm.edu/map', '.MAP', 'Jefferson Thomas', '2022-01-03', '30');


create table media_to_customer(
        id serial primary key,
        customer_id integer REFERENCES customer(id),
        media_id integer references media(id),
        loaned_at date,
        loaned_until date
    );
insert into media_to_customer(customer_id, media_id, loaned_at, loaned_until)
VALUES(1, 1, '2023-01-02', '2023-01-09'),
    (2, 2, '2023-02-02', '2023-02-09');


create table hold_to_media(
        id serial primary key,
        customer_id integer references customer(id),
        media_id integer references media(id),
        held_at date,
        held_until date
    );
insert into hold_to_media(customer_id, media_id, held_at, held_until)
values(1, 1, '2023-04-02', '2023-04-09'),
    (2, 2, '2023-05-02', '2023-05-09');


CREATE TABLE fine(
        id serial PRIMARY KEY,
        customer_id INTEGER REFERENCES customer(id),
        fine_amount DECIMAL
    );
INSERT INTO fine(customer_id, fine_amount)
VALUES(1, 25.50),
    (2, 15.75),
    (3, 30.00);
 

CREATE TABLE fine_to_book(
        id serial PRIMARY KEY,
        fine_id INTEGER REFERENCES fine(id),
        book_id INTEGER REFERENCES book(id)
    );
INSERT INTO fine_to_book(fine_id, book_id)
VALUES(1, 1),
    (1, 2),
    (2, 2);

      
CREATE TABLE fine_to_media(
        id serial PRIMARY KEY,
        fine_id INTEGER REFERENCES fine(id),
        media_id INTEGER REFERENCES media(id)
    );
INSERT INTO fine_to_media(fine_id, media_id)
VALUES(1, 1),
    (2, 2),
    (3, 1);
  

CREATE TABLE transaction(
        id serial PRIMARY KEY,
        fine_id INTEGER REFERENCES fine(id),
        transaction_amount DECIMAL,
        card_number VARCHAR
    );
INSERT INTO transaction(fine_id, transaction_amount, card_number)
VALUES(1, 25.50, '1234-5678-9012'),
    (2, 15.75, '9876-5432-1098'),
    (3, 30.00, '2468-1357-3579');

      
create table device(
        id serial primary key,
        publisher_id integer references publisher(id),
        device_type varchar,
        device_name varchar,
        manufacturer varchar,
        year_publish date,
        serial_number varchar,
        operating_system varchar,
        maintenance_history varchar
    );
insert into device(publisher_id, device_type, device_name, manufacturer, year_publish, serial_number, operating_system, maintenance_history)
values(1, 'mobile', 'iPad Pro 11', 'Macintosh', '04-01-2021', 'ABC-1234', 'Mac', 'none'),
    (2, 'laptop', 'HP Laptop 12', 'HP', '01-01-2019', 'DEF-5678', 'Windows', 'repaired');


create table device_to_customer(
        id serial primary key,
        user_id integer references customer(id),
        device_id integer references device(id),
        held_at date,
        held_until date
    );
insert into device_to_customer(user_id, device_id, held_at, held_until)
values(1, 1, '2022-04-22', '2022-05-02'),
    (2, 2, '2023-07-25', '2023-08-14');


CREATE TABLE fine_to_device(
        id serial PRIMARY KEY,
        fine_id INTEGER REFERENCES fine(id),
        device_id INTEGER REFERENCES device(id)
    );
INSERT INTO fine_to_device(fine_id, device_id)
VALUES(1, 1),
    (2, 2),
    (3, 1);

CREATE TABLE hold_to_book(
        id serial PRIMARY KEY,
        customer_id INTEGER REFERENCES customer(id),
        book_id INTEGER REFERENCES book(id),
        held_at DATE,
        held_until DATE
    );
INSERT INTO hold_to_book(customer_id, book_id, held_at, held_until) VALUES(1, 1, '2022-01-01', '2022-01-31');


CREATE TABLE hold_to_device(
        id serial PRIMARY KEY,
        customer_id INTEGER REFERENCES customer(id),
        device_id INTEGER REFERENCES book(id),
        held_at DATE,
        held_until DATE
    );
INSERT INTO hold_to_device(customer_id, device_id, held_at, held_until) VALUES(1, 1, '2022-01-01', '2022-01-31');
`

module.exports = initializeQuery