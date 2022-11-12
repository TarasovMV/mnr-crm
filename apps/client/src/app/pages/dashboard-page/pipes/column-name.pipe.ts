import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Request } from '@mnr-crm/shared-models';
import { nameParamsMap } from '../constants';

@Pipe({
    name: 'columnName',
})
export class ColumnNamePipe implements PipeTransform {
    transform(value: keyof Request | 'empty'): string {
        return [...nameParamsMap].find((x) => x[1] === value)?.[0] ?? '-';
    }
}

@NgModule({
    declarations: [ColumnNamePipe],
    exports: [ColumnNamePipe],
})
export class ColumnNamePipeModule {}
