import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('system_config')
@Unique(['key', 'category'])
export class SystemConfigEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

  @Column()
  key!: ConfigKey;

  @Column({ type: 'varchar', nullable: true })
  value!: string | null;
}

enum ConfigKey {
  ffmpeg_crc = 'ffmpeg_crc',
}
