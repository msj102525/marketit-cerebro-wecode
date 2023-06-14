import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyPlatformAccountOriginalTable1686742762336
  implements MigrationInterface
{
  name = 'ModifyPlatformAccountOriginalTable1686742762336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` DROP COLUMN \`zip\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` ADD \`engagement_rate\` decimal(10,3) NULL AFTER \`following\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` ADD \`zip_code\` varchar(50) NULL AFTER \`detailed_address\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` DROP COLUMN \`zip_code\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` DROP COLUMN \`engagement_rate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` ADD \`zip\` varchar(50) NULL AFTER \`detailed_address\``,
    );
  }
}
