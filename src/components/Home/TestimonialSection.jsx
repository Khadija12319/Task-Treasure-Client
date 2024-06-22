import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../App.css'


import { Keyboard, Pagination, Navigation } from 'swiper/modules';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: 'Great experience with the task completion. Highly recommend!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      quote: 'Excellent customer service and coin delivery. Will post jobs again!',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      quote: 'The work and earning money system exceeded my expectations. Very satisfied.',
    },
    {
      id: 4,
      name: 'Emily Brown',
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
      quote: 'User-friendly interface and great value for money.',
    },
  ];

  return (
    <div className='bg-[#EDE8F5]'>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">What Our Users Say</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper bg-[#EDE8F5]"
      >
        {testimonials.map(testimonial => (
          <SwiperSlide key={testimonial.id} className='bg-[#EDE8F5]'>
            <div className="bg-[#EDE8F5] p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500">Verified Worker</p>
                </div>
              </div>
              <p className="text-lg text-gray-700">{testimonial.quote}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default TestimonialSection;

