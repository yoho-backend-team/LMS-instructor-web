import { useEffect, useState } from 'react'

export const TabViewResponsive = () => {

    const [TabView, setTabView] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(max-width:900px)").matches
        }
        return false
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width:900px)")

        const handleresize = (event: MediaQueryListEvent) => {
            setTabView(event.matches)
        }

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleresize)
        } else {
            mediaQuery.addListener(handleresize)
        }

        setTabView(mediaQuery.matches)
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleresize)
            } else {
                mediaQuery.removeListener(handleresize)
            }
        };
    }, []);


    return { TabView }
}
