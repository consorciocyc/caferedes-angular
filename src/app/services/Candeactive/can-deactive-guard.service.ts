import {Injectable, Component} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import {Observable} from 'rxjs/Observable';
import swal from "sweetalert2";
export interface CanComponentDeactivate{

    canDeactivate:()=>Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{


canDeactivate(component: CanComponentDeactivate){

    return component.canDeactivate ? component.canDeactivate():true;


}

}
