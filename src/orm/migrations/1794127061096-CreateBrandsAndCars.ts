import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBrandsAndCars1794127061096 implements MigrationInterface {
  name = 'CreateBrandsAndCars1794127061096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."cars_status_enum" AS ENUM('available', 'reserved', 'sold')
        `);

    // Сначала создаем родительскую таблицу "brands"
    await queryRunner.query(`
            CREATE TABLE "brands" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "country" character varying(50) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"),
                CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")
            )
        `);

    // Затем дочернюю таблицу "cars"
    await queryRunner.query(`
            CREATE TABLE "cars" (
                "id" SERIAL NOT NULL,
                "model" character varying(50) NOT NULL,
                "year" integer NOT NULL,
                "price" numeric(12, 2) NOT NULL,
                "vin" character varying(17) NOT NULL,
                "status" "public"."cars_status_enum" NOT NULL DEFAULT 'available',
                "brand_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "brandId" integer,
                CONSTRAINT "UQ_1a56deecb54b4ed4917445f49e9" UNIQUE ("vin"),
                CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id")
            )
        `);

    // Добавляем внешний ключ связи "cars" с "brands"
    await queryRunner.query(`
            ALTER TABLE "cars"
            ADD CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "cars" DROP CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f"
        `);
    await queryRunner.query(`
            DROP TABLE "cars"
        `);
    await queryRunner.query(`
            DROP TABLE "brands"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."cars_status_enum"
        `);
  }
}
