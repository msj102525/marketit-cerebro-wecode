import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePlatformaccount1686902059363 implements MigrationInterface {
  name = 'UpdatePlatformaccount1686902059363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`platform_account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`platform_type\` varchar(50) NOT NULL, \`follower\` int NOT NULL, \`state\` varchar(30) NOT NULL,   \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updator_id\` int NULL, \`cerebroInfluencerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cerebro_influencer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NULL, \`cellphone_country_code\` varchar(50) NULL, \`cellphone_number\` varchar(50) NULL, \`phone_country_code\` varchar(50) NULL, \`phone_number\` varchar(50) NULL, \`gender\` varchar(30) NULL, \`birthday\` date NULL, \`citizenship\` varchar(50) NULL, \`country\` varchar(50) NULL, \`region\` varchar(50) NULL, \`city\` varchar(50) NULL, \`address\` varchar(100) NULL, \`detailed_address\` varchar(100) NULL, \`latitude\` double NULL, \`longitude\` double NULL, \`height\` decimal(10,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account\` ADD CONSTRAINT \`FK_983e0319830d90a4c342e8c6f88\` FOREIGN KEY (\`cerebroInfluencerId\`) REFERENCES \`cerebro_influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`platform_account\` DROP FOREIGN KEY \`FK_983e0319830d90a4c342e8c6f88\``,
    );
    await queryRunner.query(`DROP TABLE \`cerebro_influencer\``);
    await queryRunner.query(`DROP TABLE \`platform_account\``);
  }
}
