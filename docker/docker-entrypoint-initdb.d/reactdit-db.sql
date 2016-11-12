--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2144 (class 1262 OID 12379)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE reactdit WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE reactdit OWNER TO postgres;

\connect reactdit

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2145 (class 1262 OID 12379)
-- Dependencies: 2144
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE reactdit IS 'default administrative connection database';

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE comments (
    body text,
    created timestamp with time zone,
    updated timestamp with time zone,
    pk_threads_id integer,
    pk_users_id integer,
    id integer NOT NULL,
    parent_id integer DEFAULT 0 NOT NULL
);


ALTER TABLE comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: forums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE forums (
    id integer NOT NULL,
    name text
);


ALTER TABLE forums OWNER TO postgres;

--
-- Name: threads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE threads (
    pk_users_id integer,
    title text,
    created timestamp with time zone,
    pk_forum_id integer,
    content text,
    id integer NOT NULL,
    type text NOT NULL
);


ALTER TABLE threads OWNER TO postgres;

--
-- Name: threads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE threads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE threads_id_seq OWNER TO postgres;

--
-- Name: threads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE threads_id_seq OWNED BY threads.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    username text
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY threads ALTER COLUMN id SET DEFAULT nextval('threads_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY comments (body, created, updated, pk_threads_id, pk_users_id, id, parent_id) FROM stdin;
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comments_id_seq', 98, true);


--
-- Data for Name: forums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY forums (id, name) FROM stdin;
1	testforum
\.


--
-- Name: threads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('threads_id_seq', 16, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, username) FROM stdin;
0	Anonymous
\.


--
-- Name: comment_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comment_id PRIMARY KEY (id);


--
-- Name: id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY forums
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- Name: thread_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT thread_id PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fki_author; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_author ON threads USING btree (pk_users_id);


--
-- Name: fki_forum_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_forum_id ON threads USING btree (pk_forum_id);


--
-- Name: fki_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_users_id ON comments USING btree (pk_users_id);


--
-- Name: author; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT author FOREIGN KEY (pk_users_id) REFERENCES users(id);


--
-- Name: forum_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT forum_id FOREIGN KEY (pk_forum_id) REFERENCES forums(id);


--
-- Name: users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT users_id FOREIGN KEY (pk_users_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
