import React from "react";
 import { Spinner } from "./Spinner";

export const SuspenseFallback = () => {
    return (
        <div 
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Spinner />
        </div>
    );
};