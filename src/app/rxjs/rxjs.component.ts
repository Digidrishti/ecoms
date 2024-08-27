import { Component, OnInit } from '@angular/core';
import { filter, finalize, fromEvent, interval, map, mergeMap, of, reduce, share, Subject, Subscription, switchMap, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {
  subscription = new Subscription();

  clocks$ = Subscription;
  destroy$ = new Subject()
  constructor() { }

  ngOnInit(): void {
    this.loadRxjs()
  }

  loadRxjs() {
    // ######### perform many operations using different types of operators using pipe() method ######### //
    let test = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
    let mapOperator = test.pipe(filter(i => i % 2 === 0), reduce((acc, one) => acc + one, 0));
    mapOperator.subscribe(x => console.log(x));


    // ######### take && interval    it will the take 10 element after every one second ############

    let test1 = interval(1000);
    let takeoperator = test1.pipe(take(10));
    takeoperator.subscribe(x => console.log(x));

    //
  }

  test() {
    const obs$ = of(1, 2, 3, 4, 5, 6, 7, 8, 8);
    const strams$ = obs$.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    }
    )


    // const strams$ = obs$.subscribe(
    //    (data) => console.log(data),
    //    (error) => console.log(error),
    //    (complete) => console.log('complete')
    
    // )



  }


//   class user {
//   name = ''
// }
  
  
  // ######/

  // operator
  testw() {

    //unicast example we get data from event we need to subscribe it every time 
    const obs$ = interval(1000).pipe(take(20));
    obs$.subscribe((num) => console.log('first clock', num));
    setTimeout(() => {
      obs$.subscribe((num) => console.log('second clock',num))
    })

    // output will 0 1 2 3 0 4 5 6 1
  }


  share() {
    // multicase example we get data form event second event will start from previous value it will not form 0 
     const obs$ = interval(1000).pipe(take(20), share());
     obs$.subscribe((num) => console.log('first clock', num));
     setTimeout(() => {
       obs$.subscribe((num) => console.log('second clock',num))
     })
      // output will 0 1 2 3 3 4 5 6 6
      // unicaste means if we want watch youtube video // cold observable 
      // multicast we want watch video stream same frame at time // hot observable
  }




  memoryLeak() {
    let obs$ = interval(1000);
    let clock$: Subscription;
    let counter: number;

    clock$ = obs$
      .pipe(tap(console.log)).subscribe((num) => (counter = num));
    
    
    // if on click event if destory conponent but still subscription is get value so it will emit value 


    // to prevent memory leak

  //  use ng desstory
    
    // 2. other techquies is

    clock$ = obs$
      .pipe(tap(console.log)).subscribe((num) => (counter = num));
    
    this.subscription.add(clock$)


    // 3. 

    // this.clock$ = obs$
    // .pipe((tap(console.log)), takeUntil(this.destroys$)) .subscribe((num) => (counter = num));
  

  }

  ngOnDestroy() { 
    // this local variable 
    // clock.unsubscribe();

    // code is for take until 
    this.destroy$.next('');
    this.destroy$.complete();
  }


  mergeMap() {
    // this.http.get('')

  //   this.formControl.valueChanges.pipe(mergeMap((str) => {
  //    return this.http.get(`endpoint ${str}`)
  //   })).subscribe((res) => {
  //     console.log(res);
 
  //  })
  }


  // unsubscribe() {
  //   this.subscription = fromEvent(this.button.nativeElement, 'click').pipe(
  //     finalize(() => {
  //       // it will be excute after the code final code excuteed after the 6 sec 
  //       console.log('do clean up here');
  //     })
  //   ).subscribe({
  //     next: (e) => console.log('clicked', e), error: () => console.log('error'),
  //     complete: () => console.log('complete')
  //     // complete will not excute 
  //   });
  //   setTimeout(() => {
  //     this.subscription.unsubscribe();
  //   }, 6000)
  // }



  // switchmapConcatMapMergeMapExhaustMap() {
  //   let clock = 0;
  //   fromEvent(this.button.nativeElement, "click")
  //     .pipe(
  //       map(() => ++clock),
  //       mergeMap((clock) => {
  //         return interval(1000).pipe(
  //           map((time) => `clock  ${clock}: ${time}`)
  //         )
  //       }),
  //   )
  //   fromEvent(this.button.nativeElement, "click")
  //     .pipe(
  //       map(() => ++clock),
  //       switchMap((clock) => {
  //         return interval(1000).pipe(
  //           map((time) => `clock  ${clock}: ${time}`)
  //         )
  //       }),
  //   )
  // }







}
