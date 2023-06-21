import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCerebroDB1687325361916 implements MigrationInterface {
  name = 'CreateCerebroDB1687325361916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`platform_account\` 
      DROP FOREIGN KEY \`FK_983e0319830d90a4c342e8c6f88\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account\` 
      CHANGE \`cerebroInfluencerId\` \`cerebro_influencer_id\` int NULL`,
    );

    await queryRunner.query(
      `CREATE TABLE \`influencer_category\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`category\` varchar(255) NOT NULL, 
        \`category_type\` varchar(255) NOT NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`platform_account_influencer_category\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`category\` varchar(255) NOT NULL, 
        \`category_type\` varchar(255) NOT NULL, 
        \`influencer_platform_id\` int NULL, 
        \`influencer_category_id\` int NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`platform_account_change_log\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`username\` varchar(50) NOT NULL, 
        \`size\` int NOT NULL, 
        \`state\` varchar(30) NOT NULL, 
        \`phone\` varchar(50) NOT NULL, 
        \`email\` varchar(100) NOT NULL, 
        \`country\` varchar(50) NOT NULL, 
        \`address\` varchar(100) NOT NULL, 
        \`influencer_platform_id\` int NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`platform_account_tag\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`influencer_platform_id\` int NULL, 
        \`tag_id\` int NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`creator_id\` int NULL, 
        \`updator_id\` int NULL, 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`platform_account_original_category\` (
        \`category\` varchar(100) NOT NULL, 
        \`pao_category_id\` int NOT NULL AUTO_INCREMENT, 
        PRIMARY KEY (\`pao_category_id\`)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`inflca_user\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(100) NOT NULL, 
        \`influencer_platform_id\` int NULL, 
        UNIQUE INDEX \`REL_ffbd5f8af7d0a0cd89d57c9c0c\` (\`influencer_platform_id\`), 
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`memo\` 
      CHANGE \`influencer_platform_id\` \`influencer_platform_id\` int NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_influencer_category\` 
      ADD CONSTRAINT \`FK_4ddb20f1070888c121dd3606d0f\` FOREIGN KEY (\`influencer_platform_id\`) REFERENCES \`platform_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_influencer_category\` 
      ADD CONSTRAINT \`FK_85bd0b4008ad0956bc69a1e4c88\` FOREIGN KEY (\`influencer_category_id\`) REFERENCES \`influencer_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_change_log\` 
      ADD CONSTRAINT \`FK_b1ea8d09a515e00531da3a1111a\` FOREIGN KEY (\`influencer_platform_id\`) REFERENCES \`platform_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_tag\` 
      ADD CONSTRAINT \`FK_b4f3e993621bd6d860e02e842fa\` FOREIGN KEY (\`influencer_platform_id\`) REFERENCES \`platform_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_tag\` 
      ADD CONSTRAINT \`FK_9f2872e46417c727a55f087d1d9\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`memo\` 
      ADD CONSTRAINT \`FK_afdd6eeab6e48a7dd665dd334d9\` FOREIGN KEY (\`influencer_platform_id\`) REFERENCES \`platform_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account\` 
      ADD CONSTRAINT \`FK_50e6bb0c5f85b49aea2b94df543\` FOREIGN KEY (\`cerebro_influencer_id\`) REFERENCES \`cerebro_influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`inflca_user\` 
      ADD CONSTRAINT \`FK_ffbd5f8af7d0a0cd89d57c9c0c2\` FOREIGN KEY (\`influencer_platform_id\`) REFERENCES \`platform_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inflca_user\` DROP FOREIGN KEY \`FK_ffbd5f8af7d0a0cd89d57c9c0c2\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account\` DROP FOREIGN KEY \`FK_50e6bb0c5f85b49aea2b94df543\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`memo\` DROP FOREIGN KEY \`FK_afdd6eeab6e48a7dd665dd334d9\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_tag\` DROP FOREIGN KEY \`FK_9f2872e46417c727a55f087d1d9\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_tag\` DROP FOREIGN KEY \`FK_b4f3e993621bd6d860e02e842fa\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_change_log\` DROP FOREIGN KEY \`FK_b1ea8d09a515e00531da3a1111a\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_influencer_category\` DROP FOREIGN KEY \`FK_85bd0b4008ad0956bc69a1e4c88\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account_influencer_category\` DROP FOREIGN KEY \`FK_4ddb20f1070888c121dd3606d0f\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`memo\` CHANGE \`influencer_platform_id\` \`influencer_platform_id\` int NOT NULL`,
    );

    await queryRunner.query(
      `DROP INDEX \`REL_ffbd5f8af7d0a0cd89d57c9c0c\` ON \`inflca_user\``,
    );

    await queryRunner.query(`DROP TABLE \`inflca_user\``);

    await queryRunner.query(
      `DROP TABLE \`platform_account_original_category\``,
    );

    await queryRunner.query(`DROP TABLE \`platform_account_tag\``);

    await queryRunner.query(`DROP TABLE \`platform_account_change_log\``);

    await queryRunner.query(
      `DROP TABLE \`platform_account_influencer_category\``,
    );

    await queryRunner.query(`DROP TABLE \`influencer_category\``);

    await queryRunner.query(
      `ALTER TABLE \`platform_account\` CHANGE \`cerebro_influencer_id\` \`cerebroInfluencerId\` int NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`platform_account\` ADD CONSTRAINT \`FK_983e0319830d90a4c342e8c6f88\` FOREIGN KEY (\`cerebroInfluencerId\`) REFERENCES \`cerebro_influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
