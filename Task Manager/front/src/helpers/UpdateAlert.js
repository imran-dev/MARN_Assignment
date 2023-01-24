import Swal from "sweetalert2";
import {UpdateTaskStatusRequest} from "../APIRequest/APIRequest";

export function UpdateTask(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {New: 'New', Completed: 'Completed', Progress: 'Progress', Canceled: 'Canceled'},
        inputValue:status,
    }).then((result)=>{
        return UpdateTaskStatusRequest(id, result.value).then((res)=>{
            return res;
        })
    })
}