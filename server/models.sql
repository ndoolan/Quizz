CREATE TABLE "recordings" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "question_id" integer,
  "created_at" timestamp,
  "object_key" varchar
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "firstName" varchar,
  "lastName" varchar,
  "lastAnswered" timestamp,
  "email" varchar
);

CREATE TABLE "questions" (
  "id" integer PRIMARY KEY,
  "body" varchar,
  "subject" varchar
);

ALTER TABLE "recordings" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "recordings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
