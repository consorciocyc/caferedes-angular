import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';

@Injectable()
export class SharedService {
    dataArray: string[] = [];
    public contract_name;
    constructor(private _ListService: ListService) {

    }
    localContract(company, contract) {
        let _company = { 'company': company, 'contract': contract }
        this._ListService.contract(_company).subscribe(
            res => {
                if (res.contract !== null) {
                    localStorage.removeItem('contract');
                    localStorage.removeItem('contract_name');
                    localStorage.setItem('contract_name', res.contract.contract_name);
                    localStorage.setItem('contract', res.contract.idcontract);
                    this.contract_name = localStorage.getItem('contract_name');
                }
            },
            error => {
            }
        )
    }
}