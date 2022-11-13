export class Ingredient {
  id: number;
  constructor(public name: string, public amount: number) {
    this.id = Math.random() * 10000;
  }
}
