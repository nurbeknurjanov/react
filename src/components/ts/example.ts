//import React from "react";

export const numb = 123;
//export const numb:number = 123;


/*interface Box<Type> {
    contents: Type;
}
const b: Box<string> = {
    contents: "hello world"
};*/


/*type numb = number;
const n:numb = 12;*/
/*type numb<Type> = Type;
const n:numb<number> = 12;*/
/*type numb<Type> = {
    cont:Type
};
const n:numb<number> = {
    cont:123
};*/



/*const someFunct:(a:number)=>string = function (a) {
    return String(a);
}*/

/*type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;*/


/*
function warnUser1(): string {
    return "This is my warning message";
}
*/


/*
type ManType = { makeGreeting(name:string): string; color?:string };
const Man: ManType = {
    makeGreeting(name:string):string{
        return "hello, "+name+" world";
    }
}
interface ManInterface {
    makeGreeting(name: string): string;
    color?: string;
}
const Man2:ManInterface = {
    color: 'red',
    makeGreeting(name) {
        return "Hi "+name;
    }
}
let result = Man.makeGreeting('Alan');
result = Man2.makeGreeting('Alan');
class JsClass
{
    makeGreeting(name:string){
        return "Hey from class "+name;
    }
}
declare module JsClass {
    export class JsClass {
        public makeGreeting1(name: string): string;
    }
}
declare class DeclaredMe {
    public makeGreeting(name: string): string;
}
const m:DeclaredMe = new JsClass();
const m:JsClass = new JsClass();

result = m.makeGreeting('Nurbek');
let result = myLib.makeGreeting();
console.log("The computed greeting is:" + result);
let count = myLib.numberOfGreetings;*/



/*type myFunc = (source: number)=> string;
interface myFunc1 {
    (source: number): string;
}
const f:myFunc = (source)=>String(source);
const f:(source:number)=>string = (source)=>String(source);
const f2:myFunc1 = (source)=>String(source);
const selfBody = (source:number):string=>String(source);
const selfBody2 = function(source:number):string{
    return String(source);
};*/

/*interface UserInterface {
    name: string;
    id: number;
    ping(hi:string): void;
}
class User  implements UserInterface{
//class User{
    name: string;
    id: number;
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
    public ping(hi:string){
        console.log(hi)
    }
    private qwe(){

    }
}
const user:UserInterface = new User("Murphy", 1);
console.log(user);*/



/*constructor(props) {
    super(props);
}*/

/*
interface Interface<Type> {
}
function identity(arg:string):string{
    return arg;
}
function identity1<Type>(arg: Type): Type {
    return arg;
}
const r= identity1<number>(12);
class Cl<Type>{
    contents:Type;
    constructor(cont:Type) {
        this.contents = cont;
    }
}
const c = new Cl<string>('string');

class Ex extends Cl<string>
{
}
const c = new Ex('string');
*/


//ТУТ ОЧЕНЬ ВАЖНО ПОНЯТЬ
/*type propsType = {
    count:number
}
type func<T> = (props:T)=>string;
const f:func<propsType> = (props)=>{
    return String(props);
}*/

/*type cl<T> = {
    name:T;
}
const exemplyar:cl<string> = {
    name:'sdf'
}*/



//const f:(s:number)=>string = (source)=>String(source);
