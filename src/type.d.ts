interface ITrail {
    id: number;
  }
  
  type StateReducer = {
    trail: ITrail[];
  };
  
  type ActionReducer = {
    type: string;
    trail: ITrail;
  };
  
  type DispatchType = (args: ActionReducer) => ActionReducer;
  
