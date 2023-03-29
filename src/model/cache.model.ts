export interface CacheModel {
  key: string;
  url: string;
}

export interface CacheWithTime extends CacheModel{
  time_mark: number
}
