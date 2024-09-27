import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1727406801087 implements MigrationInterface {
    name = 'Migrate1727406801087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sprint_status_enum" AS ENUM('Ready', 'On going', 'Completed', 'Aborted')`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "status" "public"."sprint_status_enum" NOT NULL DEFAULT 'Ready'`);
        await queryRunner.query(`CREATE TYPE "public"."user_story_status_enum" AS ENUM('Ready', 'On going', 'Completed', 'Aborted')`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD "status" "public"."user_story_status_enum" NOT NULL DEFAULT 'Ready'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_story_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."sprint_status_enum"`);
    }

}
