CREATE DATABASE fso

CREATE TABLE Blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INT DEFAULT 0);

insert into blogs (author, url, title, likes) values ('Test Johnson', 'www.jtest.com', 'Lets test something', 21);
insert into blogs (author, url, title, likes) values ('Gia Pink', 'www.mypinkl.it', 'Pinky stories', 22);
