import React, { useState, useRef } from 'react';
import { TiLocationArrow } from "react-icons/ti";

// Modal Component
const Modal = ({ children, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        onClick={e => e.stopPropagation()} // supaya klik di dalam modal tidak close
        className="relative max-w-lg rounded-lg bg-white p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl backdrop-blur-sm"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

// BentoCard Component dengan modal detail
export const BentoCard = ({ src, title, description, isComingSoon, detailContent }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const [showDetail, setShowDetail] = useState(false);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    const openDetail = () => setShowDetail(true);
    const closeDetail = () => setShowDetail(false);

    return (
        <div className='relative size-full rounded-md overflow-hidden'>
            <video
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
                <div>
                    <h1 className='bento-title special-font'>
                        {title}
                    </h1>
                    {description && (
                        <p
                            className="mt-3 max-w-64 text-xs md:text-base text-white"
                            style={{
                            textShadow: "0 0 8px #00ffff, 0 0 12px rgb(6, 98, 185)"
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={openDetail}
                        className='border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 uppercase text-white/20'
                    >
                        <div
                            className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className='relative z-20' />
                        <p className='relative z-20'>More details</p>
                    </div>
                )}
            </div>

            {/* Modal detail */}
            {showDetail && (
                <Modal onClose={closeDetail}>
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <div className="text-gray-700">
                        {detailContent || "Detail informasi belum tersedia."}
                    </div>
                </Modal>
            )}
        </div>
    );
};

// BentoTilt tetap sama, aku skip buat ringkas

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};



const Features = () => (
    <section className="bg-black pb-52">
        <div id='features' className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-circular-web text-lg text-blue-50">
                Exploring the Universe
                </p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                Discover the vast wonders of space, from distant galaxies to mysterious nebulae, in an ever-expanding cosmic journey.
                </p>
            </div>

            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                <BentoCard
                    src="-"
                    title={<><b>C</b>OMING<b>S</b>OON</>}
                    description="next"
                    isComingSoon
                    detailContent={
                        <>
                            <p>Coming Soon.</p>
                            <ul className="list-disc ml-5 mt-3">
                                <li>NO vid</li>
                                <li>Azmi Fadhil F 😎</li>
                                <li></li>
                            </ul>
                        </>
                    }
                />
            </BentoTilt>

            <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard
                        src="videos/feature-2.mp4"
                        title={<><b>R</b>oc<b>k</b>et <b>S</b>t<b>a</b>rship</>}
                        description="A powerful and fully reusable rocket by SpaceX, designed for missions to the Moon and Mars."
                        isComingSoon
                        detailContent={
                            <>
                                <p>Rocket Starship adalah roket buatan SpaceX yang dapat digunakan kembali sepenuhnya, untuk misi ke Bulan dan Mars.</p>
                                <ul className="list-disc ml-5 mt-3">
                                    <li>Desain terbaru dan kuat</li>
                                    <li>Mampu membawa kargo besar dan manusia</li>
                                    <li>Tujuan eksplorasi planet dan bulan</li>
                                </ul>
                            </>
                        }
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard
                        src="videos/feature-3.mp4"
                        title={<><b>E</b>a<b>r</b>th</>}
                        description="Earth is the third planet from the Sun and the only one known to support life."
                        isComingSoon
                        detailContent={
                            <>
                                <p>Bumi adalah planet ketiga dari Matahari dan satu-satunya yang diketahui mendukung kehidupan.</p>
                                <ul className="list-disc ml-5 mt-3">
                                    <li>Memiliki atmosfer yang mendukung kehidupan</li>
                                    <li>Permukaan terdiri dari air dan daratan</li>
                                    <li>Rumah bagi jutaan spesies hidup</li>
                                </ul>
                            </>
                        }
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                    <BentoCard
                        src="videos/feature-4.mp4"
                        title={<><b>A</b>s<b>t</b>r<b>o</b>n<b>a</b>u<b>t</b></>}
                        description="are people trained to travel and work in space. They explore, do experiments, and help us learn more about the universe."
                        isComingSoon
                        detailContent={
                            <>
                                <p>Astronot adalah orang yang dilatih untuk bepergian dan bekerja di luar angkasa. Mereka melakukan eksplorasi dan eksperimen.</p>
                                <ul className="list-disc ml-5 mt-3">
                                    <li>Melakukan penelitian di luar angkasa</li>
                                    <li>Mengoperasikan peralatan ruang angkasa</li>
                                    <li>Memperluas pengetahuan manusia tentang alam semesta</li>
                                </ul>
                            </>
                        }
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <div className="flex size-full flex-col justify-between bg-violet-300 p-5 rounded-md">
                        <h1 className="bento-title special-font max-w-64 text-black">
                            M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                        </h1>
                        <TiLocationArrow className="m-5 scale-[5] self-end" />
                    </div>
                </BentoTilt>

                <BentoTilt className="bento-tilt_2 rounded-md overflow-hidden">
                    <video
                        src="videos/feature-5.mp4"
                        loop
                        muted
                        autoPlay
                        className="size-full object-cover object-center rounded-md"
                    />
                </BentoTilt>
            </div>
        </div>
    </section>
);

export default Features;
