import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    ApiMessagesService,
    ApiReferencesService,
    AuthService,
    ReferencesNavigationService,
} from '@mnr-crm/client/services';
import { ActivatedRoute } from '@angular/router';
import {
    BehaviorSubject,
    catchError,
    filter,
    map,
    merge,
    Observable,
    of,
    Subject,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { Message, User } from '@mnr-crm/shared-models';
import { TUI_IS_MOBILE, TuiDestroyService, tuiIsPresent } from '@taiga-ui/cdk';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@mnr-crm/client/services/user.service';

@Component({
    selector: 'mnr-crm-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit, OnDestroy {
    private requestId: string | undefined = undefined;
    private sseSource: EventSource | undefined = undefined;
    private users$ = new BehaviorSubject<User[] | undefined>(undefined);

    readonly form = new FormGroup({
        message: new FormControl<string>(''),
    });

    readonly messages$ = new BehaviorSubject<Message[]>([]);
    readonly refresh$ = new Subject<void>();
    readonly loadedMessages$: Observable<Message[]> = merge(
        of(null),
        this.refresh$
    ).pipe(
        switchMap(() => this.route.paramMap),
        map((params) => params.get('id')),
        switchMap((id) =>
            id
                ? this.apiMessages.getByReference(id).pipe(
                      switchMap((messages) =>
                          this.apiReferences.getReference<User[]>('users').pipe(
                              tap((users) => this.users$.next(users)),
                              map((users) =>
                                  messages
                                      .reverse()
                                      .map((m) =>
                                          this.mapMessageWithUser(m, users)
                                      )
                              )
                          )
                      )
                  )
                : []
        ),
        catchError(() => of([]))
    );

    constructor(
        @Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
        private readonly route: ActivatedRoute,
        private readonly navService: ReferencesNavigationService,
        private readonly userService: UserService,
        private readonly apiMessages: ApiMessagesService,
        private readonly apiReferences: ApiReferencesService,
        private readonly authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private readonly destroy$: TuiDestroyService
    ) {}

    ngOnInit(): void {
        this.loadedMessages$
            .pipe(takeUntil(this.destroy$))
            .subscribe((messages) => this.messages$.next(messages));

        this.listenMessages();
    }

    ngOnDestroy(): void {
        this.sseSource?.close();
    }

    back(): void {
        this.navService.backToMain();
    }

    submit(event: Event): void {
        event.preventDefault();

        const message = this.form.getRawValue().message?.trim();

        if (!message?.length || !this.requestId) {
            return;
        }

        this.apiMessages
            .sendMessage(this.requestId, message)
            .subscribe(() => this.form.controls.message.setValue(''));
    }

    fileSubmit(event: Event): void {
        const files = (event.target as HTMLInputElement)?.files;

        if (!files?.length || !this.requestId) {
            return;
        }

        this.apiMessages.sendPhoto(this.requestId, files[0]).subscribe();
    }

    fileUpload(): void {
        document.getElementById('file-upload')?.click();
    }

    trackById(idx: number, obj: { id: string } | null): any {
        return obj?.id || idx;
    }

    private listenMessages(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter(tuiIsPresent),
                take(1),
                tap((id) => (this.requestId = id)),
                takeUntil(this.destroy$)
            )
            .subscribe((id) => {
                this.sseSource = new EventSource(`api/messages/sse/${id}`);

                this.sseSource.onmessage = ({ data }) => {
                    this.users$
                        .pipe(filter(tuiIsPresent), takeUntil(this.destroy$))
                        .subscribe((users) => {
                            data = JSON.parse(data) as Message;
                            const message = this.mapMessageWithUser(
                                data,
                                users
                            );
                            const messages = this.messages$.getValue();
                            this.messages$.next([message, ...messages]);
                            this.cdRef.detectChanges();
                            setTimeout(() => this.scrollToBottom());
                        });
                };
            });
    }

    private mapMessageWithUser(message: Message, users: User[]): Message {
        return {
            ...message,
            author:
                this.userService.user?.id === message.author
                    ? ''
                    : users.find((u) => u.id === message.author)?.fio || '',
        };
    }

    private scrollToBottom(): void {
        const elementId = 'message-scroll-container';
        const element = document.getElementById(elementId);

        if (!element) return;

        element.scrollTop = element.scrollHeight;
    }
}
