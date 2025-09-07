import Header from "./Header";
import Footer from "./Footer";




function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>

            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6"> {children}</main>
            <Footer />

        </ >
    )
}

export default Layout
