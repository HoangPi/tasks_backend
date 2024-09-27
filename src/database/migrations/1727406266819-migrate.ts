import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1727406266819 implements MigrationInterface {
    name = 'Migrate1727406266819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_82bf374c182b09d0bfcab6803f1"`);
        await queryRunner.query(`CREATE TABLE "sprint" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "endAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_story_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD "sprintId" integer`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_0b512ef3fa72b5afa40db28e4b7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_c1959e3c38e148e3f471807fa81" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_c1959e3c38e148e3f471807fa81"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_0b512ef3fa72b5afa40db28e4b7"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "sprintId"`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD "projectId" integer`);
        await queryRunner.query(`CREATE TYPE "public"."user_story_status_enum" AS ENUM('On going', 'Completed', 'Aborted')`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD "status" "public"."user_story_status_enum" NOT NULL DEFAULT 'On going'`);
        await queryRunner.query(`DROP TABLE "sprint"`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_82bf374c182b09d0bfcab6803f1" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
