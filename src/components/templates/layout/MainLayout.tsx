import React from 'react'
import Header from '../../organisms/header/Header'

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 bg-gray-100">
                {children}
            </main>
            <footer className="bg-dark-purple text-white text-center py-4">
                &copy; 2024 Watch Wise
            </footer>
        </div>
    )
}

export default MainLayout