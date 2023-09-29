import { FadeFromTop } from '../../../animations/FadeFromTop';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';

export const Store = () => {
  return (
    <div style={{ padding: '', textAlign: 'center' }}>
      <FadeFromTop>
        <BackNavigationHeader title={'Tienda'} />
      </FadeFromTop>
      <FadeFromTop>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <img
            src="https://img.icons8.com/external-justicon-lineal-justicon/64/external-working-working-from-home-justicon-lineal-justicon.png"
            alt="Trabajando en ello"
            style={{ width: '64px', marginBottom: '20px' }}
          />
          <h4>¡Estamos mejorando para ti!</h4>
          <p>
            Muy pronto, nuestra tienda ofrecerá decoraciones exclusivas para que
            puedas personalizar tu perfil a tu gusto.
          </p>
          <p>
            Y eso no es todo. Estamos colaborando con diversos locales para
            traerte promociones especiales. Podrás aprovechar estas ofertas
            utilizando tus puntos de fidelidad.
          </p>
          <p>
            ¡Gracias por tu paciencia y mantente atento a las próximas
            actualizaciones!
          </p>
        </div>
      </FadeFromTop>
    </div>
  );
};
