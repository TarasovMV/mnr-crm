import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {IncomeType} from '@mnr-crm/shared-models';
import {incomeTypeMapper} from '../utils';

@Pipe({
    name: 'incomeTypeStringify'
})
export class IncomeTypeStringifyPipe implements PipeTransform {
    transform(value: IncomeType): string {
        return incomeTypeMapper[value];
    }
}

@NgModule({
    declarations: [IncomeTypeStringifyPipe],
    exports: [IncomeTypeStringifyPipe],
})
export class IncomeTypeStringifyPipeModule {}
