import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyPlatformAccountOriginalTableDisplayname1686745316835
  implements MigrationInterface
{
  name = 'ModifyPlatformAccountOriginalTableDisplayname1686745316835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` DROP COLUMN \`display_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` ADD \`display_name\` varchar(255) NULL AFTER \`platform_type\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` DROP COLUMN \`display_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account_original\` ADD \`display_name\` varchar(50) NULL AFTER \`platform_type\``,
    );
  }
}
