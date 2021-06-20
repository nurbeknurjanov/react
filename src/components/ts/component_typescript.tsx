import React, {useState, useRef, MouseEvent} from 'react';



interface propsType1{
    firstValue:number
}
//type propsType = {firstValue:number;};

//React.FC<propsType1> - это означает что 1) это должна быть функция реакт, потом пропсы propsType1
//export const ComponentTypescript = ({firstValue}:propsType1)=>{
export const ComponentTypescript: React.FC<propsType1> = ({firstValue})=>{//тут вообще то строится тело функции

    const ref = useRef<HTMLInputElement>(null);
    //const [count, setCount] = useState(firstValue);
    const [count, setCount] = useState<number>(firstValue);

    //const clickEventHandler=(event:MouseEvent)=>{
    const clickEventHandler=(event:MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setCount(count+1);
        ref.current!.value=String(count+1);
    }
    return <div>
        <button onClick={clickEventHandler}>
            {count}
        </button>
        <input type='text' ref={ref} />
    </div>
}
export const Container = ()=><ComponentTypescript firstValue={1} />;




/*interface PropsInterface<Ti> {
    items: Ti[];
    renderItem: (item: Ti) => React.ReactNode;
}
export function List<Ty>(props: PropsInterface<Ty>) {
    const { items, renderItem } = props;
    return (
        <div>
            {items.map(renderItem)}
        </div>
    );
}
export const ListContainer = ()=>{
    return <List<string>
        items={['a','b']}
        renderItem={el=> <div key={el}>{el}</div>} />;
    //renderItem={(el:string):React.ReactNode=> <div key={el}>{el}</div>}
}*/

/*export const Hack = (props:{})=>{
    return <div>123</div>
}
export const Container = ()=><Hack />;*/

/*export const ByProps = (props:{test:string, test2:number})=>{
    return <div>{props.test}</div>
}
export const Container = ()=><ByProps test={'string'} test2={123} />;*/


/*interface Pr {
    qwe:number,
    ren(st:number):string
}
for hack we can do props:any
export const Test = (props:Pr)=>{
    return <div>{props.ren(props.qwe)}</div>
}
export const Container = ()=><Test qwe={23} ren={(st)=>String(st)} />;*/





/*type MyProps = {
    pro:string
}
type MyState = {
    count: number;
};
export class Test extends React.Component<MyProps, MyState>//тут идет обыкновенный вызов, а не обявление
{
    /!*state:MyState = {
        count:1
    }*!/
    state:MyState;
    constructor(props:MyProps) {
        super(props);
        this.inc = this.inc.bind(this);

        this.state = {
            count:1
        }
    }
    inc(){
        this.setState(oldState=>({count:oldState.count+1}));
        //this.setState({count:this.state.count+1});
    }
    render() {
        return <div>
            pro = {this.props.pro}
            <br/>
            <button onClick={this.inc}>{this.state.count}</button>
        </div>;
    }
}
export const Container = ()=><Test pro={'pro'}/>;*/

