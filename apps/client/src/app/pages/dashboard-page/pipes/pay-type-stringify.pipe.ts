import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {PayType} from '@mnr-crm/shared-models';
import {payTypeMapper} from '../utils';

@Pipe({
    name: 'payTypeStringify'
})
export class PayTypeStringifyPipe implements PipeTransform {
    transform(value: PayType): string {
        return payTypeMapper[value];
    }
}

@NgModule({
    declarations: [PayTypeStringifyPipe],
    exports: [PayTypeStringifyPipe],
})
export class PayTypeStringifyPipeModule {}
