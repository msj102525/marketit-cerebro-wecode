import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagsTable1686892791572 implements MigrationInterface {
  name = 'CreateTagsTable1686892791572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tag_state\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`tag_state\` varchar(255) NOT NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag_type\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`tag_type\` varchar(255) NOT NULL, 
        \`tag_state_id\` int NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`tag_name\` varchar(255) NOT NULL, 
        \`tag_type_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_type\`
       ADD CONSTRAINT \`FK_99c84f8a78f5650f57c5f8c68a5\` FOREIGN KEY (\`tag_state_id\`) REFERENCES \`tag_state\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` 
      ADD CONSTRAINT \`FK_b87ed0873d07a13fae6a45dfb8a\` FOREIGN KEY (\`tag_type_id\`) REFERENCES \`tag_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_b87ed0873d07a13fae6a45dfb8a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_type\` DROP FOREIGN KEY \`FK_99c84f8a78f5650f57c5f8c68a5\``,
    );
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(`DROP TABLE \`tag_type\``);
    await queryRunner.query(`DROP TABLE \`tag_state\``);
  }
}
