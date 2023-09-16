import { Counter } from './Counter';
import { Selector } from './Selector';

export const Controls = ({ controls, setControlValues }) => {
  if (controls == null) return null;

  const handleValueChange = (label, value) => {
    const obj = {
      label,
      value,
      labelFirst: true,
    };
    setControlValues((prevState) => {
      // Filtrar el array para quitar el elemento con el mismo label
      const newExtras = prevState?.extras?.filter(
        (item) => item.label !== label,
      );

      if (newExtras) {
        // Pushear el nuevo objeto al array
        newExtras.push(obj);

        return {
          ...prevState,
          extras: newExtras,
        };
      } else
        return {
          ...prevState,
          extras: [obj],
        };
    });
  };

  return (
    <>
      {controls.map((val) => {
        switch (val.type) {
          case 'select-one':
            return (
              <Selector
                label={val.label}
                options={val.options}
                onChange={handleValueChange}
              />
            );
          case 'counter':
            return (
              <Counter
                min={val.min}
                max={val.max}
                label={val.label}
                onChange={handleValueChange}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};
