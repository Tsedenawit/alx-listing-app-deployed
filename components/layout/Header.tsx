const Header = () => {
    return (
        <header className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-xl font-bold">StayNest</div>
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded px-4 py-1 mx-4 flex-1"
                />
                <div className="space-x-4">
                    <button className="text-blue-600">Sign in</button>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded">Sign up</button>
                </div>
            </div>

            <nav className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
                {["Rooms", "Mansion", "Countryside", "Villa", "Cabin"].map((type, index) => (
                    <a key={index} href="#" className="hover:text-blue-500">
                        {type}
                    </a>
                ))}
            </nav>
        </header>
    );
};

export default Header;
