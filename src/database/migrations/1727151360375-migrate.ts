import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1727151360375 implements MigrationInterface {
    name = 'Migrate1727151360375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "description" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
    }

}
