import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page.component';
import {TuiInputCountModule, TuiTabsModule} from '@taiga-ui/kit';
import {TuiSvgModule} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {NavModule} from '../../components/nav/nav.module';
import {MainPageRoutingModule} from './main-page-routing.module';

@NgModule({
    declarations: [MainPageComponent],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        TuiInputCountModule,
        FormsModule,
        TuiSvgModule,
        TuiTabsModule,
        NavModule,
    ],
})
export class MainPageModule {
}
