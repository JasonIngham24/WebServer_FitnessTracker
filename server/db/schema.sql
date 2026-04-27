-- PostgreSQL schema

CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE activities (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity    VARCHAR(255)   NOT NULL,
    duration    INTEGER        NOT NULL, -- Duration in minutes
    distance    FLOAT, -- Distance in miles
    calories    INTEGER,
    date        DATE           NOT NULL,
    images      TEXT[]         DEFAULT '{}',
    created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role        user_role       NOT NULL DEFAULT 'user',
    firstName   VARCHAR(255)    NOT NULL,
    lastName    VARCHAR(255)    NOT NULL,
    userName    VARCHAR(255)    NOT NULL UNIQUE,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    image       TEXT            DEFAULT 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE TABLE friends (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friend_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, friend_id)
)
