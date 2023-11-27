import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiCalendarRangeModule } from '@taiga-ui/kit';
import { TuiDayRange } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDialogContext } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'mnr-crm-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TuiCalendarRangeModule, TuiButtonModule],
})
export class DateRangeComponent {
    range: TuiDayRange | null = null;

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<
            TuiDayRange | null | undefined,
            unknown
        >
    ) {}

    get buttonName(): string {
        return !this.range ? 'Выгрузить за все время' : 'Выгрузить за период';
    }

    submit(): void {
        this.context.completeWith(this.range);
    }

    cancel(): void {
        this.context.completeWith(undefined);
    }
}
