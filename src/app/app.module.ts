import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { FakeDbService } from "app/fake-db/fake-db.service";
import { AppComponent } from "app/app.component";
import { AppStoreModule } from "app/store/store.module";
import { LayoutModule } from "app/layout/layout.module";
import { AuthGuard } from "./_guards";

const appRoutes: Routes = [
    {
        path: "apps",
        loadChildren: "./main/apps/apps.module#AppsModule",
        canActivate: [AuthGuard]
    },
    {
        path: "pages",
        loadChildren: "./main/pages/pages.module#PagesModule"
    },
    {
        path: "ui",
        loadChildren: "./main/ui/ui.module#UIModule"
    },
    {
        path: "documentation",
        loadChildren:
            "./main/documentation/documentation.module#DocumentationModule"
    },
    {
        path: "angular-material-elements",
        loadChildren:
            "./main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule"
    },
    {
        path: "**",
        redirectTo: "apps/dashboards/analytics"
    },
    {
        path: "testt",
        loadChildren: () =>
            import("./main/apps/testt/testt.module").then(m => m.TesttModule)
    },
    {
        path: "images",
        loadChildren: () =>
            import("./main/apps/images/images.module").then(m => m.ImagesModule)
    },
    { path: 'uploadimage', loadChildren: () => import('./main/apps/uploadimage/uploadimage.module').then(m => m.UploadimageModule) },
    { path: 'favoritimages', loadChildren: () => import('./main/apps/favoritimages/favoritimages.module').then(m => m.FavoritimagesModule) },
    { path: 'videos', loadChildren: () => import('./main/apps/videos/videos.module').then(m => m.VideosModule) },
    { path: 'light', loadChildren: () => import('./main/apps/light/light.module').then(m => m.LightModule) }
];

@NgModule({
    declarations: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
