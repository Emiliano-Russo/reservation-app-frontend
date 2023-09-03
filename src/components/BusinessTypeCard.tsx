interface Props {
  name: string;
  icon: string;
}

export const BusinessTypeCard = (val: Props) => {
  return (
    <div
      id={val.name}
      style={{
        boxShadow:
          ' rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
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
