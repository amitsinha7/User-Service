#!/bin/bash
set -e
       
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE my_project_development;
    GRANT ALL PRIVILEGES ON DATABASE my_project_development TO docker;
    CREATE DATABASE my_project_test;
    GRANT ALL PRIVILEGES ON DATABASE my_project_test TO docker;

    DROP TABLE IF EXISTS "error";
    CREATE TABLE "error" (
    "httpStatusCode" integer NOT NULL,
    "errorCode" character varying NOT NULL,
    "businessContext" character varying NOT NULL,
    "errorMessage" character varying NOT NULL,
    "errorReference" character varying NOT NULL,
    "severity" character varying NOT NULL,
    CONSTRAINT "PK_c76e8b0652a7c4e0954f66bf5cd" PRIMARY KEY ("errorCode")
    ) WITH (oids = false);


    DROP TABLE IF EXISTS "user";
    DROP SEQUENCE IF EXISTS user_id_seq;
    CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

    CREATE TABLE "user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "first_name" character varying(80) NOT NULL,
    "last_name" character varying(80) NOT NULL,
    "email" character varying(100) NOT NULL,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
    ) WITH (oids = false);

    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('9011000', 'User_Service', 'Unfortunately, we experienced some technical difficulties while processing your request. Please contact the system administrator.','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901200', 'User_Service', 'Unfortunately, First Name Missiong. Please try to after sometime.','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901201', 'User_Service', 'Unfortunately, Last Name Missiong. Please try to after sometime.','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901202', 'User_Service', 'Unfortunately, the email id is invalid.','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901203', 'User_Service', 'Email Already Exist, Try with another email','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901204', 'User_Service', 'Sorry, we can not find this User id. Please enter a valid user id.','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901205', 'User_Service', 'Provided user id is unavailable in crrent database','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901206', 'User_Service', 'Provided user id is unavailable in crrent database, Please try again with correct user Id','INFO',200,3);
    INSERT INTO public.error("errorCode", "businessContext", "errorMessage", "errorReference", "httpStatusCode", severity) VALUES ('901207', 'User_Service', 'Provided user id and associate email is unavailable in crrent database, Please try again with correct user Id and email','INFO',200,3);
    INSERT INTO public.user(id, first_name, last_name, email)	VALUES (1,'Amit','Sinha','amit.aaa@gmailtest.com');
    INSERT INTO public.user(id, first_name, last_name, email)	VALUES (2,'Amit1','Sinha','amit.ddd@gmailtest.com');
    INSERT INTO public.user(id, first_name, last_name, email)	VALUES (3,'Amit2','Sinha','amit.bbb@gmailtest.com');
    INSERT INTO public.user(id, first_name, last_name, email)	VALUES (4,'Test','Sinha','atest.aaa@gmailtest.com');
    INSERT INTO public.user(id, first_name, last_name, email)	VALUES (5,'Test1','Sinha','btest.ddd@gmailtest.com');
    INSERT INTO public.user(id, first_name, last_name, email)	VALUES (6,'Test2','Sinha','ctest.bbb@gmailtest.com');
EOSQL