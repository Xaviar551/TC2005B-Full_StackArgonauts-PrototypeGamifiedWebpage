export default class EmployeeController {
  constructor(employee) {
    this.employee = employee
  }
  // {id: number, Nombre: string, ....}
  async get (params) {
    return this.employee.fetch(params)
  }

}