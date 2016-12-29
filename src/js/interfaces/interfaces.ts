export interface IStage {
    id:        string,
    name:      string,
    processes: Array<IProcess>
}

export interface IProcess {
    id:        string,
    name:      string
}