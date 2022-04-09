import { Injectable } from '@angular/core';
import { NetworkWrapperHelper } from 'src/app/core/helpers/network-wrapper.helper';
import { IEmployeeRepo } from '../../interfaces/employee.interface';

@Injectable()
export class LocalHostV0EmployeeRepo implements IEmployeeRepo
{

  constructor(
    private networkWrapperHelper: NetworkWrapperHelper
  )
  {
  }

}

