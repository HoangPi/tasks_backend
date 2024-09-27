import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1727160921087 implements MigrationInterface {
    name = 'Migrate1727160921087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."project_status_enum" AS ENUM('On going', 'Completed', 'Aborted')`);
        await queryRunner.query(`ALTER TABLE "project" ADD "status" "public"."project_status_enum" NOT NULL DEFAULT 'On going'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
    }

}
