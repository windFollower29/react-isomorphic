import mobx, { observable, action } from 'mobx'

class CounterStore {
  @observable count = 0;

  constructor() {
    // mobx.autorun(() => console.log(`------${this.count}------`));
  }

  // @computed get completedTodosCount() {
  //   return this.todos.filter(
  //   todo => todo.completed === true
  // ).length;
  // }

  @action
  increase () {
    this.count++
  }

  @action
  decrease () {
    this.count--
  }
}

const counterStore = new CounterStore()

export default counterStore