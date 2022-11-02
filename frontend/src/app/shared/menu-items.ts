import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
}

const MENUITEMS = [
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer'
    }
];

@Injectable ()
    export class MenuItems {
        getMenu(): Menu[] {
            return MENUITEMS;
        }
    }
