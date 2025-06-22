import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
    {
        author: "Alicia G.A.",
        quote:
            "Este es mi cuarto mes entrenando en Vitraining y estoy muy contenta. Las clases son en grupos reducidos y consisten en una combinación de ejercicios de fuerza y resistencia. Además, los entrenadores siempre te ayudan a realizar correctamente los ejercicios o los adaptan según tu condición física. Me apunté simplemente por probar algo diferente los meses de verano, pero, desde el primer día, me sentí supermotivada y con ganas de continuar gracias al buen ambiente que hay en el centro. Otra cosa positiva del centro es la flexibilidad de horarios.",
        rating: 5,
    },
    {
        author: "Sara Hernández",
        quote:
            "Totalmente recomendable. Te sientes como en casa desde el primer día. Te motivan a la vez que tienen en cuenta los límites individuales.",
        rating: 5,
    },
    {
        author: "Antonio Jesús Velázquez Lleó",
        quote:
            "Fantástico, un centro de entrenamiento con una dinámica muy buena que favorece la adherencia al ejercicio físico.",
        rating: 5,
    },
];

const GoogleLogo = () => (
    <div className="google-logo">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
    </div>
);

const StarRating = ({ rating }) => (
    <div className="flex justify-center items-center">
        {[...Array(rating)].map((_, i) => (
            <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .489l2.939 5.976 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
        ))}
    </div>
);

const TestimonialCard = ({ testimonial, onToggle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const quoteRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (quoteRef.current) {
                const hasOverflow = quoteRef.current.scrollHeight > quoteRef.current.clientHeight;
                if (hasOverflow !== isOverflowing) {
                    setIsOverflowing(hasOverflow);
                }
            }
        };

        const timeoutId = setTimeout(checkOverflow, 100);
        window.addEventListener('resize', checkOverflow);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [isOverflowing, testimonial.quote]);

    const handleToggleClick = () => {
        setIsExpanded(!isExpanded);
        if (onToggle) {
            setTimeout(onToggle, 50);
        }
    };

    return (
        <div className="testimonial">
            <GoogleLogo />
            <div className="testimonial-body">
                <p ref={quoteRef} className={`quote-text ${isExpanded ? 'expanded' : ''}`}>
                    "{testimonial.quote}"
                </p>
                {isOverflowing && (
                    <button onClick={handleToggleClick} className="read-more-btn">
                        {isExpanded ? 'Ocultar' : 'Leer más'}
                    </button>
                )}
            </div>
            <footer className="testimonial-footer">
                <StarRating rating={testimonial.rating} />
                <span className="author-name">– {testimonial.author}</span>
            </footer>
        </div>
    );
};

export default function TestimonialsSwiper() {
    const swiperRef = useRef(null);

    const handleCardToggle = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.updateAutoHeight(300);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 relative">
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, Pagination, Navigation]}
                autoHeight={true}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                className="mySwiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialCard testimonial={testimonial} onToggle={handleCardToggle} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
} 