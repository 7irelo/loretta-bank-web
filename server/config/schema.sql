-- Table: public.users

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    date_of_birth date NOT NULL,
    occupation character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.accounts

CREATE TABLE IF NOT EXISTS public.accounts
(
    id integer NOT NULL DEFAULT nextval('accounts_id_seq'::regclass),
    account_number character varying(13) COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    account_type character varying COLLATE pg_catalog."default" NOT NULL,
    available_balance double precision NOT NULL DEFAULT 0.0,
    latest_balance double precision NOT NULL DEFAULT 0.0,
    account_status character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'Active'::character varying,
    image_url character varying(50) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT accounts_account_status_check CHECK (account_status::text = ANY (ARRAY['Active', 'Inactive', 'Closed']::text[])),
    CONSTRAINT accounts_account_type_check CHECK (account_type::text = ANY (ARRAY['Savings', 'Cheque', 'Credit']::text[]))
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.accounts
    OWNER to postgres;

-- Table: public.cards

CREATE TABLE IF NOT EXISTS public.cards
(
    id integer NOT NULL DEFAULT nextval('cards_id_seq'::regclass),
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    account_id integer NOT NULL,
    card_number character varying(16) COLLATE pg_catalog."default" NOT NULL,
    expiry_date date NOT NULL,
    cvv character varying(3) COLLATE pg_catalog."default" NOT NULL,
    credit_limit double precision NOT NULL,
    balance double precision NOT NULL DEFAULT 0.0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT cards_pkey PRIMARY KEY (id),
    CONSTRAINT cards_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.accounts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT cards_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cards
    OWNER to postgres;

-- Table: public.customer_support

CREATE TABLE IF NOT EXISTS public.customer_support
(
    id integer NOT NULL DEFAULT nextval('customer_support_id_seq'::regclass),
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    query text COLLATE pg_catalog."default" NOT NULL,
    response text COLLATE pg_catalog."default",
    status character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT customer_support_pkey PRIMARY KEY (id),
    CONSTRAINT customer_support_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT customer_support_status_check CHECK (status::text = ANY (ARRAY['Open', 'Pending', 'Resolved', 'Closed']::text[]))
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer_support
    OWNER to postgres;

-- Table: public.loans

CREATE TABLE IF NOT EXISTS public.loans
(
    id integer NOT NULL DEFAULT nextval('loans_id_seq'::regclass),
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    account_id integer NOT NULL,
    loan_type character varying COLLATE pg_catalog."default" NOT NULL,
    amount double precision NOT NULL,
    interest_rate double precision NOT NULL,
    term integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT loans_pkey PRIMARY KEY (id),
    CONSTRAINT loans_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT loans_loan_type_check CHECK (loan_type::text = ANY (ARRAY['Personal', 'Mortgage', 'Auto', 'Student']::text[]))
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.loans
    OWNER to postgres;

-- Table: public.transactions

CREATE TABLE IF NOT EXISTS public.transactions
(
    id integer NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    account_id integer,
    transaction_type character varying COLLATE pg_catalog."default" NOT NULL,
    amount double precision NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description character varying COLLATE pg_catalog."default",
    journal_type character varying COLLATE pg_catalog."default",
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.accounts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;
