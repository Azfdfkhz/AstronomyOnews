import React, { useEffect, useState, useRef } from 'react'
import clsx from 'clsx';
import gsap from "gsap";
import { useWindowScroll } from "react-use"
import { TiLocationArrow } from "react-icons/ti"
import { FiSearch, FiX } from "react-icons/fi";

import Button from './Button';

const navItems = [ "About", "Features", "Contact"];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);
    const searchInputRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (audioElementRef.current) {
            if (isAudioPlaying) {
                audioElementRef.current.play();
                setIsIndicatorActive(true);
            } else {
                audioElementRef.current.pause();
                setIsIndicatorActive(false);
            }
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3,
            ease: "power3.out"
        });
    }, [isNavVisible]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
    };

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        const matchedItem = navItems.find(
            (item) => item.toLowerCase() === value.trim().toLowerCase()
        );

        if (matchedItem) {
            window.location.href = `#${matchedItem.toLowerCase()}`;
            setSearchQuery("");
            setIsSearchOpen(false);
        }
    };

    return (
        <>
            <div
                ref={navContainerRef}
                className='fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6 bg-transparent'
            >
                <header className='absolute top-1/2 w-full -translate-y-1/2'>
                    <nav className='flex w-full items-center justify-between p-4'>
                        <div className='flex items-center gap-7'>
                            <img
                                src="/img/logo.png"
                                alt="logo"
                                className='w-10'
                            />

                            <Button
                                id="product-button"
                                title="Selengkapnya"
                                rightIcon={<TiLocationArrow />}
                                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                            />
                        </div>

                        <div className="flex h-full items-center space-x-4">
                            <div className="hidden md:flex gap-6 items-center">
                                {navItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={`#${item.toLowerCase()}`}
                                        className="nav-hover-btn"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>

                            {/* Search toggle button, always visible */}
                            <button
                                onClick={toggleSearch}
                                aria-label={isSearchOpen ? "Close search" : "Open search"}
                                className="text-white p-2 rounded-md hover:bg-gray-700 transition"
                            >
                                {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
                            </button>

                            {/* Audio toggle */}
                            <button
                                onClick={toggleAudioIndicator}
                                className="ml-4 flex items-center space-x-1 cursor-pointer"
                                aria-label="Toggle audio"
                            >
                                <audio
                                    ref={audioElementRef}
                                    className="hidden"
                                    src="/audio/loop.mp3"
                                    loop
                                />
                                {[1, 2, 3, 4].map((bar) => (
                                    <div
                                        key={bar}
                                        className={clsx("indicator-line", {
                                            active: isIndicatorActive,
                                        })}
                                        style={{
                                            animationDelay: `${bar * 0.1}s`,
                                        }}
                                    />
                                ))}
                            </button>
                        </div>
                    </nav>
                </header>
            </div>

            {/* Search input muncul di bawah navbar, full width */}
            <div
                className={clsx("fixed top-20 inset-x-0 z-40 flex justify-center transition-all duration-300 px-4", {
                    "opacity-100 pointer-events-auto": isSearchOpen,
                    "opacity-0 pointer-events-none": !isSearchOpen,
                })}
            >
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full max-w-xl rounded-md border bg-transparent border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                />
            </div>
        </>
    )
}

export default Navbar;
