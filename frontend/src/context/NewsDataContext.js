import { createContext, useState } from "react";

export const NewsData = createContext()

export const NewsDataContext = ({children}) => {

    const [newsData, setNewsData] = useState()

    return (
        <NewsData.Provider value={{newsData, setNewsData}}>
            {children}
        </NewsData.Provider>
    )
}
