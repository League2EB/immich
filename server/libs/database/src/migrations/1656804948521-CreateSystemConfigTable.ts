import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSystemConfigTable1656804948521 implements MigrationInterface {
    name = 'CreateSystemConfigTable1656804948521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset_album" DROP CONSTRAINT "FK_64f2e7d68d1d1d8417acc844a4a"`);
        await queryRunner.query(`ALTER TABLE "asset_album" DROP CONSTRAINT "FK_a8b79a84996cef6ba6a3662825d"`);
        await queryRunner.query(`DROP INDEX "public"."exif_text_searchable_idx"`);
        await queryRunner.query(`ALTER TABLE "asset_album" DROP CONSTRAINT "UQ_a1e2734a1ce361e7a26f6b28288"`);
        await queryRunner.query(`CREATE TABLE "system_config" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "key" character varying NOT NULL, "value" character varying, CONSTRAINT "UQ_5008b06564c4068adb86c7bfcf8" UNIQUE ("key", "category"), CONSTRAINT "PK_db4e70ac0d27e588176e9bb44a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exif" DROP COLUMN "exif_text_searchable_column"`);
        await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "webpPath" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "encodedVideoPath" DROP DEFAULT`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "asset_album_id_seq" OWNED BY "asset_album"."id"`);
        await queryRunner.query(`ALTER TABLE "asset_album" ALTER COLUMN "id" SET DEFAULT nextval('"asset_album_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profileImagePath" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profileImagePath" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "shouldChangePassword" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "shouldChangePassword" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "asset_album" ADD CONSTRAINT "PK_unique_asset_in_album" UNIQUE ("albumId", "assetId")`);
        await queryRunner.query(`ALTER TABLE "asset_album" ADD CONSTRAINT "FK_256a30a03a4a0aff0394051397d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_album" ADD CONSTRAINT "FK_7ae4e03729895bf87e056d7b598" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset_album" DROP CONSTRAINT "FK_7ae4e03729895bf87e056d7b598"`);
        await queryRunner.query(`ALTER TABLE "asset_album" DROP CONSTRAINT "FK_256a30a03a4a0aff0394051397d"`);
        await queryRunner.query(`ALTER TABLE "asset_album" DROP CONSTRAINT "PK_unique_asset_in_album"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "shouldChangePassword" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "shouldChangePassword" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profileImagePath" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profileImagePath" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset_album" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "asset_album_id_seq"`);
        await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "encodedVideoPath" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "webpPath" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "exif" ADD "exif_text_searchable_column" tsvector`);
        await queryRunner.query(`DROP TABLE "system_config"`);
        await queryRunner.query(`ALTER TABLE "asset_album" ADD CONSTRAINT "UQ_a1e2734a1ce361e7a26f6b28288" UNIQUE ("albumId", "assetId")`);
        await queryRunner.query(`CREATE INDEX "exif_text_searchable_idx" ON "exif" ("exif_text_searchable_column") `);
        await queryRunner.query(`ALTER TABLE "asset_album" ADD CONSTRAINT "FK_a8b79a84996cef6ba6a3662825d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_album" ADD CONSTRAINT "FK_64f2e7d68d1d1d8417acc844a4a" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
