import { Button } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';

interface WelcomeProps {
  onDone: () => void;
}

export const WelcomeScreen = (props: WelcomeProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nav = useNavigate();

  const slides = [
    {
      title: '¡Bienvenido a',
      subTitle: 'Agenda Fácil! 🎉',
      description:
        'Reserva tus citas en peluquerías, canchas deportivas y más, todo en un solo lugar.',
    },
    {
      title: 'Sistema de puntos de fidelidad',
      description:
        'Gana puntos cada vez que realices una reserva y canjéalos por descuentos y beneficios.',
    },
    {
      title: 'Control total sobre tus reservas',
      description:
        'Modifica el estado de tus reservas según tus necesidades, con total flexibilidad.',
    },
  ];

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <AnimatedFromLeft delay={0.1}>
        <h1>{slides[currentSlide].title}</h1>
      </AnimatedFromLeft>
      <AnimatedFromLeft delay={0.3}>
        {slides[currentSlide].subTitle && (
          <h1>{slides[currentSlide].subTitle}</h1>
        )}
      </AnimatedFromLeft>
      <AnimatedFromLeft delay={0.6}>
        <p>{slides[currentSlide].description}</p>
      </AnimatedFromLeft>
      <AnimatedFromLeft delay={1}>
        {currentSlide > 0 && <Button onClick={goToPrevSlide}>Anterior</Button>}
        {currentSlide < slides.length - 1 && (
          <Button
            type="primary"
            style={{ margin: '10px' }}
            onClick={goToNextSlide}
          >
            Siguiente
          </Button>
        )}
        {currentSlide === slides.length - 1 && (
          <Button
            type="primary"
            style={{ margin: '10px' }}
            onClick={() => props.onDone()}
          >
            Comenzar
          </Button>
        )}
      </AnimatedFromLeft>
    </div>
  );
};
