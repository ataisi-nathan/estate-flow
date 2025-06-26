import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  logoUrl?: string;
}