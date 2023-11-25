--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
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
-- Name: scan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scan_id_seq OWNED BY public.scan.id;


--
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
-- Name: tabl_last_passwords_passwd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tabl_last_passwords_passwd_id_seq OWNED BY public.tabl_last_passwords.passwd_id;


--
-- Name: tbl_ad_users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_ad_users_roles (
    ad_role_id bigint NOT NULL,
    title character varying(20) NOT NULL,
    ad_groupname character varying(50) NOT NULL,
    local_role_id bigint NOT NULL,
    changed_dt timestamp without time zone,
    created_dt timestamp without time zone
);


ALTER TABLE public.tbl_ad_users_roles OWNER TO postgres;

--
-- Name: tbl_ad_users_roles_ad_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_ad_users_roles_ad_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_ad_users_roles_ad_role_id_seq OWNER TO postgres;

--
-- Name: tbl_ad_users_roles_ad_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_ad_users_roles_ad_role_id_seq OWNED BY public.tbl_ad_users_roles.ad_role_id;


--
-- Name: tbl_ad_users_roles_local_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_ad_users_roles_local_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_ad_users_roles_local_role_id_seq OWNER TO postgres;

--
-- Name: tbl_ad_users_roles_local_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_ad_users_roles_local_role_id_seq OWNED BY public.tbl_ad_users_roles.local_role_id;


--
-- Name: tbl_containers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_containers (
    container_id character varying(128),
    image character varying(256),
    command character varying(128),
    created character varying(128),
    status character varying(128),
    ports character varying(128),
    _names character varying(128),
    created_dt timestamp without time zone,
    changed_dt timestamp without time zone,
    containers_id bigint NOT NULL
);


ALTER TABLE public.tbl_containers OWNER TO postgres;

--
-- Name: tbl_containers_containers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_containers_containers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_containers_containers_id_seq OWNER TO postgres;

--
-- Name: tbl_containers_containers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_containers_containers_id_seq OWNED BY public.tbl_containers.containers_id;


--
-- Name: tbl_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_images (
    image_id character varying(128),
    repository character varying(512),
    tag character varying(128),
    created_dt timestamp without time zone,
    changed_dt timestamp without time zone,
    images_id bigint NOT NULL,
    size character varying(128)
);


ALTER TABLE public.tbl_images OWNER TO postgres;

--
-- Name: tbl_images_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_images_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_images_images_id_seq OWNER TO postgres;

--
-- Name: tbl_images_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_images_images_id_seq OWNED BY public.tbl_images.images_id;


--
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
-- Name: tbl_settings_setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_settings_setting_id_seq OWNED BY public.tbl_settings.setting_id;


--
-- Name: tbl_tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_tasks (
    task_id bigint NOT NULL,
    title character varying,
    task_type character varying,
    logs character varying,
    _period character varying,
    created_dt time without time zone,
    chaged_dt time without time zone,
    creator_id bigint,
    _start character varying,
    _end character varying,
    status character varying
);


ALTER TABLE public.tbl_tasks OWNER TO postgres;

--
-- Name: tbl_tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_tasks_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_tasks_task_id_seq OWNER TO postgres;

--
-- Name: tbl_tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_tasks_task_id_seq OWNED BY public.tbl_tasks.task_id;


--
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
-- Name: tbl_users_roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_users_roles_role_id_seq OWNED BY public.tbl_users_roles.role_id;


--
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
-- Name: tbl_users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_users_user_id_seq OWNED BY public.tbl_users.user_id;


--
-- Name: scan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan ALTER COLUMN id SET DEFAULT nextval('public.scan_id_seq'::regclass);


--
-- Name: tabl_last_passwords passwd_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabl_last_passwords ALTER COLUMN passwd_id SET DEFAULT nextval('public.tabl_last_passwords_passwd_id_seq'::regclass);


--
-- Name: tbl_ad_users_roles ad_role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_ad_users_roles ALTER COLUMN ad_role_id SET DEFAULT nextval('public.tbl_ad_users_roles_ad_role_id_seq'::regclass);


--
-- Name: tbl_ad_users_roles local_role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_ad_users_roles ALTER COLUMN local_role_id SET DEFAULT nextval('public.tbl_ad_users_roles_local_role_id_seq'::regclass);


--
-- Name: tbl_containers containers_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_containers ALTER COLUMN containers_id SET DEFAULT nextval('public.tbl_containers_containers_id_seq'::regclass);


--
-- Name: tbl_images images_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_images ALTER COLUMN images_id SET DEFAULT nextval('public.tbl_images_images_id_seq'::regclass);


--
-- Name: tbl_settings setting_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_settings ALTER COLUMN setting_id SET DEFAULT nextval('public.tbl_settings_setting_id_seq'::regclass);


--
-- Name: tbl_tasks task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tbl_tasks_task_id_seq'::regclass);


--
-- Name: tbl_users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users ALTER COLUMN user_id SET DEFAULT nextval('public.tbl_users_user_id_seq'::regclass);


--
-- Name: tbl_users_roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users_roles ALTER COLUMN role_id SET DEFAULT nextval('public.tbl_users_roles_role_id_seq'::regclass);


--
-- Data for Name: scan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scan (id, ip, mask, port_protocol, port, protocol, service, status, launch_date, ending_date) FROM stdin;
\.


--
-- Data for Name: tabl_last_passwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tabl_last_passwords (passwd_id, user_id, password, created_dt, changed_dt) FROM stdin;
\.


--
-- Data for Name: tbl_ad_users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_ad_users_roles (ad_role_id, title, ad_groupname, local_role_id, changed_dt, created_dt) FROM stdin;
3	LDAPBDSM	LDAPBDSM	1	\N	\N
1	PPM -> Дежурный	PPM	1	\N	\N
\.


--
-- Data for Name: tbl_containers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_containers (container_id, image, command, created, status, ports, _names, created_dt, changed_dt, containers_id) FROM stdin;
10ed958a58cc	postgres:12	"docker-entrypoint.s…"	\N	--	--	--	\N	\N	35
c0f50e22fd42	quay.io/minio/minio	"/usr/bin/docker-ent…"	\N	--	--	--	\N	\N	36
0e96febed189	redis:latest	"docker-entrypoint.s…"	\N	--	--	--	\N	\N	37
067fdc3d5790	mariadb	"docker-entrypoint.s…"	\N	--	--	--	\N	\N	38
94877c8365be	7fe16b25e522	"/docker-entrypoint.…"	\N	--	--	--	\N	\N	39
0eec20f84d04	brainsam/pgbouncer:1.7.2	"./entrypoint.sh"	\N	--	--	--	\N	\N	40
\.


--
-- Data for Name: tbl_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_images (image_id, repository, tag, created_dt, changed_dt, images_id, size) FROM stdin;
b182ef6d607a	registry.antph.ru/start-gpb/frontend-bank	<none>	\N	\N	454	--
830b950bacb5	registry.antph.ru/start-gpb/backend-bank	<none>	\N	\N	455	--
9176915dcfa5	registry.antph.ru/start-gpb/frontend-bank	<none>	\N	\N	456	--
4657eb098818	registry.antph.ru/start-gpb/backend-bank	<none>	\N	\N	457	--
9b0429d03607	registry.antph.ru/start-gpb/frontend-bank	<none>	\N	\N	458	--
c7d3b8c85802	registry.antph.ru/start-gpb/backend-bank	<none>	\N	\N	459	--
47fc276ae4ea	registry.antph.ru/start-gpb/learning-bank	0.8	\N	\N	460	--
a22d559e5cd7	reestros-master_app	2.0	\N	\N	461	--
080ed0ed8312	nginx	latest	\N	\N	462	--
ac23c4ddf6fa	bitnami/pgbouncer	1.18.0	\N	\N	463	--
6e11fcfc66ad	mariadb	latest	\N	\N	464	--
f9c173b0f012	redis	7.0.9	\N	\N	465	--
971660cd20b7	quay.io/minio/minio	RELEASE.2023-02-27T18-10-45	\N	\N	466	--
042a816809aa	alpine	latest	\N	\N	467	--
ffd287e43d20	redis	7.0.5-alpine	\N	\N	468	--
3358aea34e8c	redis	7.0.5	\N	\N	469	--
dcb2210db7e5	postgres	12	\N	\N	470	--
d882c833e429	registry.antph.ru/start-gpb/frontend-bank	<none>	\N	\N	471	--
7b6e59279c38	portainer/portainer-ce	latest	\N	\N	472	--
615bce135f70	snyk/snyk	<none>	\N	\N	473	--
2edf146a7810	brainsam/pgbouncer	1.12	\N	\N	474	--
5ebd56b2ba73	brainsam/pgbouncer	1.7.2	\N	\N	475	--
f55358022500	registry.antph.ru/start-gpb/frontend-bank	latest	\N	\N	476	--
63d09b7d90d8	registry.antph.ru/start-gpb/backend-bank	latest	\N	\N	477	--
c939afe67c02	registry.antph.ru/start-gpb/backend-bank	1.8	\N	\N	478	--
6f00a89e54da	registry.antph.ru/start-gpb/backend-bank	<none>	\N	\N	479	--
{"deepfenceio/deepfence_agent_ce@sha256:445910bccca1cd6801b47ab1c351e23a7443179d805e92e5342dd80f6f2c8cd1"}	{"deepfenceio/deepfence_agent_ce:1.5.0"}	sha256:b25c7dfa972c3277d3d0aa3e386ba0256175cd30cd8e8fefe529039cbf36bea4	\N	\N	480	--
{"deepfenceio/deepfence_discovery_ce@sha256:407341a3ab79f49afd666b9c3438ee0543307e4677834ed2d7a92f0917828ee3"}	{"deepfenceio/deepfence_discovery_ce:1.5.0"}	sha256:9faf51706a07e8915b6e8c611ef5c71833e79572f07bccd46dfdec4bfb2db2a6	\N	\N	481	--
{"deepfenceio/deepfence_package_scanner_ce@sha256:89cb95ee9632c108f136a15445c5d2042518834e4a904ebf9e6b51fbc830cd3a"}	{"deepfenceio/deepfence_package_scanner_ce:1.5.0"}	sha256:8913e372ac2d19029e5712bbbd31ecc7cb6de4e237b3a6f3821a7c189164d1e0	\N	\N	482	--
{"deepfenceio/deepfence_secret_scanner_ce@sha256:ea01aa6853635ffd87f01798dfc80163f46f8d7f57f12e4f1909f69071c14351"}	{"deepfenceio/deepfence_secret_scanner_ce:1.5.0"}	sha256:a31d0507b9e40bbfb1122422cf441ce4e46fccfd353d1f7e811e870ae5f6e39a	\N	\N	483	--
{"deepfenceio/deepfence_diagnosis_ce@sha256:bd2faa87e040d2192aa3037b7245ccf425c2241107c86a1d256a5ceb39579095"}	{"deepfenceio/deepfence_diagnosis_ce:1.5.0"}	sha256:69e8e5b4dae2ffc7f5c1d2c0c4dd3db7f4d030a772432371808d9686402bd124	\N	\N	484	--
{"deepfenceio/deepfence_fetcher_ce@sha256:5bdafc81a420103d011f7e9df007ba87886397ecc40a05b154f1d1bd4025de2e"}	{"deepfenceio/deepfence_fetcher_ce:1.5.0"}	sha256:76af3df2577c2ec836c85d5d4a62ca5ca3988f1475a82ae3742e0c3d324b4fa6	\N	\N	485	--
{"deepfenceio/deepfence_ui_ce@sha256:5b1bfe5f68b71c2acb3d56f2d4a4fc9fc96506bafa0086d060b91ad05fe2fb2b"}	{"deepfenceio/deepfence_ui_ce:1.5.0"}	sha256:9baa034b5d61fade12214ffa2039e8e71f3fd9a82a92da5b614cf10d5e1b6575	\N	\N	486	--
{"deepfenceio/deepfence_api_ce@sha256:af0a8ac747514b2d9cd1f20ecd55eaa6d2a83e8ec1ac625751291c5bfb971b9e"}	{"deepfenceio/deepfence_api_ce:1.5.0"}	sha256:842fb9ef446a3e5ae42721bbae1c59a0d97a20f6c1dcc3c9409c78a1c3f92b5f	\N	\N	487	--
{"deepfenceio/deepfence_router_ce@sha256:4a119616922ca709f4399d8ca09465490cf54c89d5ec6e4984b74a24b8b6de0a"}	{"deepfenceio/deepfence_router_ce:1.5.0"}	sha256:8f7bd61ffbf97f35a8e6801b734328881aacf7e6531be2c97d4f6598435b9c9a	\N	\N	488	--
{"deepfenceio/deepfence_postgres_ce@sha256:ac3eb6b504d7f11427296f77b199c81b3c5f84de8768df4ee96431fcf82eecdb"}	{"deepfenceio/deepfence_postgres_ce:1.5.0"}	sha256:a04edd0e56f7e15ee57fcc4510cb05c060f42bd78780f85dfe14194bc4e58c9f	\N	\N	489	--
{"deepfenceio/deepfence_redis_ce@sha256:dd7576b2cd516ca628280dac7826935e5d1d771c4e4a112e42e8e67bef95151b"}	{"deepfenceio/deepfence_redis_ce:1.5.0"}	sha256:3c1fcf17678e6e59645ad4e5ebd6ff815a4dbb6da44ca9d3096447c75f911a4e	\N	\N	490	--
{"deepfenceio/deepfence_elastic_ce@sha256:244dcbf3a4314942f82ef1725b92ceae8f13d0cb771720518dd53bc4616f02b8"}	{"deepfenceio/deepfence_elastic_ce:1.5.0"}	sha256:429b8951eac05261634705d82f82b549e44d8a175fff1e89b8fd9597fa6e132c	\N	\N	491	--
{"deepfenceio/deepfence_vulnerability_mapper_ce@sha256:b667d9f85ec83f802216d973c046fcd478f03646e73eb76d4a873ea442275353"}	{"deepfenceio/deepfence_vulnerability_mapper_ce:1.5.0"}	sha256:bcf9e351e25d2c421c0ec9b97ae47d0e61cb238916d2b598cb22e1c5933c07b6	\N	\N	492	--
{"deepfenceio/deepfence_init_ce@sha256:b3002f532d7a941b75deff9a3610a37cce399639dd32e3742f9e2689d03aced1"}	{"deepfenceio/deepfence_init_ce:1.5.0"}	sha256:fe83ea415a98eb72d7061d20804be5086621d8d435eb7abcc0747ed0dfd55749	\N	\N	493	--
{"deepfenceio/deepfence_malware_scanner_ce@sha256:9ae6acefc827bc4440e68f0bdd093459edb6f2cf2ff1115855317d9fda09818a"}	{"deepfenceio/deepfence_malware_scanner_ce:1.5.0"}	sha256:23ec8c541895c90d6ba8e7eff13f76c5a21f5fe39d7d7e33188a4fd0f132471d	\N	\N	494	--
{"deepfenceio/deepfence_kafka_rest_proxy_ce@sha256:1d542cfd0eea4ba5613b6c72aa23d72726d12d167be8dc28a4f4cdbe0f16643f"}	{"deepfenceio/deepfence_kafka_rest_proxy_ce:1.5.0"}	sha256:622ea88166edf73d6ccfee14e11a83864b857408b5c172fa9b82386f4366f028	\N	\N	495	--
{"deepfenceio/deepfence_kafka_broker_ce@sha256:76a52442c4c19783e50210c9999718eff44b5ee89e59989b25d13aaefc42d1b4"}	{"deepfenceio/deepfence_kafka_broker_ce:1.5.0"}	sha256:829427f8821b2d523d85717a0ec42ba8769cf2449a982d8065c6746dd148b520	\N	\N	496	--
{"<none>@<none>"}	{"<none>:<none>"}	sha256:d4c0ede080e0c00050241ac032fb6b90984dc5a73dfdbf2f632861ceb254f44b	\N	\N	497	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	498	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	499	--
{"aquasec/trivy@sha256:9ff19e5b6cc17b5dd1e5e7ce46023d98ec03f80c4906024e7e23f5aad0606475"}	{"aquasec/trivy:latest"}	sha256:9dce420d0403147c09b2da75ae3b2615186532b2a5a40f3749fcfebb52827adb	\N	\N	500	--
{"alpine@sha256:b95359c2505145f16c6aa384f9cc74eeff78eb36d308ca4fd902eeeb0a0b161b"}	{"alpine:3.16"}	sha256:bfe296a525011f7eb76075d688c681ca4feaad5afe3b142b36e30f1a171dc99a	\N	\N	501	--
{"node@sha256:ecf74556cdeee48382e555a377ddb12d36161bd33349dc79290f733f763df711"}	{"node:16-alpine3.15"}	sha256:477eb7db0f2334e851486dac49fba1d6a0248e560610cf5e80026a98ff73cad1	\N	\N	502	--
{"deepfenceio/deepfence_agent_ce@sha256:19f92bbd2ef4487c898a2e3b7a721126cae3b4edaa5aeb79908f4410f293af29"}	{"deepfenceio/deepfence_agent_ce:1.4.1"}	sha256:299b8004c78cb9fd62c012d131bd886f25702829cfa66148f99f8624c41e3f4d	\N	\N	503	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	504	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	505	--
{"portainer/portainer-ce@sha256:5e4bacd2fc844919214d36ffec942464741762c106ae22adb5f4997f0f73b741"}	{"portainer/portainer-ce:latest"}	sha256:728247220223d9e342b751ff72dc4f9312c4fd45bdc80d64ad9c796b5c5666eb	\N	\N	506	--
{"postgres@sha256:93fd73e2322241eec204dac54b316bf429670ff6e5292e16f9e2fd3a3374a713"}	{"postgres:12"}	sha256:56e1d6dc77b242b5f4f91e7319f0740f7ab8bdf41023fd5d703f412ac87976f5	\N	\N	507	--
{"gitea/gitea@sha256:5fb6557629f19ad84ca2eda75e807f9c064cf72d27a56425492d2f4b2611775b"}	{"gitea/gitea:1.17.3"}	sha256:8376639274f823e53d5de2248a1d2553593dc8b1cd26e0a0362616ca3b740fe7	\N	\N	508	--
{"portainer/portainer-ce@sha256:5466af30b8eaf3f75edd3c74703d1c9973f0963acd6ef164913ea6f195d640c2"}	\N	sha256:500504ac663a58b283ab0a42f5318837203e08a777d34a2a0ed403f8dae1070f	\N	\N	509	--
{"portainer/portainer-ce@sha256:444ade51d69d7fca889c7aa14525c459dba313a0e7ca79aee985e6c0749427de"}	\N	sha256:47535c4d5fa6adbafdcdc956702feda60ccbf9005b423c7ee9b4ad735d0d2159	\N	\N	510	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	511	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	512	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	513	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	514	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	515	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	516	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	517	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	518	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	519	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	520	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	521	--
{"mongo@sha256:aec6809ed5837a2dc97e95a6cbddd73f80140ee0aac7cec3a8f887b4e7ac629e"}	{"mongo:4.0"}	sha256:d47c005e9fb1eafc05c8e5b6c3401aa6903fee0bb8b48d253a30090012b0b98b	\N	\N	522	--
{"mongo@sha256:8f77c137bf79d7022c96f17574a0efeaebc1ef8ceca171937661622e7e11e7df"}	{"mongo:4.4"}	sha256:4efbd72d3ba64025b5ee74b2c3ff71967ce30d10f4343c60ea5060c85437346a	\N	\N	523	--
{"traefik@sha256:fdff55caa91ac7ff217ff03b93f3673844b3b88ad993e023ab43f6004021697c"}	{"traefik:2.7"}	sha256:8345b2e8bee0c824835af0881cfdc602bbb351637c205cbebc76e7b74f813597	\N	\N	524	--
{"jitsi/jvb@sha256:8f81c1b8361233a407ebc4210536910b4ec11e885015451b4a009cd02284d75a"}	{"jitsi/jvb:stable-7287-2"}	sha256:7105a0e191b47ba87250ca80ad47f28aede9cecd144874e502339da45c694514	\N	\N	525	--
{"jitsi/jicofo@sha256:f82b4affad4e52854674ffb178ca40dabcfc3af2a087ebbf284934569744d425"}	{"jitsi/jicofo:stable-7287-2"}	sha256:6821224521fff026f8977809e807d24957cddbef19dffa14eee9478864b0de00	\N	\N	526	--
{"jitsi/prosody@sha256:4ec0f219ff8e1d912ce0106a52414c323f85ef6900b46bc97c700febba0fab81"}	{"jitsi/prosody:stable-7287-2"}	sha256:3ace824ffd47c079fc2e180b6fca0fb41ee6d8711ad27cbf66e23b5dc92e3ee2	\N	\N	527	--
{"jitsi/web@sha256:b89751242b64c408ba17b198cfa18e41f7b7536e3dc9ccc3956dfa0c69421ffc"}	{"jitsi/web:stable-7287-2"}	sha256:bc5e5abd0d12630e2e0a1c32f76861bc6f2a0d26afe469894a35e1ea9cf5980c	\N	\N	528	--
{"node@sha256:6b87d16e4ce20cacd6f1f662f66c821e4c3c41c2903daeace52d818ec3f4bbdd"}	{"node:14-alpine"}	sha256:47afee183159ba0ca6c1863db3d60303a6ec3c5a4f1ca29e632b22af559f48f7	\N	\N	529	--
{"ubuntu@sha256:fd92c36d3cb9b1d027c4d2a72c6bf0125da82425fc2ca37c414d4f010180dc19"}	{"ubuntu:20.04"}	sha256:20fffa419e3aaca519dad480b21e86d9bcfbc7795abf9419adc5adce1198c95e	\N	\N	530	--
{"rocket.chat@sha256:1716ac4d61466cb157a96241a90a1965aba1f2235a75251aaf5a54741533cf0b"}	{"rocket.chat:4.6"}	sha256:1dbd1a1343e6e4c14a30da76eeb16d341cf74d90e595499159d5c315b8600ce3	\N	\N	531	--
{"node@sha256:f7137af1e34927cb3251a6e091edff4592c49a89422196680a2f087edcbc6e4d"}	{"node:14-bullseye-slim"}	sha256:e2eb23c871f2e7324d65d5a74a480713e1574556801dff3804e61d7726223622	\N	\N	532	--
{"openjdk@sha256:4080b4bf2fe52288c18f3815bd1c55cff8fd3e6936d02af7cc9a32eb13cf9668"}	{"openjdk:8-jre-slim-bullseye"}	sha256:1211f482e7073b99ae8cb238a9a368b0ad3da336aec7a1765a08008788b3b0fb	\N	\N	533	--
{"debian@sha256:06a93cbdd49a265795ef7b24fe374fee670148a7973190fb798e43b3cf7c5d0f"}	{"debian:bullseye-slim"}	sha256:c9cb6c086ef7f9630b02d0cc2c0f1c6e9b1b8040dbfe74e78f1944b41cc301b6	\N	\N	534	--
{"redis@sha256:b06168908c93ebd1f175a85a0ce43a197149e2bfc8c120b53a80ed6bbe813838"}	{"redis:6.2-alpine"}	sha256:57c580553a4d75116313dfc44a4e49ffafcf4b57a8144c4e4bb105a4f37b2eb9	\N	\N	535	--
{"nginx@sha256:a74534e76ee1121d418fa7394ca930eb67440deda413848bc67c68138535b989"}	{"nginx:1.21-alpine"}	sha256:b1c3acb28882519cf6d3a4d7fe2b21d0ae20bde9cfd2c08a7de057f8cfccff15	\N	\N	536	--
{"apache/openmeetings@sha256:ba1e5029fb3f6d8cacaf1b9e9144e4716b7e9ab3ea9853a70bbd13947987be5c"}	{"apache/openmeetings:6.3.0"}	sha256:435219122299ee865d896aa618316281c114b41d08e8573a162945b44dd98846	\N	\N	537	--
{"portainer/portainer-ce@sha256:52f9fdee1e4acfb1b5c4ddd15c88905287efb6e8f8058d2c5a2543ddc72e9dc0"}	\N	sha256:7b6e59279c38731d61eb692897b1f7738c2bb0451a75608dc6031acde57bbb01	\N	\N	538	--
{"etherpad/etherpad@sha256:95e6251d48439345f88f1dd41cb32e265713574b1db7bee506447c91daa62f99"}	{"etherpad/etherpad:1.8.17"}	sha256:00a4f49ca7e409f46d7f066feba2787757b3b88fc33fbee68ff1db2f61bff453	\N	\N	539	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	586	--
{"eugenmayer/jodconverter@sha256:b2ad7ff151c908063e0d73567c4f9aaf16baf6a9d709f363969e837257d6b1a9"}	{"eugenmayer/jodconverter:rest"}	sha256:ac189a26aed736cd7a9acc2359809632ddeadba54a06920a8e0c245cd4050320	\N	\N	540	--
{"golang@sha256:ee3a388a872237ddb600de3ab9512e73df0043f8878f0f355baeb5b723ef16ec"}	{"golang:1.17.3-buster"}	sha256:08f6df476f804a5160564b7727699b278c8cd356bb81ce50bfb5b61cd87f8b6a	\N	\N	541	--
{"node@sha256:2a0f14f0a7fdc72b485a766153045b9966db81f42d41f9944b95dd38bc32a40d"}	{"node:14.18.1-bullseye-slim"}	sha256:c5a35e570612ca45a8e384f3f14d69da6acba80fd9814c1b79aea6d9f5e02787	\N	\N	542	--
{"node@sha256:240e1e6ef6dfba3bb70d6e88cca6cbb0b5a6f3a2b4496ed7edc5474e8ed594bd"}	{"node:14.18.1-alpine"}	sha256:f7229193551e22aac60a002deb0e6893b89e5fb3e2da80c0f345f75c7ec31a41	\N	\N	543	--
{"kurento/kurento-media-server@sha256:449d1f592e55f227b1182130b63a591757478da9132aac4bfd7c58b4db8087a2"}	{"kurento/kurento-media-server:6.16"}	sha256:6991d050db39ac0997906e06961b73dccac462ce9d5c999e0f5b042bd8723cdc	\N	\N	544	--
{"translucency/remotely@sha256:a77e40aadcc30cc404ea5268fe45ff49249bf06df76fe75c80d7216b48dda990"}	{"translucency/remotely:latest"}	sha256:83930f5b2514e31f21ce9afea1ffa8248b66811b7ace056082d21f278ff140ab	\N	\N	545	--
{"aauzid/bigbluebutton-livestreaming@sha256:60a30976d12607698fa7301336a9aad155585c34ab0a134aa55b6d9081e5d954"}	{"aauzid/bigbluebutton-livestreaming:latest"}	sha256:4fc889a083d1f03c1237e72f8bed898ed67b236386270efb7002cbccd4b2e445	\N	\N	546	--
{"gophish/gophish@sha256:c3ef42d16ce5db608ec4d182f2a0bf072e3aedfef05fe0e6544d23d6fc2036c9"}	{"gophish/gophish:latest"}	sha256:960f1d30ad0eb9dca0a58f6f45eea38aecc3094edbbfd25ecfe007aaa804cf2d	\N	\N	547	--
{"meething/meething@sha256:3dea69938527d782f2fb0f47a3cd60a8d9894f6b3d2aebd9c6eb8bf458beff1c"}	{"meething/meething:latest"}	sha256:2741b6745cb78a868027fa5db7f34c1510b8418fc05962902088a6a0ae7668c0	\N	\N	548	--
{"zabbix/zabbix-appliance@sha256:b8f66c17f3a7e6d10b1c16cbaa0106f8427096cfa0e8f91e4bf63667975cb636"}	{"zabbix/zabbix-appliance:latest"}	sha256:663a9b177b5407a259616c294a157d59f55db00f300f5e97fa6eb2a623c5adf0	\N	\N	549	--
{"mozilla/sbt@sha256:ef3d68311a898550672521011d254249a850bb55c88180bf99c978f6d1519518"}	{"mozilla/sbt:8u212_1.2.8"}	sha256:8e6cb7bcf65d21204d0fe8390f4d692e44e5d01adab413f18dd4d4308cd2925e	\N	\N	550	--
{"brainsam/pgbouncer@sha256:e040a83f580041736620e6ef4d3d7575549ccd82fc117e21a9c2c68653bc0cd4"}	{"brainsam/pgbouncer:1.7.2"}	sha256:5ebd56b2ba7352a8bf664751bbce3732db68d1955852c9d1f2de56df6eb0999f	\N	\N	551	--
{"jwilder/dockerize@sha256:b4da07ad265d2dd83fc91a73f56df54def78ba3db5c4fb74cbb9b7e79b7b3c58"}	{"jwilder/dockerize:latest"}	sha256:7f0a24804dce4e758f725924a7591031df4ce8b5656a12d78871be253e7eebcb	\N	\N	552	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	553	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	554	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	555	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	556	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	557	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	558	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	559	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	560	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	561	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	562	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	563	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	564	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	565	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	566	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	567	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	568	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	569	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	570	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	571	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	572	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	573	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	574	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	575	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	576	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	577	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	578	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	579	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	580	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	581	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	582	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	583	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	584	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	585	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	587	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	588	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	589	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	590	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	591	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	592	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	593	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	594	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	595	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	596	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	597	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	598	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	599	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	600	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	601	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	602	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	603	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	604	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	605	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	606	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	607	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	608	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	609	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	610	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	611	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	612	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	613	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	614	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	615	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	616	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	617	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	618	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	619	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	620	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	621	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	622	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	623	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	624	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	625	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	626	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	627	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	628	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	629	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	630	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	631	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	632	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	633	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	634	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	635	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	636	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	637	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	638	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	639	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	640	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	641	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	642	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	643	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	644	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	645	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	646	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	647	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	648	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	649	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	650	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	651	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	652	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	653	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	654	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	655	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	656	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	657	--
\N	{"ovpn-admin:local"}	sha256:eff2e2be67d24bd6f8a0812274406d33c17b866b56a2b8b0b5072672bef3f490	\N	\N	658	--
\N	{"openvpn:local"}	sha256:260e8badd5f5e7f25ed1cc3e08ed79b4eda73ad0c46e848aad6018f7200b3ce8	\N	\N	659	--
\N	{"registry.antph.ru/start-gpb/backend-bank:latest"}	sha256:0af1a339bea578102ac62ab18159467d602da98679e57404ce8953229f6a25c4	\N	\N	660	--
\N	{"registry.antph.ru/start-gpb/frontend-bank:latest"}	sha256:5a97fe6c75f2dd2df217ce13159e68fb423a2422ee0f356f185db1d895575141	\N	\N	661	--
\N	{"redis:latest"}	sha256:3e42dd4e79c7b6e416d06dde0de3e8b6cc73bf8f59dea9d3f784ac63cf4665a9	\N	\N	662	--
\N	{"bbb-docker_jodconverter:latest"}	sha256:1b7f1f1805a6e202492d4e7c69e2d17a907858a7557d75d893d13b074d2b36cb	\N	\N	663	--
\N	{"bbb-docker_apps-akka:latest"}	sha256:1764db4168a7b0deb17f88561a895f4053e0f33775de1693548d4c9134d681e0	\N	\N	664	--
\N	{"bbb-docker_fsesl-akka:latest"}	sha256:b71c86d77ce9215e9b8b7330c300fbf3c893002dcbda426806cc657329fbeaf4	\N	\N	665	--
\N	{"bbb-docker_nginx:latest"}	sha256:053abda4f55b945cb4f4ef9539bccf33fb834359bf40de5469ae24ecd15b2743	\N	\N	666	--
\N	{"bbb-docker_webrtc-sfu:latest"}	sha256:017ec92c61b121d9cc255142acb81db985bbf95f038e7561c3141e8b43651184	\N	\N	667	--
\N	{"bbb-html5:latest"}	sha256:f4b86ec5e46626abecaf8ba4afd8fc8dc5168c163fc30beb6a77f2916c8096b0	\N	\N	668	--
\N	{"bbb-docker_bbb-web:latest"}	sha256:05513fa7ea7e9ebb5d20207bdf72443fdccea3e952da929403e28512450827ac	\N	\N	669	--
\N	{"bbb-docker_etherpad:latest"}	sha256:f41cefd76fc9a10b0fc5d781a67d640d56fa56fb0782d44da636c50439fdafdf	\N	\N	670	--
\N	{"bbb-docker_freeswitch:latest"}	sha256:0260f961e5646008f0181860d2d60c42ca456f003498101ff6e22594c28e8d64	\N	\N	671	--
\N	{"mirotalksfu:latest"}	sha256:da26d230f97d1cda1419b58fb20ff4c06ef87683f8c8d21a1382f45c6fb813ec	\N	\N	672	--
\.


--
-- Data for Name: tbl_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_settings (setting_id, _group, _key, val, enabled, created_dt, changed_dt) FROM stdin;
1	ssl	sertificat	-----BEGIN CERTIFICATE-----\\nMIIDTDCCAjSgAwIBAgIFNzk1MjUwDQYJKoZIhvcNAQELBQAwXjEQMA4GA1UEAxMH\\nVGVzdCBDQTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNV\\nBAcTDVNhbiBGcmFuY2lzY28xEDAOBgNVBAoTB1Rlc3QgQ0EwHhcNMjMwMTExMTAw\\nOTE2WhcNMjQwMTExMTAwOTE2WjAUMRIwEAYDVQQDEwlsb2NhbGhvc3QwggEiMA0G\\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8qJNoXLtwsPyFJcOcRBK4GsQJlr+2\\nBX3nrYKFtiVw56JXbIWXm3j6gNyGvWPOOuRYXQX+PdySRAdZzEm+PbzGhpjuUOxK\\njV57yyVI3kWH8t/UIkQUM0VlKB27GuTDr34Y8uivlUheQvuMzdSrjc71B43MXky+\\n1gGuDI09QoFN2fE01L92jUxtWOkAHRIKq5sXoXDmoLLHaKhCS3qM4J/h40RMIeV6\\nwOBRyEQKYp8IWZeP6Oujwlzx/IZ56h8wYQ5DYiQJPsxEvWcLvNJ3V/rP7m0wz/ct\\nuQndyv3JJTts90idMu9pBXHaWjsWsquIAios73UxCiT8KiUNYXBfgIILAgMBAAGj\\nWzBZMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsG\\nAQUFBwMBBggrBgEFBQcDAjAaBgNVHREEEzARgglsb2NhbGhvc3SHBH8AAAEwDQYJ\\nKoZIhvcNAQELBQADggEBAFj/Cj25z9AIQ4tAH+xOX5doNCFXbPTc675Jm+VPn+s2\\n3lwZl5iKvqjGPmnT1pwS9Dbzvbam7GiKooKphMC8G6pLU2goRy0kaks35WLz7uo5\\nXULbLvO/HHg3+RFrRCbG8IJjjMtX3vzGzPUMd7R+t/64XNb3rulNiA4p8rHvj/VO\\nMMxS+X3/mnx+ofwJteUNVHQmVYrYa2VFlTLlJeV5ilmY6p6TodBBD3kf+lAgtp61\\ncKkcSucr0kj3bww+uz56NaljtgMUg9TOi5vWdFRyemH83dk7Mg3TXMxZOqkWUBra\\nmDGGYiNXRL1BHUikDY0BRfvCE7XTcH18sLuBKDYrILQ=\\n-----END CERTIFICATE-----\\n\\n-----BEGIN CERTIFICATE-----\\nMIIDXjCCAkagAwIBAgIFODg4NTQwDQYJKoZIhvcNAQELBQAwXjEQMA4GA1UEAxMH\\nVGVzdCBDQTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNV\\nBAcTDVNhbiBGcmFuY2lzY28xEDAOBgNVBAoTB1Rlc3QgQ0EwHhcNMjMwMTExMTAw\\nODAyWhcNMjQwMTExMTAwODAyWjBeMRAwDgYDVQQDEwdUZXN0IENBMQswCQYDVQQG\\nEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNU2FuIEZyYW5jaXNj\\nbzEQMA4GA1UEChMHVGVzdCBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\\nggEBAMijcC7n8/gWJ4nJK5DL9jaiKcmfv+17nR4RlrP/PlSeEytlwczbDz0WAvxA\\nI3UaF4tWrQd96PK149n8bpx2uyGuIQAS+D05C17c1VFhIMvXmt5c0Lt31aTCkCOu\\n/nUB7vwSdDFPjEs2BKXhYkLkRcud5YohwxPpFEBmIoAIA7rtz0CIitYhcVakMjmI\\n1cb3YvJInYhtkQtiW3Vq9p0WHipJ8GKBv7ypSicX8i8bpL5NV2usGTmSiYAFlNIB\\n84BxTDU6m9ye1gA2TX3U661GIdpbVJ6Bu7UGv/wMJC8gHZV9kv1EhiyOvJzT4jPB\\n+X0dxwUTVXH64L4bbQatmYn0dccCAwEAAaMjMCEwDwYDVR0TAQH/BAUwAwEB/zAO\\nBgNVHQ8BAf8EBAMCAgQwDQYJKoZIhvcNAQELBQADggEBAJSYXHHHYHYoAZHtLe0c\\nqhkzRXtKRKdT0LagZ0LHDcXXKov9axlc7N58vSLNC49l6WnqST2xmw+2p75G9sak\\neUYRRECh05rue07BbG7fTMoeH39JdvHMzoTVNF76n9Z3YL3Mq26xhu8jczEjU/qK\\nkPf2xBR/nDXZDTIbA2xRsmyti4niDFZks5X0HmEpIlYzGCeMAZLb7r9IZe2DCd0p\\nnV8d2KWSd4Poh4QITuhamZfgkfaKxg3f8fpmO0+q1FTqlwDQ1boeQCjQ1n4lbkVn\\nIGUvwc6AlWMeG0WlwuNdPcqGmT2cwlDeFSu5ch/dDboiCtM5JP0AL/3FdkY0RNA3\\nvRg=\\n-----END CERTIFICATE-----\\n	1	19:41:49	15:30:31
2	ssl	privat_key	-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIEowIBAAKCAQEAvKiTaFy7cLD8hSXDnEQSuBrECZa/tgV9562ChbYlcOeiV2yF\\r\\nl5t4+oDchr1jzjrkWF0F/j3ckkQHWcxJvj28xoaY7lDsSo1ee8slSN5Fh/Lf1CJE\\r\\nFDNFZSgduxrkw69+GPLor5VIXkL7jM3Uq43O9QeNzF5MvtYBrgyNPUKBTdnxNNS/\\r\\ndo1MbVjpAB0SCqubF6Fw5qCyx2ioQkt6jOCf4eNETCHlesDgUchECmKfCFmXj+jr\\r\\no8Jc8fyGeeofMGEOQ2IkCT7MRL1nC7zSd1f6z+5tMM/3LbkJ3cr9ySU7bPdInTLv\\r\\naQVx2lo7FrKriAIqLO91MQok/ColDWFwX4CCCwIDAQABAoIBAAm4Q7P2Rx/0tmXj\\r\\nvrK/3RkII/58ek8V9Fkp2tYpvr8U6AvKBw37EB4T4oi8nDZFWXtl+4eQR1tvztMl\\r\\nD82R37Z4u8tXdv0WUH5fRoH9Fab97+M9irVhuNsP2IxJw+yDD6OYbD2TmuFkYRJt\\r\\njl3yVe3Q4FDdsOWKIBcIBYTY9tF8aOINxTFsHDVsQ1xvLTRNgY8JRdnHJG26fOS9\\r\\nbYZeAn77E4ECZwJMGVkgj8I9W3mzAEByu7ZpHZAb5GWv3Sp/9/cv2gKVNcGWU+cp\\r\\n5KOjkGi2VvoLHp6eLuaeTbqsDvM6rT2xLnOQn1KMOyFA0KukejhRpfr7TgQBYdKM\\r\\nid1LNh0CgYEA5jgCt+N+1x77Y7DkQ9dy6NfY61zzAXEX2ATzXSun3Q3HU6y9J2qf\\r\\nowkid1I6ZH9K9JXzK9oGlsPSZDfTYPwlKKNmAwZw5Wz1JevJOINKXiUxOiAen6+T\\r\\nLJnz4yH3uOloR9Koycn2daPo4i2c6QUYR7igOkKYcOom5Bl7wz4ahM8CgYEA0ckZ\\r\\nz4e8kI9rX7oCSB4DrAdjKU0ZrhY3vwyut4ibTA9kuf05wIzERnqBQ5RTAv6KCM3V\\r\\nveG0f2MWzLqyGwQKlHMm/TrRNkcdZh/t2qllEIi3O8FXfCIBghIgPgYn90CGluvK\\r\\nsfreZPFK5N87mU6zm/V5x4a9v8x1Ed/3sI4T9gUCgYAE3JnyGDPNhzH34PxxElOy\\r\\n5xwFnGjlVuYSAcjB5vIckPXspnE4K+BDKSY5Lttc0/NZRvFjs67/8BK5WxRzr995\\r\\nBDpbRf+MWMi0jE4ri1o+srpfZ949sQ+CmZ205jq9BPDW03QNDt7NjTCV1jDCGwFw\\r\\nQk3f7RgbClbX6lHaxaz5sQKBgQCij5LQnf4ghwJNS3Y5LAjsZU0R1AzyOYU5Jjq9\\r\\nPb4ZUlRbSz5VVr9BXeyM0YMB7vxHljjqyttzWvVv77vT822/Wvv7fnhf9vtxB4zo\\r\\nxBrslQRn6YpBRpikkicp6NtPXVDt4glPoXZ0AgZnFBS616GWWMHlOyQOXADbuRHW\\r\\nXkJZgQKBgBmes9uUeoGyxbfcorFi0KhJhXFOKxGSK3gbZ0Uqx9KfaXA83+SB4Krb\\r\\nlxyZ2oM1N05RmZeBIS5YY1ZVfada5aNdOK3Ap+pOxy2eMMGxO5LfryARVN8k5nW8\\r\\nPY5NO9TaVoXBXSBurw8sb+IsLEBG4LFvBleKO18wxq9hmerA43SD\\r\\n-----END RSA PRIVATE KEY-----\\r\\n	1	\N	15:30:31
3	passwd	pass_back	3	1	11:58:51	11:11:19
4	passwd	pass_enabled	0	1	11:58:51	11:11:19
5	ldap	url	ldap://metal.local	\N	\N	\N
6	ldap	username	Администратор@metal.local	\N	\N	\N
7	ldap	password	ПочемуМыЕщеЖивы?	\N	\N	\N
8	ldap	baseDN	dc=metal,dc=local	\N	\N	\N
\.


--
-- Data for Name: tbl_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_tasks (task_id, title, task_type, logs, _period, created_dt, chaged_dt, creator_id, _start, _end, status) FROM stdin;
12	Импорт 07-08	2			\N	\N	1			
13		2			\N	\N	1			
14	qwer	2			\N	\N	1			
15	Импорт 2	2			\N	\N	1			
16	1	2			\N	\N	1			
17	Импорт API	2			\N	\N	1			
18	Импорт Апи	2			\N	\N	1			
19	123123	2			\N	\N	1			
20	12312312	2			\N	\N	1			
21	1adfasdf	3			\N	\N	1			
22	123	2			\N	\N	1			
23	123123	2			\N	\N	1			
24	3123	2			\N	\N	1			
25	3123	2			\N	\N	1			
26	3123	2			\N	\N	1			
27	3123	2			\N	\N	1			
28	3123	2			\N	\N	1			
29	3123	2			\N	\N	1			
30	3123	2			\N	\N	1			
31	3123	2			\N	\N	1			
32	3123	2			\N	\N	1			
33	3123	2			\N	\N	1			
34	3123	2			\N	\N	1			
35	3123	2			\N	\N	1			
36	3123	2			\N	\N	1			
37	3123	2			\N	\N	1			
38	3123	2			\N	\N	1			
39	3123	2			\N	\N	1			
40	3123	2			\N	\N	1			
41	3123	2			\N	\N	1			
42	3123	2			\N	\N	1			
43	3123	2			\N	\N	1			
44	123123	-l			\N	\N	1			
45	Скан хостинга в первом отделе	-r			\N	\N	1			
46		2			\N	\N	1			
47	импорт контейнеров	2			\N	\N	1			
48	импорт контейнеров	2			\N	\N	1			
49	импорт контейнеров	2			\N	\N	1			
50	фвафыв	2			\N	\N	1			
\.


--
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
17	fedor	admin111	6820ef8cb721fba8774582dbaf96677d39d8b5c8517fb2924dbd9256a664ef0acffeb484b441fba97348257574769d72650d100505bdd114f555ba0347b6b612	1	9035595750	0	Tester111	\N	111111111111	+79001112233	svoboda9000@gmail.com	1	\N	\N	
19	123	admin1111	ee9e59636ca719f864939e9ba78a118c462a71afcd3862eca525265f16a6496b0997ed78511caaabefb7d4da3e8ca4b7298d766d5472f7d4f11f21831d460f1e	1	45058242.2	0	123	\N	123	123	123	1	\N	\N	
1	Администратор666	admin	d456b104fe116a54fea313d266c49d685b645cfe907a172d1899697ee83e1ffdd902b275c3dc59a0414b0350dcb0977d8e3b39d9e2367079a75735007f8f4f10	3	1	1	admin	36	00003	+79009009090	admin@dinatech.ru	1	2023-04-28 17:46:41	2023-05-04 15:45:51	
\.


--
-- Data for Name: tbl_users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_users_roles (role_id, title, permissions, locked, creator_id, changed_dt, created_dt) FROM stdin;
3	Дежурный	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-04 15:38:01	\N
4	Администратор ИБ	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-14 13:35:19	2023-03-14 10:34:01
12	fgadsfgdsf	{"dashboards_read":false,"dashboards_edit":false,"vulnerabilities_read":false,"vulnerabilities_edit":false,"bestpractice_read":false,"bestpractice_edit":false,"scheduledjobs_read":false,"scheduledjobs_edit":false,"settings_read":false,"settings_edit":false,"reports_read":false,"reports_edit":false}	\N	1	\N	\N
5	Fedor	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	\N	\N
2	Администратор АС	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-04 15:37:56	\N
1	Администратор СМИТР	{"dashboards_read":true,"dashboards_edit":true,"vulnerabilities_read":true,"vulnerabilities_edit":true,"bestpractice_read":true,"bestpractice_edit":true,"scheduledjobs_read":true,"scheduledjobs_edit":true,"settings_read":true,"settings_edit":true,"reports_read":true,"reports_edit":true}	\N	1	2023-05-04 15:37:49	2023-02-16 11:55:57
\.


--
-- Name: scan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scan_id_seq', 1, false);


--
-- Name: tabl_last_passwords_passwd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tabl_last_passwords_passwd_id_seq', 1, false);


--
-- Name: tbl_ad_users_roles_ad_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_ad_users_roles_ad_role_id_seq', 3, true);


--
-- Name: tbl_ad_users_roles_local_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_ad_users_roles_local_role_id_seq', 1, false);


--
-- Name: tbl_containers_containers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_containers_containers_id_seq', 40, true);


--
-- Name: tbl_images_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_images_images_id_seq', 672, true);


--
-- Name: tbl_settings_setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_settings_setting_id_seq', 1, false);


--
-- Name: tbl_tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_tasks_task_id_seq', 50, true);


--
-- Name: tbl_users_roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_users_roles_role_id_seq', 12, true);


--
-- Name: tbl_users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_users_user_id_seq', 19, true);


--
-- Name: scan scan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan
    ADD CONSTRAINT scan_pkey PRIMARY KEY (id);


--
-- Name: tabl_last_passwords tabl_last_passwords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabl_last_passwords
    ADD CONSTRAINT tabl_last_passwords_pkey PRIMARY KEY (passwd_id);


--
-- Name: tbl_ad_users_roles tbl_ad_users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_ad_users_roles
    ADD CONSTRAINT tbl_ad_users_roles_pkey PRIMARY KEY (ad_role_id);


--
-- Name: tbl_containers tbl_containers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_containers
    ADD CONSTRAINT tbl_containers_pkey PRIMARY KEY (containers_id);


--
-- Name: tbl_images tbl_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_images
    ADD CONSTRAINT tbl_images_pkey PRIMARY KEY (images_id);


--
-- Name: tbl_settings tbl_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_settings
    ADD CONSTRAINT tbl_settings_pkey PRIMARY KEY (setting_id);


--
-- Name: tbl_tasks tbl_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_tasks
    ADD CONSTRAINT tbl_tasks_pkey PRIMARY KEY (task_id);


--
-- Name: tbl_users tbl_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (user_id);


--
-- Name: tbl_users_roles tbl_users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users_roles
    ADD CONSTRAINT tbl_users_roles_pkey PRIMARY KEY (role_id);


--
-- Name: tbl_users_roles title; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users_roles
    ADD CONSTRAINT title UNIQUE (title);


--
-- Name: tbl_ad_users_roles unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_ad_users_roles
    ADD CONSTRAINT "unique" UNIQUE (ad_groupname, title);


--
-- Name: tbl_users username login; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT "username login" UNIQUE (username, login);


--
-- PostgreSQL database dump complete
--

