import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1668180550489 implements MigrationInterface {
    name = 'firstMigration1668180550489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL, "type" integer NOT NULL, "date" TIMESTAMP NOT NULL, "product" character varying NOT NULL, "value" integer NOT NULL, "seller" character varying NOT NULL, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
