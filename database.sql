CREATE DATABASE togetherpray;

create table prayerrequests(
    prayer_id  serial PRIMARY key,
    title VARCHAR(255) not null,
    request varchar(255) not null
);

CREATE TABLE prayercomments (
    comment_id serial PRIMARY key,
    username varchar(255),
    comment varchar(255) NOT NULL,
    prayer_id int,
    FOREIGN KEY (prayer_id) REFERENCES prayerrequests(prayer_id)
);

select prayerrequests.title, prayercomments.username, prayercomments.comment
from prayerrequests
join prayercomments on prayerrequests.prayer_id = prayercomments.prayer_id;