import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "./auth.service"
import { User } from "src/app/dashboard/pages/users/models";
import { environment } from "src/environments/environment.local";
import { MockProvider } from "ng-mocks";
import { Router } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { State } from 'src/app/store/auth/auth.reducer';
import { selectAuthUser } from "src/app/store/auth/auth.selectors";


describe('AuthService', () => {
    let authService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MockProvider(Router), 
            provideMockStore<State>({
                initialState: {
                    authUser: null,
                },
                selectors: [
                    {
                        selector: selectAuthUser,
                        value: null,
                    },
                 ],
            }),
          ],
      });

        authService = TestBed.inject(AuthService),
        httpController = TestBed.inject(HttpTestingController)
    });

    it('AuthService should be defined', () => {
        //Sirve para evaluar que no sea null ni undefined
        expect(authService).toBeTruthy();
    });

    it('Debe establecer un usuario autenticado al hacer login', () => {
        const USER_MOCK: User = {
            id: 1,
            email: 'mail@mail.com',
            lastName: 'lastName',
            name: 'name',
            role: 'ADMIN',
            token: 'cfercec564561ede51ew56wgf221',
            password: '123456',
        };

        authService.login({
            email: USER_MOCK.email,
            password: USER_MOCK.password,
        });

        httpController.expectOne({
            method: 'GET',
            url: `${environment.baseUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`,
        }).flush([USER_MOCK]);

        authService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
                expect(authUser).toEqual(USER_MOCK);
            },
        });
    });
});