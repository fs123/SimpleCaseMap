
//A redux action
//http://www.mattgreer.org/articles/typescript-react-and-redux/
export interface Action<T>{
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}

export default Action;

export interface IStage {
    id:        string,
    name:      string,
    processes: Array<IProcess>
}

export interface IProcess {
    id:        string,
    name:      string
}