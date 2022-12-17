import React from "react";

function Page(props: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen justify-center ">
        {props.children}
        </div>
    );
    }

export default Page;