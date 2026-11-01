ALTER TABLE users
    ADD COLUMN role          VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    ADD COLUMN year_of_study SMALLINT CHECK (year_of_study BETWEEN 1 AND 4);

CREATE TABLE topics (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(80) NOT NULL UNIQUE,
    category VARCHAR(10) NOT NULL
             CHECK (category IN ('CODING','LOGICAL','QUANT','VERBAL'))
);

CREATE TABLE questions (
    id             BIGSERIAL PRIMARY KEY,
    type           VARCHAR(10) NOT NULL CHECK (type IN ('CODING','APTITUDE')),
    topic_id       INT NOT NULL REFERENCES topics(id),
    band           SMALLINT NOT NULL CHECK (band BETWEEN 1 AND 3),
    title          VARCHAR(200) NOT NULL,
    statement      TEXT NOT NULL,
    options        JSONB,              -- aptitude: ["A text","B text",...]
    correct_option SMALLINT,           -- aptitude: index into options
    time_limit_sec INT NOT NULL DEFAULT 600,
    active         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_questions_pick ON questions (type, band, topic_id) WHERE active;

CREATE TABLE test_cases (
    id              BIGSERIAL PRIMARY KEY,
    question_id     BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    stdin           TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample       BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE sessions (
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT NOT NULL REFERENCES users(id),
    type         VARCHAR(10) NOT NULL CHECK (type IN ('CODING','APTITUDE')),
    status       VARCHAR(12) NOT NULL DEFAULT 'IN_PROGRESS'
                 CHECK (status IN ('IN_PROGRESS','COMPLETED','EXPIRED')),
    phase        VARCHAR(5) NOT NULL DEFAULT 'BURST' CHECK (phase IN ('BURST','LIVE')),
    seed_source  VARCHAR(8) NOT NULL DEFAULT 'BURST'
                 CHECK (seed_source IN ('BURST','PROFILE')),
    seed_value   DOUBLE PRECISION,
    level        DOUBLE PRECISION NOT NULL DEFAULT 2.0,
    live_answers INT NOT NULL DEFAULT 0,
    started_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    deadline_at  TIMESTAMPTZ NOT NULL,
    ended_at     TIMESTAMPTZ
);

CREATE TABLE session_questions (
    id           BIGSERIAL PRIMARY KEY,
    session_id   BIGINT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    question_id  BIGINT NOT NULL REFERENCES questions(id),
    seq          INT NOT NULL,
    phase        VARCHAR(5) NOT NULL,
    level_before DOUBLE PRECISION NOT NULL,
    served_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    answered_at  TIMESTAMPTZ,
    UNIQUE (session_id, seq),
    UNIQUE (session_id, question_id)
);

CREATE TABLE submissions (
    id                  BIGSERIAL PRIMARY KEY,
    session_question_id BIGINT NOT NULL UNIQUE
                        REFERENCES session_questions(id) ON DELETE CASCADE,
    language            VARCHAR(20),
    source_code         TEXT,
    selected_option     SMALLINT,
    passed_tests        INT,
    total_tests         INT,
    is_correct          BOOLEAN NOT NULL,
    signal              DOUBLE PRECISION NOT NULL CHECK (signal BETWEEN -1 AND 1),
    judge_status        VARCHAR(40),
    time_taken_ms       INT NOT NULL,
    run_count           INT NOT NULL DEFAULT 0,
    compile_errors      INT NOT NULL DEFAULT 0,
    tle_count           INT NOT NULL DEFAULT 0,
    first_run_ms        INT,
    efficiency          DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE code_runs (
    id                  BIGSERIAL PRIMARY KEY,
    session_question_id BIGINT NOT NULL
                        REFERENCES session_questions(id) ON DELETE CASCADE,
    language            VARCHAR(20) NOT NULL,
    passed_samples      INT NOT NULL,
    total_samples       INT NOT NULL,
    judge_status_id     INT NOT NULL,          -- 3 Accepted, 5 TLE, 6 compile error
    judge_status        VARCHAR(40) NOT NULL,
    ms_since_served     INT NOT NULL,
    ran_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_runs_sq ON code_runs (session_question_id);

CREATE TABLE ability_estimates (
    user_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id       INT NOT NULL REFERENCES topics(id),
    live_ability   DOUBLE PRECISION NOT NULL,
    external_prior DOUBLE PRECISION,
    sessions_count INT NOT NULL DEFAULT 0,
    attempts       INT NOT NULL DEFAULT 0,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, topic_id)
);

CREATE TABLE external_accounts (
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider     VARCHAR(12) NOT NULL
                 CHECK (provider IN ('GITHUB','LEETCODE','CODEFORCES','SELF')),
    handle       VARCHAR(100),
    connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, provider)
);

CREATE TABLE profile_snapshots (
    id                  BIGSERIAL PRIMARY KEY,
    external_account_id BIGINT NOT NULL REFERENCES external_accounts(id) ON DELETE CASCADE,
    fetched_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    status              VARCHAR(10) NOT NULL CHECK (status IN ('OK','FAILED','STALE')),
    payload             JSONB
);

CREATE TABLE feedback_reports (
    id            BIGSERIAL PRIMARY KEY,
    session_id    BIGINT NOT NULL UNIQUE REFERENCES sessions(id) ON DELETE CASCADE,
    weak_topics   JSONB NOT NULL,
    strong_topics JSONB NOT NULL,
    behaviours    JSONB NOT NULL DEFAULT '[]',
    next_steps    TEXT NOT NULL,
    generated_by  VARCHAR(8) NOT NULL CHECK (generated_by IN ('GEMINI','TEMPLATE')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE score_events (
    id          BIGSERIAL PRIMARY KEY,
    session_id  BIGINT REFERENCES sessions(id) ON DELETE CASCADE,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id    INT REFERENCES topics(id),
    source_type VARCHAR(8) NOT NULL CHECK (source_type IN ('ANSWER','PROFILE','BLEND')),
    source_id   BIGINT,
    value       DOUBLE PRECISION NOT NULL,
    note        TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE anticheat_events (
    id                  BIGSERIAL PRIMARY KEY,
    session_id          BIGINT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    session_question_id BIGINT REFERENCES session_questions(id) ON DELETE SET NULL,
    type                VARCHAR(30) NOT NULL,
    severity            VARCHAR(6) NOT NULL CHECK (severity IN ('INFO','REVIEW','HIGH')),
    detail              JSONB,
    occurred_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ac_session ON anticheat_events (session_id);
