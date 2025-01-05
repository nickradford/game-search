import { Header } from "../components/header"

import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">

            <body>
                <div className="w-full h-full bg-gray-900 text-white">
                    <div
                        className="absolute top-0 left-0 right-0 h-64 z-0 overflow-hidden"
                        style={{
                            height: '100%',
                        }}
                    >
                        {/* <ImageTransition src={backgroundUrl} /> */}
                        <div
                            className="absolute top-0 left-0 right-0 h-full z-20"
                            style={{
                                background: 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(26,32,44,1) 5%, rgba(26,32,44,0.5) 100%)',
                            }}
                        />
                    </div>
                    <div className="container min-h-full mx-auto flex flex-col sm:justify-between z-10 relative px-4">
                        <Header />
                    </div>
                    <main>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}