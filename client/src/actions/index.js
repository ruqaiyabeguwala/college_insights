import { SET_ALERT,REMOVE_ALERT} from "./types"
import axios from "axios";
import uuid from "uuid"
export * from "./userAction"
export * from "./studentAction"
export * from "./searchAction"

//set alert for transactions
export const setAlert=(msg,type)=>dispatch=>{
    const id = uuid.v4();
    dispatch({
        type:SET_ALERT,
        payload:{type,msg,id}
    })

    setTimeout(
        ()=>dispatch({
           type:REMOVE_ALERT,
           payload:id
        }),5000
        
        )
}

