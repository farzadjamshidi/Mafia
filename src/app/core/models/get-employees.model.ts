import { Employee } from "./employee.model";

export class GetEmployeesRequest
{
}

export class GetEmployeesResponse extends Array<Employee>
{
}
