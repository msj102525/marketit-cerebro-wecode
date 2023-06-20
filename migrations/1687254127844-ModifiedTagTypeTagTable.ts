import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifiedTagTypeTagTable1687254127844
  implements MigrationInterface
{
  name = 'ModifiedTagTypeTagTable1687254127844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_b87ed0873d07a13fae6a45dfb8a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_b87ed0873d07a13fae6a45dfb8a\` FOREIGN KEY (\`tag_type_id\`) REFERENCES \`tag_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_b87ed0873d07a13fae6a45dfb8a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_b87ed0873d07a13fae6a45dfb8a\` FOREIGN KEY (\`tag_type_id\`) REFERENCES \`tag_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
