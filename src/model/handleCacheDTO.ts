import { IsString, IsUrl, Length } from "class-validator";

export class HandleCacheDTO {

  @Length(5, 15)
  @IsString()
  key: string

  // @IsUrl()
  url: string

}
