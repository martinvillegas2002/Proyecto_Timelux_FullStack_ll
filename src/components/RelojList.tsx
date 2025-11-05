import { RelojProps } from "../interfaces/reloj.interfaces";
import { RelojCard } from "./RelojCard";

// Definimos las Props que espera este componente
interface Props {
  relojes: RelojProps[];
}

export const RelojList = ({ relojes }: Props) => {
  return (
    <>
      {
        relojes.map((reloj) => (
          <RelojCard key={reloj.id} reloj={reloj} />
        ))
      }
    </>
  );
}

/*Explicación (para el profe): "Profe, este 
es el componente RelojList. Este componente sí es
'inteligente' en cuanto a renderizado. Recibe el 
array completo de relojes como una prop. Luego, 
usa la función .map() de JavaScript para iterar (recorrer) 
esa lista. Por cada reloj en el array, renderiza un componente 
RelojCard y le pasa el objeto reloj individual como prop.*/