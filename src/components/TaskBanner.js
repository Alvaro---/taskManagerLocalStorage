import React from "react";

export const TaskBanner = props => {
    return (
        <h4 className="bg-primary text-white text-center p-4">
            {props.userName} Aplicacion de tareas - {props.taskItems.filter(t=> !t.done).length} tareas para hacer
            {/*Muestra el nombre enviado y filtra solo las que no esten realizadas para sacar el length*/}
        </h4>
    )
}