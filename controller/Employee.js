export default class EmployeeController {
  constructor(employee) {
    this.employee = employee
  }
  // {id: number, Nombre: string, ....}
  async get_ID_creator_proyect (params) {
    return this.employee.ID_creator_proyect(params)
  }
  async get_Issue_total(){
    return this.employee.Issue_status();
  }
  async get_not_closed(){
    return this.employee.not_closed();
  }
}