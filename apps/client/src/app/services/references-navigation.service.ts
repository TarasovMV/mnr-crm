import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class ReferencesNavigationService {
    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
    ) {}

    createRedirect(): void {
        this.router.navigate(['new'], {relativeTo: this.route}).then();
    }

    backToMain(): void {
        this.router.navigate(['../'], {relativeTo: this.route}).then();
    }
}
