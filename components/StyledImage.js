import Image from "next/image.js";
import styled from "styled-components";

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Für größere Bildschirme: Füllt den Container */

  @media (max-width: 768px) {
    object-fit: contain; /* Für kleinere Bildschirme: Zeigt das gesamte Bild an */
    height: auto; /* Höhe automatisch anpassen */
  }
`;
