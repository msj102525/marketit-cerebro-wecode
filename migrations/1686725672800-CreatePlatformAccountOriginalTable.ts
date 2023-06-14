import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlatformAccountOriginalTable1686725672800
  implements MigrationInterface
{
  name = 'CreatePlatformAccountOriginalTable1686725672800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`platform_account_original\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`platform_type\` varchar(50) NOT NULL, 
        \`username\` varchar(50) NOT NULL, 
        \`display_name\` varchar(50) NULL, 
        \`description\` text NULL, 
        \`follower\` int NULL, 
        \`following\` int NULL, 
        \`is_verified\` tinyint NULL, 
        \`website\` varchar(255) NULL, 
        \`name\` varchar(50) NULL, 
        \`cellphone_country_code\` varchar(50) NULL, 
        \`cellphone_number\` varchar(50) NULL, 
        \`phone_country_code\` varchar(50) NULL, 
        \`phone_number\` varchar(50) NULL, 
        \`gender\` varchar(30) NULL, 
        \`birthday\` date NULL, 
        \`category\` text NULL, 
        \`label\` text NULL, 
        \`country\` varchar(50) NULL, 
        \`region\` varchar(50) NULL, 
        \`city\` varchar(50) NULL, 
        \`address\` varchar(100) NULL, 
        \`detailed_address\` varchar(100) NULL, 
        \`zip\` varchar(50) NULL, 
        \`latitude\` double NULL, 
        \`longitude\` double NULL, 
        \`inflca_user_id\` int NULL, 
        \`inflma_user_id\` int NULL, 
        \`hypeauditor_user_id\` int NULL, 
        \`influencer_platform_id\` int NULL, 
        \`height\` decimal(10,2) NULL, 
        \`citizenship\` varchar(50) NULL, 
        \`platform_uid\` varchar(50) NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`platform_account_original\``);
  }
}
