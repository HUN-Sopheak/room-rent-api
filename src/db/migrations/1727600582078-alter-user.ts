import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUser1727600582078 implements MigrationInterface {
    name = 'AlterUser1727600582078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
