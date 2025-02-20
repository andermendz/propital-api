import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('properties')
export class Property {
  @ApiProperty({ description: 'The unique identifier of the property' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the property' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Description of the property' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Type of the property (e.g., house, apartment, commercial)' })
  @Column()
  type: string;

  @ApiProperty({ description: 'Price of the property' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Total area of the property in square meters' })
  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @ApiProperty({ description: 'Latitude coordinate of the property' })
  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @ApiProperty({ description: 'Longitude coordinate of the property' })
  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @ApiProperty({ description: 'Address of the property' })
  @Column()
  address: string;

  @ApiProperty({ description: 'Main image URL of the property' })
  @Column()
  mainImageUrl: string;

  @ApiProperty({ description: 'Additional images URLs of the property' })
  @Column('simple-array')
  imageUrls: string[];

  @ApiProperty({ description: 'Number of bedrooms' })
  @Column({ nullable: true })
  bedrooms: number;

  @ApiProperty({ description: 'Number of bathrooms' })
  @Column({ nullable: true })
  bathrooms: number;

  @ApiProperty({ description: 'Number of parking spaces' })
  @Column({ nullable: true })
  parkingSpaces: number;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}