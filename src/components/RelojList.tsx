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

