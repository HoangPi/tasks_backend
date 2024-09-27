import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1727405095063 implements MigrationInterface {
    name = 'Migrate1727405095063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_story_status_enum" AS ENUM('On going', 'Completed', 'Aborted')`);
        await queryRunner.query(`CREATE TABLE "user_story" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" "public"."user_story_status_enum" NOT NULL DEFAULT 'On going', "ownerId" integer, "assignedToId" integer, "projectId" integer, CONSTRAINT "PK_cd6f5a48fae7109fbc55f19720e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_433da8099b8b63ff7e94e8dbad5" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_1b7de9a46fdca12bcb91c3556e6" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_82bf374c182b09d0bfcab6803f1" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_82bf374c182b09d0bfcab6803f1"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_1b7de9a46fdca12bcb91c3556e6"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_433da8099b8b63ff7e94e8dbad5"`);
        await queryRunner.query(`DROP TABLE "user_story"`);
        await queryRunner.query(`DROP TYPE "public"."user_story_status_enum"`);
    }

}
