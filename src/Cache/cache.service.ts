import { Injectable } from "@nestjs/common";
import { CacheStore } from "./cache.store";
import { BehaviorSubject, filter, firstValueFrom, map, Observable, switchMap, take, takeUntil, tap, timer } from "rxjs";
import { CacheModel, CacheWithTime } from "../model/cache.model";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class CacheService {
  private static cacheDebounceTimeMs = 2000;
  private cacheGuard$: BehaviorSubject<Map<string, CacheWithTime>> = new BehaviorSubject<Map<string, CacheWithTime>>(new Map());

  constructor(private cacheStore: CacheStore, private readonly httpService: HttpService) {
  }

  loadCache(key: string): Promise<any> {
    return this.cacheStore.getCache(key).then(result => JSON.parse(result));
  }

  handleCache(param: { key: string, url: string }) {
    this.insertIntoCacheGuard(param);
    this.createCacheTimer(param);
  }


  private getCache$(key: string): Observable<CacheWithTime> {
    return this.cacheGuard$.asObservable().pipe(
      filter(cacheMap => cacheMap.has(key)),
      map(cacheMap => cacheMap.get(key)
      ));
  }

  private createCacheTimer(cacheModel: CacheModel): void {
    const { url, key } = cacheModel;
    const created = Date.now();
    const abortController = new AbortController();

    timer(CacheService.cacheDebounceTimeMs).pipe(
      tap(() => this.cacheStore.clearCache(key)),
      switchMap(() => this.retrieveData(url, abortController)),
      take(1),
      takeUntil(this.isNewRequestForCache({ cacheKey: key, time: created })
        .pipe(tap(() => abortController.abort())))
    ).subscribe((result) => {
      if (this.isJson(result.data)) {
        this.cacheStore.saveCache({key, value: JSON.stringify(result.data)})
      }
    });
  }

  private retrieveData(url: string, abortController: AbortController): Promise<any> {
    return firstValueFrom(this.httpService.get(url, { signal: abortController.signal }));
  }

  private isNewRequestForCache(param: {
    cacheKey: string,
    time: number
  }): Observable<boolean> {
    const { cacheKey, time } = param;
    return this.getCache$(cacheKey).pipe(filter(cache => cache.time_mark > time), map(() => true));
  }

  private insertIntoCacheGuard(param: { key: string; url: string }) {
    const { key, url } = param;
    const map = this.cacheGuard$.getValue();
    map.set(key, { key: key, url, time_mark: Date.now() });
    this.cacheGuard$.next(map);
  }


  private isJson(data: any): boolean {
    return (typeof data === "object");
  }

  showAllCacheIds(): any {
    return this.cacheStore.getCacheIds();
  }
}
