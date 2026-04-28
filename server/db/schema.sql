-- PostgreSQL schema

CREATE TYPE user_role AS ENUM ('admin', 'user');

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
    firstName   VARCHAR(255)    NOT NULL UNIQUE,
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
);

CREATE OR REPLACE FUNCTION get_friends_activities(p_user_id INTEGER)
-- Get all activities for a user's friends
RETURNS TABLE(j json) AS $$
BEGIN
    RETURN QUERY 
    SELECT json_build_object(
        'id', u.id,
        'firstName', u."firstName",
        'lastName', u."lastName",
        'username', u.username,
        'activities', (
            SELECT json_agg(
                json_build_object(
                    'id', a.id,
                    'activity', a.activity,
                    'duration', a.duration,
                    'distance', a.distance,
                    'date', a.date,
                    'imageUrl', a.images[1]
                )
            )
            FROM activities a
            WHERE a.user_id = f.friend_id
        )
    )
    FROM friends f
    JOIN users u ON f.friend_id = u.id
    WHERE f.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;
