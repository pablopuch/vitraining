import React from 'react';
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
    },
    {
        author: "Sara Hernández",
        quote:
            "Totalmente recomendable. Te sientes como en casa desde el primer día. Te motivan a la vez que tienen en cuenta los límites individuales.",
    },
    {
        author: "Antonio Jesús Velázquez Lleó",
        quote:
            "Fantástico, un centro de entrenamiento con una dinámica muy buena que favorece la adherencia al ejercicio físico.",
    },
];

export default function TestimonialsSwiper() {
    return (
        <div className="max-w-4xl mx-auto px-4 relative">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                navigation
                loop={true}
                autoHeight={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="testimonials-swiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="testimonial">
                            <p className="text-lg md:text-xl text-gray-700 font-medium italic mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>
                            <footer className="text-[#ce2c3b] font-bold text-lg">
                                – {testimonial.author}
                            </footer>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
} 