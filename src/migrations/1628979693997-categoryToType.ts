import { MigrationInterface, QueryRunner } from "typeorm";

export class categoryToType1628979693997 implements MigrationInterface {
  name = "categoryToType1628979693997";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `mentions` RENAME COLUMN `category` TO `type`",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`",
    );
  }
}
