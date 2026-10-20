export const createStore = (initialState: any) => {
    
    let listeners: Function[] = [];
    
    const clonedInitState = structuredClone(initialState);
    let state = clonedInitState;


    function updateState(key: string, value: any) {
        let clonedSliceState;

        if(value && typeof(value) === "object"){
            clonedSliceState = structuredClone(value);
        }else{
            clonedSliceState = value
        }

        state[key] = clonedSliceState;
        
        listeners.forEach((listener) => {
            listener();
        });

    }

    function getState(){
        return structuredClone(state)
    }

    function addListener(func: Function){
        listeners.push(func);
        let executed = false;

        return function cancel(){
            if(!executed){
                const updatedListeners = listeners.filter(fun => fun !== func);
                listeners = updatedListeners;
                executed = true;
            }
        }
    }

    return {
        getState,
        updateState,
        addListener
    }
}