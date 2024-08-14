import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-w-screen bg-custom-gradient">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold text-center text-white">404</h1>
                <h1 className="text-3xl font-bold text-center text-white">Página não encontrada!</h1>
                <Link to="/" className="underline">voltar para home</Link>
            </div>  
        </div>
    );
}
 
export default NotFound;