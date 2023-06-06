import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    return (
        <div className="min-h-screen grid place-content-center ">
            <h1 className="text-4xl font-bold text-center mb-8">Oops!</h1>
            <p className="text-2xl text-center mb-3">Sorry, an unexpected error has occured.</p>
            <p className="text-2xl text-center mb-3 font-semibold text-slate-400">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage;