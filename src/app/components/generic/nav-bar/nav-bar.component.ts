import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { selectRouterUrl } from '@app/store/selectors/router.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  public ubication = '- Home';

  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store
      .select(selectRouterUrl)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((navigation) => {
        switch (navigation) {
          case '/equipment':
            this.ubication = '- Equipment';
            break;
          case '/ship':
            this.ubication = '- Ship';
            break;
          default:
            this.ubication = '- Home';
            break;
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
