--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-06-17 20:40:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 24594)
-- Name: scan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scan (
    id bigint NOT NULL,
    ip text,
    mask text,
    port_protocol text,
    port text,
    protocol text,
    service text,
    status text,
    launch_date timestamp without time zone,
    ending_date timestamp without time zone
);


ALTER TABLE public.scan OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24593)
-- Name: scan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scan_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 215
-- Name: scan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scan_id_seq OWNED BY public.scan.id;


--
-- TOC entry 222 (class 1259 OID 24622)
-- Name: tabl_last_passwords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tabl_last_passwords (
    passwd_id bigint NOT NULL,
    user_id bigint,
    password character varying(255),
    created_dt timestamp without time zone,
    changed_dt timestamp without time zone
);


ALTER TABLE public.tabl_last_passwords OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24621)
-- Name: tabl_last_passwords_passwd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tabl_last_passwords_passwd_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tabl_last_passwords_passwd_id_seq OWNER TO postgres;

--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 221
-- Name: tabl_last_passwords_passwd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tabl_last_passwords_passwd_id_seq OWNED BY public.tabl_last_passwords.passwd_id;


--
-- TOC entry 224 (class 1259 OID 24629)
-- Name: tbl_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_settings (
    setting_id bigint NOT NULL,
    _group character varying(20),
    _key character varying(255),
    val character varying(10000),
    enabled smallint,
    created_dt time without time zone,
    changed_dt time without time zone
);


ALTER TABLE public.tbl_settings OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24628)
-- Name: tbl_settings_setting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_settings_setting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_settings_setting_id_seq OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 223
-- Name: tbl_settings_setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_settings_setting_id_seq OWNED BY public.tbl_settings.setting_id;


--
-- TOC entry 218 (class 1259 OID 24603)
-- Name: tbl_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_users (
    user_id bigint NOT NULL,
    username character varying(128) NOT NULL,
    login character varying(128) NOT NULL,
    password character varying(128),
    role_id smallint,
    salt character varying(128),
    attempts integer DEFAULT 0,
    "position" character varying(128),
    div_id integer,
    phone_int character varying(24),
    phone_mob character varying(24),
    email character varying(128),
    enabled integer,
    created_dt timestamp without time zone,
    changed_dt timestamp without time zone,
    rem text
);


ALTER TABLE public.tbl_users OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24613)
-- Name: tbl_users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_users_roles (
    role_id bigint NOT NULL,
    title character varying(20),
    permissions character varying(1000),
    locked smallint,
    creator_id smallint,
    changed_dt timestamp without time zone,
    created_dt timestamp without time zone
);


ALTER TABLE public.tbl_users_roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24612)
-- Name: tbl_users_roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_users_roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_users_roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 219
-- Name: tbl_users_roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_users_roles_role_id_seq OWNED BY public.tbl_users_roles.role_id;


--
-- TOC entry 217 (class 1259 OID 24602)
-- Name: tbl_users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 217
-- Name: tbl_users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_users_user_id_seq OWNED BY public.tbl_users.user_id;


--
-- TOC entry 3194 (class 2604 OID 24597)
-- Name: scan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan ALTER COLUMN id SET DEFAULT nextval('public.scan_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 24625)
-- Name: tabl_last_passwords passwd_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabl_last_passwords ALTER COLUMN passwd_id SET DEFAULT nextval('public.tabl_last_passwords_passwd_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 24632)
-- Name: tbl_settings setting_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_settings ALTER COLUMN setting_id SET DEFAULT nextval('public.tbl_settings_setting_id_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 24606)
-- Name: tbl_users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users ALTER COLUMN user_id SET DEFAULT nextval('public.tbl_users_user_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 24616)
-- Name: tbl_users_roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users_roles ALTER COLUMN role_id SET DEFAULT nextval('public.tbl_users_roles_role_id_seq'::regclass);


--
-- TOC entry 3357 (class 0 OID 24594)
-- Dependencies: 216
-- Data for Name: scan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scan (id, ip, mask, port_protocol, port, protocol, service, status, launch_date, ending_date) FROM stdin;
\.


--
-- TOC entry 3363 (class 0 OID 24622)
-- Dependencies: 222
-- Data for Name: tabl_last_passwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tabl_last_passwords (passwd_id, user_id, password, created_dt, changed_dt) FROM stdin;
\.


--
-- TOC entry 3365 (class 0 OID 24629)
-- Dependencies: 224
-- Data for Name: tbl_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_settings (setting_id, _group, _key, val, enabled, created_dt, changed_dt) FROM stdin;
1	ssl	sertificat	-----BEGIN CERTIFICATE-----\\nMIIDTDCCAjSgAwIBAgIFNzk1MjUwDQYJKoZIhvcNAQELBQAwXjEQMA4GA1UEAxMH\\nVGVzdCBDQTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNV\\nBAcTDVNhbiBGcmFuY2lzY28xEDAOBgNVBAoTB1Rlc3QgQ0EwHhcNMjMwMTExMTAw\\nOTE2WhcNMjQwMTExMTAwOTE2WjAUMRIwEAYDVQQDEwlsb2NhbGhvc3QwggEiMA0G\\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8qJNoXLtwsPyFJcOcRBK4GsQJlr+2\\nBX3nrYKFtiVw56JXbIWXm3j6gNyGvWPOOuRYXQX+PdySRAdZzEm+PbzGhpjuUOxK\\njV57yyVI3kWH8t/UIkQUM0VlKB27GuTDr34Y8uivlUheQvuMzdSrjc71B43MXky+\\n1gGuDI09QoFN2fE01L92jUxtWOkAHRIKq5sXoXDmoLLHaKhCS3qM4J/h40RMIeV6\\nwOBRyEQKYp8IWZeP6Oujwlzx/IZ56h8wYQ5DYiQJPsxEvWcLvNJ3V/rP7m0wz/ct\\nuQndyv3JJTts90idMu9pBXHaWjsWsquIAios73UxCiT8KiUNYXBfgIILAgMBAAGj\\nWzBZMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsG\\nAQUFBwMBBggrBgEFBQcDAjAaBgNVHREEEzARgglsb2NhbGhvc3SHBH8AAAEwDQYJ\\nKoZIhvcNAQELBQADggEBAFj/Cj25z9AIQ4tAH+xOX5doNCFXbPTc675Jm+VPn+s2\\n3lwZl5iKvqjGPmnT1pwS9Dbzvbam7GiKooKphMC8G6pLU2goRy0kaks35WLz7uo5\\nXULbLvO/HHg3+RFrRCbG8IJjjMtX3vzGzPUMd7R+t/64XNb3rulNiA4p8rHvj/VO\\nMMxS+X3/mnx+ofwJteUNVHQmVYrYa2VFlTLlJeV5ilmY6p6TodBBD3kf+lAgtp61\\ncKkcSucr0kj3bww+uz56NaljtgMUg9TOi5vWdFRyemH83dk7Mg3TXMxZOqkWUBra\\nmDGGYiNXRL1BHUikDY0BRfvCE7XTcH18sLuBKDYrILQ=\\n-----END CERTIFICATE-----\\n\\n-----BEGIN CERTIFICATE-----\\nMIIDXjCCAkagAwIBAgIFODg4NTQwDQYJKoZIhvcNAQELBQAwXjEQMA4GA1UEAxMH\\nVGVzdCBDQTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNV\\nBAcTDVNhbiBGcmFuY2lzY28xEDAOBgNVBAoTB1Rlc3QgQ0EwHhcNMjMwMTExMTAw\\nODAyWhcNMjQwMTExMTAwODAyWjBeMRAwDgYDVQQDEwdUZXN0IENBMQswCQYDVQQG\\nEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNU2FuIEZyYW5jaXNj\\nbzEQMA4GA1UEChMHVGVzdCBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\\nggEBAMijcC7n8/gWJ4nJK5DL9jaiKcmfv+17nR4RlrP/PlSeEytlwczbDz0WAvxA\\nI3UaF4tWrQd96PK149n8bpx2uyGuIQAS+D05C17c1VFhIMvXmt5c0Lt31aTCkCOu\\n/nUB7vwSdDFPjEs2BKXhYkLkRcud5YohwxPpFEBmIoAIA7rtz0CIitYhcVakMjmI\\n1cb3YvJInYhtkQtiW3Vq9p0WHipJ8GKBv7ypSicX8i8bpL5NV2usGTmSiYAFlNIB\\n84BxTDU6m9ye1gA2TX3U661GIdpbVJ6Bu7UGv/wMJC8gHZV9kv1EhiyOvJzT4jPB\\n+X0dxwUTVXH64L4bbQatmYn0dccCAwEAAaMjMCEwDwYDVR0TAQH/BAUwAwEB/zAO\\nBgNVHQ8BAf8EBAMCAgQwDQYJKoZIhvcNAQELBQADggEBAJSYXHHHYHYoAZHtLe0c\\nqhkzRXtKRKdT0LagZ0LHDcXXKov9axlc7N58vSLNC49l6WnqST2xmw+2p75G9sak\\neUYRRECh05rue07BbG7fTMoeH39JdvHMzoTVNF76n9Z3YL3Mq26xhu8jczEjU/qK\\nkPf2xBR/nDXZDTIbA2xRsmyti4niDFZks5X0HmEpIlYzGCeMAZLb7r9IZe2DCd0p\\nnV8d2KWSd4Poh4QITuhamZfgkfaKxg3f8fpmO0+q1FTqlwDQ1boeQCjQ1n4lbkVn\\nIGUvwc6AlWMeG0WlwuNdPcqGmT2cwlDeFSu5ch/dDboiCtM5JP0AL/3FdkY0RNA3\\nvRg=\\n-----END CERTIFICATE-----\\n	1	19:41:49	15:30:31
2	ssl	privat_key	-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIEowIBAAKCAQEAvKiTaFy7cLD8hSXDnEQSuBrECZa/tgV9562ChbYlcOeiV2yF\\r\\nl5t4+oDchr1jzjrkWF0F/j3ckkQHWcxJvj28xoaY7lDsSo1ee8slSN5Fh/Lf1CJE\\r\\nFDNFZSgduxrkw69+GPLor5VIXkL7jM3Uq43O9QeNzF5MvtYBrgyNPUKBTdnxNNS/\\r\\ndo1MbVjpAB0SCqubF6Fw5qCyx2ioQkt6jOCf4eNETCHlesDgUchECmKfCFmXj+jr\\r\\no8Jc8fyGeeofMGEOQ2IkCT7MRL1nC7zSd1f6z+5tMM/3LbkJ3cr9ySU7bPdInTLv\\r\\naQVx2lo7FrKriAIqLO91MQok/ColDWFwX4CCCwIDAQABAoIBAAm4Q7P2Rx/0tmXj\\r\\nvrK/3RkII/58ek8V9Fkp2tYpvr8U6AvKBw37EB4T4oi8nDZFWXtl+4eQR1tvztMl\\r\\nD82R37Z4u8tXdv0WUH5fRoH9Fab97+M9irVhuNsP2IxJw+yDD6OYbD2TmuFkYRJt\\r\\njl3yVe3Q4FDdsOWKIBcIBYTY9tF8aOINxTFsHDVsQ1xvLTRNgY8JRdnHJG26fOS9\\r\\nbYZeAn77E4ECZwJMGVkgj8I9W3mzAEByu7ZpHZAb5GWv3Sp/9/cv2gKVNcGWU+cp\\r\\n5KOjkGi2VvoLHp6eLuaeTbqsDvM6rT2xLnOQn1KMOyFA0KukejhRpfr7TgQBYdKM\\r\\nid1LNh0CgYEA5jgCt+N+1x77Y7DkQ9dy6NfY61zzAXEX2ATzXSun3Q3HU6y9J2qf\\r\\nowkid1I6ZH9K9JXzK9oGlsPSZDfTYPwlKKNmAwZw5Wz1JevJOINKXiUxOiAen6+T\\r\\nLJnz4yH3uOloR9Koycn2daPo4i2c6QUYR7igOkKYcOom5Bl7wz4ahM8CgYEA0ckZ\\r\\nz4e8kI9rX7oCSB4DrAdjKU0ZrhY3vwyut4ibTA9kuf05wIzERnqBQ5RTAv6KCM3V\\r\\nveG0f2MWzLqyGwQKlHMm/TrRNkcdZh/t2qllEIi3O8FXfCIBghIgPgYn90CGluvK\\r\\nsfreZPFK5N87mU6zm/V5x4a9v8x1Ed/3sI4T9gUCgYAE3JnyGDPNhzH34PxxElOy\\r\\n5xwFnGjlVuYSAcjB5vIckPXspnE4K+BDKSY5Lttc0/NZRvFjs67/8BK5WxRzr995\\r\\nBDpbRf+MWMi0jE4ri1o+srpfZ949sQ+CmZ205jq9BPDW03QNDt7NjTCV1jDCGwFw\\r\\nQk3f7RgbClbX6lHaxaz5sQKBgQCij5LQnf4ghwJNS3Y5LAjsZU0R1AzyOYU5Jjq9\\r\\nPb4ZUlRbSz5VVr9BXeyM0YMB7vxHljjqyttzWvVv77vT822/Wvv7fnhf9vtxB4zo\\r\\nxBrslQRn6YpBRpikkicp6NtPXVDt4glPoXZ0AgZnFBS616GWWMHlOyQOXADbuRHW\\r\\nXkJZgQKBgBmes9uUeoGyxbfcorFi0KhJhXFOKxGSK3gbZ0Uqx9KfaXA83+SB4Krb\\r\\nlxyZ2oM1N05RmZeBIS5YY1ZVfada5aNdOK3Ap+pOxy2eMMGxO5LfryARVN8k5nW8\\r\\nPY5NO9TaVoXBXSBurw8sb+IsLEBG4LFvBleKO18wxq9hmerA43SD\\r\\n-----END RSA PRIVATE KEY-----\\r\\n	1	\N	15:30:31
3	passwd	pass_back	3	1	11:58:51	11:11:19
4	passwd	pass_enabled	0	1	11:58:51	11:11:19
\.


--
-- TOC entry 3359 (class 0 OID 24603)
-- Dependencies: 218
-- Data for Name: tbl_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_users (user_id, username, login, password, role_id, salt, attempts, "position", div_id, phone_int, phone_mob, email, enabled, created_dt, changed_dt, rem) FROM stdin;
3	Пользователь	user	$2b$10$yepO0.9F.UTQzQ1wxGsG3ePogrPES4kKxu4yTBa.iwXezBPZ0/IZi	2	\N	1	user	36	00001	+79009009090	user@dinatech.ru	1	2023-04-28 17:46:39	2023-05-31 14:56:53	\N
4	Администратор	admin1	$2b$10$YyYea6hBwGGDJvs1HHsc..xaiHhBb8tVG1.D7NFL0jMat0oo2LbwC	1	\N	\N	admin	36	00003	+79009009090	admin@dinatech.ru	1	2023-04-28 17:46:41	2023-04-28 17:46:41	\N
5	Дежурный	fedo1r	$2b$10$7WM39w9w4nUbIdFWj5OlFen92F0AH10liUXvfXBjcSH7Wn8BF7LcW	3	\N	\N	Дежурный	36	00002	+79009009090	duty@dinatech.ru	1	2023-04-30 16:24:18	2023-04-30 16:24:18	\N
6	Пользователь	user1	$2b$10$yepO0.9F.UTQzQ1wxGsG3ePogrPES4kKxu4yTBa.iwXezBPZ0/IZi	2	\N	\N	user	36	00001	+79009009090	user@dinatech.ru	1	2023-04-28 17:46:39	2023-04-28 17:46:39	\N
11	Дежурный	fedo3	$2b$10$7WM39w9w4nUbIdFWj5OlFen92F0AH10liUXvfXBjcSH7Wn8BF7LcW	3	\N	\N	Дежурный	36	00002	+79009009090	duty@dinatech.ru	1	2023-04-30 16:24:18	2023-04-30 16:24:18	\N
13	Администратор	admin5	$2b$10$YyYea6hBwGGDJvs1HHsc..xaiHhBb8tVG1.D7NFL0jMat0oo2LbwC	1	\N	\N	admin	36	00003	+79009009090	admin@dinatech.ru	1	2023-04-28 17:46:41	2023-04-28 17:46:41	\N
2	Дежурный	fedor	903cb9eef22ebd3bc60ca8b2ffca089d62d9d75274cb368636b02e14c4b65813395186532c0aaa9be8caf96fb3ed1d559e45e936c47eacc7effba048e7a02e22	4	\N	1	Дежурный	36	00002	+79009009090	duty@dinatech.ru	1	2023-04-30 16:24:18	2023-05-04 15:36:38	\N
12	1231231123	admin111	36f32898bc49cdb888bf4e4fdc81f4c1604704dd13dfe6950a40aa0355a7c7d9fca19c83273570bfa29c21016f82e6f30558bf49ab84039e8413be6dc07b2ed5	1	\N	0	\N	\N	Tester1111	111111111111121	+79001112233	1	\N	\N	false
14	12312311231	admin1111	022716851859d7d593a3fa0428fefb1b56a8d1b37954dcbf41675231c058f96e195192fbbc1a7c5929aaa1df8aac0b8b096b46c2a51e143faeedd7ac47759f5e	1	\N	0	\N	\N	Tester1111	111111111111121	+79001112233	1	\N	\N	false
8	123123112345	admin1113	c559c151590678523a98f19c512868c984da82b3df40abdaf859d4614077180cc41d51c9bf24d53c4c83c3db91c42676850de640713f14755d2f81421c95028e	1	\N	0	\N	\N	Tester1111	111111111111121	+790011122332	1	\N	\N	false
9	123123112346	admin1114	e6f5c57a560508d0ed24827f62cf830e3402b6ae5f57f37399c68924ff655e68ad25b9209d3c26bc572069ac924e13ac70446a0deaa84e96a611d520450a33d6	1	\N	0	\N	\N	Tester1111	111111111111121	+790011122333	1	\N	\N	false
10	123123112347	admin1115	858ffeefcf5d94a75e2ff81d372ae0da87d9f70de922eaf99c6f84f9c0e94224947a05f268f3df95725e7f7eb5784f800e1d024762806c731086fbf0013af4b9	1	\N	0	\N	\N	Tester1111	111111111111121	+790011122335	1	\N	\N	false
16	12312311231	admin1111ыф	804235d1c3c61b2fbc7d2728f04b7ac00c2ad79db55e03da866c988ed4480b2ad971f8ee6f070021e3c51dbe7be35f8b56528a9182cdd18766204f07c8d90baf	1	6323324487	0	0	\N	Tester1111	111111111111121	+79001112233	1	\N	\N	1
1	Администратор666	admin	d456b104fe116a54fea313d266c49d685b645cfe907a172d1899697ee83e1ffdd902b275c3dc59a0414b0350dcb0977d8e3b39d9e2367079a75735007f8f4f10	3	1	1	admin	36	00003	+79009009090	admin@dinatech.ru	1	2023-04-28 17:46:41	2023-05-04 15:45:51	
\.


--
-- TOC entry 3361 (class 0 OID 24613)
-- Dependencies: 220
-- Data for Name: tbl_users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_users_roles (role_id, title, permissions, locked, creator_id, changed_dt, created_dt) FROM stdin;
3	Дежурный	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-04 15:38:01	\N
4	Администратор ИБ	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-14 13:35:19	2023-03-14 10:34:01
12	fgadsfgdsf	{"dashboards_read":false,"dashboards_edit":false,"vulnerabilities_read":false,"vulnerabilities_edit":false,"bestpractice_read":false,"bestpractice_edit":false,"scheduledjobs_read":false,"scheduledjobs_edit":false,"settings_read":false,"settings_edit":false,"reports_read":false,"reports_edit":false}	\N	1	\N	\N
5	Fedor	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	\N	\N
1	Администратор СМИТР	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-04 15:37:49	2023-02-16 11:55:57
2	Администратор АС	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-04 15:37:56	\N
\.


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 215
-- Name: scan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scan_id_seq', 1, false);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 221
-- Name: tabl_last_passwords_passwd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tabl_last_passwords_passwd_id_seq', 1, false);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 223
-- Name: tbl_settings_setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_settings_setting_id_seq', 1, false);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 219
-- Name: tbl_users_roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_users_roles_role_id_seq', 12, true);


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 217
-- Name: tbl_users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_users_user_id_seq', 16, true);


--
-- TOC entry 3201 (class 2606 OID 24601)
-- Name: scan scan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan
    ADD CONSTRAINT scan_pkey PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 24627)
-- Name: tabl_last_passwords tabl_last_passwords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabl_last_passwords
    ADD CONSTRAINT tabl_last_passwords_pkey PRIMARY KEY (passwd_id);


--
-- TOC entry 3213 (class 2606 OID 24636)
-- Name: tbl_settings tbl_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_settings
    ADD CONSTRAINT tbl_settings_pkey PRIMARY KEY (setting_id);


--
-- TOC entry 3203 (class 2606 OID 24611)
-- Name: tbl_users tbl_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3207 (class 2606 OID 24620)
-- Name: tbl_users_roles tbl_users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users_roles
    ADD CONSTRAINT tbl_users_roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3209 (class 2606 OID 24643)
-- Name: tbl_users_roles title; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users_roles
    ADD CONSTRAINT title UNIQUE (title);


--
-- TOC entry 3205 (class 2606 OID 24641)
-- Name: tbl_users username login; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT "username login" UNIQUE (username, login);


-- Completed on 2023-06-17 20:40:16

--
-- PostgreSQL database dump complete
--

