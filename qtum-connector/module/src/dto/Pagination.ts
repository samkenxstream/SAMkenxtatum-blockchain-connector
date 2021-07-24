import {
    IsBooleanString,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional, Matches,
    ValidateIf,
  } from 'class-validator';
  import { IsInRange } from '../validators/IsInRange'  
  export class Pagination{
    @IsNumber()
    @IsNotEmpty()
    @IsInRange(1, 50)
    public pageSize: number;
  
    @IsNumber()
    @IsOptional()
    public offset?: number;
  }
  