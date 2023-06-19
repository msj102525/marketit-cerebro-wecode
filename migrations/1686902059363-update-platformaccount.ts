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
      `CREATE TABLE \`tag_state\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tag_state\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updator_id\` int NULL, \`tag_type\` varchar(255) NOT NULL, \`tag_state_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tag_name\` varchar(255) NOT NULL, \`tag_type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updator_id\` int NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`teamId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updator_id\` int NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account\` ADD CONSTRAINT \`FK_983e0319830d90a4c342e8c6f88\` FOREIGN KEY (\`cerebroInfluencerId\`) REFERENCES \`cerebro_influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_type\` ADD CONSTRAINT \`FK_99c84f8a78f5650f57c5f8c68a5\` FOREIGN KEY (\`tag_state_id\`) REFERENCES \`tag_state\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_b87ed0873d07a13fae6a45dfb8a\` FOREIGN KEY (\`tag_type_id\`) REFERENCES \`tag_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_1e89f1fd137dc7fea7242377e25\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_1e89f1fd137dc7fea7242377e25\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_b87ed0873d07a13fae6a45dfb8a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_type\` DROP FOREIGN KEY \`FK_99c84f8a78f5650f57c5f8c68a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`platform_account\` DROP FOREIGN KEY \`FK_983e0319830d90a4c342e8c6f88\``,
    );
    await queryRunner.query(`DROP TABLE \`team\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(`DROP TABLE \`tag_type\``);
    await queryRunner.query(`DROP TABLE \`tag_state\``);
    await queryRunner.query(`DROP TABLE \`platform_account_original\``);
    await queryRunner.query(`DROP TABLE \`cerebro_influencer\``);
    await queryRunner.query(`DROP TABLE \`platform_account\``);
  }
}
