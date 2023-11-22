const initializeQuery = `
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
        condition varchar,
        isbn varchar,
        title varchar,
        release_year varchar(4),
        edition varchar,
        genre varchar
    );
INSERT INTO book(publisher_id, condition, isbn, title, release_year, edition, genre)
VALUES(1, 'NEW', '9780451524935', 'Moby', 1851, '1st', 'Adventure'),
(2, 'GOOD', '9780061122415', 'The Da Vinci Code', 2003, '1st', 'Thriller'),
(1, 'LIKE NEW', '9780141439839', 'Pride and Prejudice', 1813, '2nd', 'Romance'),
(2, 'USED', '9780743273565', 'The Great Gatsby', 1925, '1st', 'Classic'),
(1, 'ACCEPTABLE', '9780553294385', 'Dune', 1965, '3rd', 'Science Fiction'),
(2, 'NEW', '9780345342966', 'The Hitchhiker\s Guide to the Galaxy', 1979, '1st', 'Science Fiction'),
(1, 'GOOD', '9780060850524', 'To Kill a Mockingbird', 1960, '2nd', 'Drama'),
(2, 'LIKE NEW', '9780316769487', 'The Catcher in the Rye', 1951, '1st', 'Coming-of-age'),
(1, 'USED', '9781400079986', 'The Kite Runner', 2003, '2nd', 'Drama'),
(2, 'ACCEPTABLE', '9780385504201', 'The Pillars of the Earth', 1989, '1st', 'Historical Fiction'),
(1, 'NEW', '9780441172719', 'Neuromancer', 1984, '1st', 'Cyberpunk');


CREATE TABLE book_to_customer(
        id serial PRIMARY key,
        customer_id integer REFERENCES customer(id),
        book_id integer REFERENCES book(id),
        loaned_at timestamp,
        loaned_until timestamp,
        returned_at timestamp
    );
INSERT INTO book_to_customer(customer_id, book_id, loaned_at, loaned_until, returned_at)
VALUES
    (1, 2, '2023-06-15', '2023-07-15', '2023-06-18'),
    (3, 2, '2023-08-08', '2023-10-01', '2023-09-05');


CREATE table media(
        id serial primary key,
        publisher_id integer references publisher(id),
        title varchar,
        file_link varchar,
        file_type varchar,
        author varchar,
        upload_day timestamp,
        file_size numeric
    );
insert into media(publisher_id, title, file_link, file_type, author, upload_day, file_size)
VALUES (1, 'Tech Insights with Sarah', 'https://sample.edu/tech-insights', '.MP3', 'Sarah Johnson', '2022-02-15 10:00:00', '45'),
    (2, 'Ancient Civilizations Documentary', 'https://btm.edu/documentary', '.MP4', 'Emily Turner', '2022-02-18 10:00:00', '75'),
    (1, 'Healthy Living Tips', 'https://sample.edu/health-tips', '.PDF', 'Dr. Smith', '2022-03-05 10:00:00', '20'),
    (2, 'Space Exploration Podcast', 'https://btm.edu/space-podcast', '.MP3', 'Astronaut Mike', '2022-03-10 10:00:00', '55'),
    (1, 'Cooking with Chef Amanda', 'https://sample.edu/cooking-show', '.AVI', 'Chef Amanda', '2022-04-01 10:00:00', '40'),
    (2, 'Travel Adventures with Alex', 'https://btm.edu/travel-adventures', '.MP4', 'Alexandra Roberts', '2022-05-20 10:00:00', '65'),
    (1, 'Fitness Challenge Video', 'https://sample.edu/fitness-challenge', '.MOV', 'John Fitness', '2022-06-02 10:00:00', '30'),
    (2, 'History Uncovered: Ancient Rome', 'https://btm.edu/history-rome', '.MP4', 'Professor Davis', '2022-06-15 10:00:00', '80'),
    (1, 'Gaming Tips and Tricks', 'https://sample.edu/gaming-tips', '.MP4', 'GamerX', '2022-10-05 10:00:00', '50'),
    (2, 'DIY Home Improvement Series', 'https://btm.edu/diy-home', '.AVI', 'HomeExpert', '2022-11-12 10:00:00', '45'),
    (1, 'Financial Planning Seminar', 'https://sample.edu/financial-seminar', '.PDF', 'FinancialAdvisor', '2022-12-01 10:00:00', '25');


create table media_to_customer(
        id serial primary key,
        customer_id integer REFERENCES customer(id),
        media_id integer references media(id),
        loaned_at timestamp,
        loaned_until timestamp,
        returned_at timestamp
    );
insert into media_to_customer(customer_id, media_id, loaned_at, loaned_until, returned_at)
VALUES(1, 1, '2023-01-02', '2023-01-09 10:00:00', '2023-01-05 10:00:00'),
    (2, 2, '2023-02-02', '2023-02-09 10:00:00', '2023-02-04 10:00:00');


create table hold_to_media(
        id serial primary key,
        customer_id integer references customer(id),
        media_id integer references media(id),
        held_at timestamp,
        held_until timestamp
    );
insert into hold_to_media(customer_id, media_id, held_at, held_until)
values(1, 1, '2023-04-02 10:00:00', '2023-04-09 10:00:00'),
    (2, 2, '2023-05-02 10:00:00', '2023-05-09 10:00:00');


CREATE TABLE fine(
        id serial PRIMARY KEY,
        customer_id INTEGER REFERENCES customer(id),
        fine_amount DECIMAL,
        fined_at timestamp
    );
INSERT INTO fine(customer_id, fine_amount, fined_at)
VALUES(1, 25.50, '2023-05-01 10:00:00'),
    (2, 15.75, '2023-06-25 10:00:00'),
    (3, 30.00, '2023-07-15 10:00:00');
 

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
        year_publish timestamp,
        serial_number varchar,
        operating_system varchar,
        maintenance_history varchar
    );
insert into device(publisher_id, device_type, device_name, manufacturer, year_publish, serial_number, operating_system, maintenance_history)
VALUES(1, 'mobile', 'iPad Pro 11', 'Macintosh', '04-01-2021', 'ABC-1234', 'Mac', 'none'),
(2, 'laptop', 'HP Laptop 12', 'HP', '01-01-2019', 'DEF-5678', 'Windows', 'repaired'),
(1, 'tablet', 'Samsung Galaxy Tab S7', 'Samsung', '06-15-2020', 'GHI-9012', 'Android', 'none'),
(2, 'desktop', 'Dell OptiPlex 7070', 'Dell', '03-10-2020', 'JKL-3456', 'Windows', 'upgraded RAM'),
(1, 'smartphone', 'iPhone 12', 'Apple', '09-20-2020', 'MNO-7890', 'iOS', 'battery replacement'),
(2, 'laptop', 'Lenovo ThinkPad X1 Carbon', 'Lenovo', '05-05-2022', 'PQR-1234', 'Windows', 'none'),
(1, 'smartwatch', 'Fitbit Versa 3', 'Fitbit', '11-30-2021', 'STU-5678', 'Fitbit OS', 'screen replacement'),
(2, 'tablet', 'Amazon Fire HD 10', 'Amazon', '07-01-2018', 'VWX-9012', 'Fire OS', 'speaker repair'),
(1, 'smartphone', 'Google Pixel 6', 'Google', '10-15-2022', 'YZA-3456', 'Android', 'camera replacement'),
(2, 'laptop', 'Asus ROG Zephyrus G14', 'Asus', '04-02-2021', 'BCD-7890', 'Windows', 'keyboard repair'),
(1, 'desktop', 'HP Pavilion 24', 'HP', '08-20-2019', 'EFG-1234', 'Windows', 'none');

create table device_to_customer(
        id serial primary key,
        customer_id integer references customer(id),
        device_id integer references device(id),
        loaned_at timestamp,
        loaned_until timestamp,
        returned_at timestamp
    );
insert into device_to_customer(customer_id, device_id, loaned_at, loaned_until, returned_at)
values(1, 1, '2022-04-22', '2022-05-02 10:00:00', '2022-05-01 10:00:00'),
    (2, 2, '2023-07-25', '2023-08-14 10:00:00', '2023-07-28 10:00:00');


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
        held_at timestamp,
        held_until timestamp
    );
INSERT INTO hold_to_book(customer_id, book_id, held_at, held_until) VALUES(1, 1, '2022-01-01 10:00:00', '2022-01-31 10:00:00');


CREATE TABLE hold_to_device(
        id serial PRIMARY KEY,
        customer_id INTEGER REFERENCES customer(id),
        device_id INTEGER REFERENCES book(id),
        held_at timestamp,
        held_until timestamp
    );
INSERT INTO hold_to_device(customer_id, device_id, held_at, held_until) VALUES(1, 1, '2022-01-01 10:00:00', '2022-01-31 10:00:00');
`

module.exports = initializeQuery
