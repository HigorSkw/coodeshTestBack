import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserEntity1668224277597 implements MigrationInterface {
    name = 'updateUserEntity1668224277597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_adm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_adm" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_adm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_adm" character varying NOT NULL`);
    }

}
