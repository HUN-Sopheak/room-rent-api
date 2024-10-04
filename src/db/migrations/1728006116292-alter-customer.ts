import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCustomer1728006116292 implements MigrationInterface {
    name = 'AlterCustomer1728006116292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "dob" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "dob"`);
    }

}
