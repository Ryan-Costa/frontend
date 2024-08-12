import Sidebar from "../sidebar";

const Header = () => {
    return (
        <div className="flex justify-between w-full">
            <img src="/ontime.svg" alt="logo" className="w-20" />

            <Sidebar />
        </div>
    );
}

export default Header;