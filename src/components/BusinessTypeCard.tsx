interface Props {
  name: string;
  icon: string;
}

export const BusinessTypeCard = (val: Props) => {
  return (
    <div
      id={val.name}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        borderRadius: '12px',
        width: 'calc(50% - 10px)', // Aquí ajustamos el ancho para ser la mitad del contenedor, menos algunos píxeles para el margen
        padding: '10px 20px',
        margin: '5px',
        background: 'white',
      }}
    >
      <img width="32" height="32" src={val.icon} style={{ margin: '0 auto' }} />
      <p
        style={{
          color: 'black',
          fontSize: '14px',
          whiteSpace: 'pre-line',
        }}
      >
        {val.name}
      </p>
    </div>
  );
};
