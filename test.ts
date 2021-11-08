export interface Duplicate {
  bar: number
}
export const Duplicate = 123;
type bob5 = {}
export { bob5 }
export type atype = number
interface baka {}
export { baka }
export * from './star-module';
export * from './bob';
export const lol = 123;
export function lol() {}
export class hi {}

export function whatever() {}
function whatever2() {}
export { whatever2 }

const bob2 = 2;
const bob = 1234;
export { bob, bob2 as bob3 };

export const { name1, name2: bar, abc, five: guys } = o;

export let name1, name2, nameN;
export const guys = 5;
