import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMemoTable1687155035764 implements MigrationInterface {
  name = 'CreateMemoTable1687155035764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`memo_state\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`memo_state\` varchar(255) NOT NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`memo\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`memo_content\` text NOT NULL, 
        \`influencer_platform_id\` int NOT NULL, 
        \`user_id\` int NOT NULL, 
        \`memo_state_id\` int NULL,  
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_type\` ADD \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`memo\` 
      ADD CONSTRAINT \`FK_004df20ed02f6d5b78b662d1c81\` FOREIGN KEY (\`memo_state_id\`) REFERENCES \`memo_state\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`memo\` DROP FOREIGN KEY \`FK_004df20ed02f6d5b78b662d1c81\``,
    );
    await queryRunner.query(`ALTER TABLE \`tag_type\` DROP COLUMN \`user_id\``);
    await queryRunner.query(`DROP TABLE \`memo_state\``);
    await queryRunner.query(`DROP TABLE \`memo\``);
  }
}
