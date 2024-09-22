import Link from "next/link.js";
import styled from "styled-components";
import { StyledImage } from "./StyledImage.js";

const Article = styled.article`
  border: 2px solid black;
  border-radius: 0.9rem;
  padding: 0.5rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 200px; /* Höhe für größere Bildschirme */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto; /* Auf kleineren Bildschirmen dynamische Höhe */
  }
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
  text-align: center;
`;

const StyledFigcaption = styled.figcaption`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const LocationText = styled.p`
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Card({ name, image, location, id }) {
  return (
    <Article>
      <Figure>
        <ImageContainer>
          <StyledImage
            src={image}
            alt={name}
            layout="responsive" /* Das Layout wird nun responsiv behandelt */
            width={700} /* Stelle hier eine Breite ein */
            height={500} /* Stelle hier eine Höhe ein */
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        </ImageContainer>
        <StyledFigcaption>{name}</StyledFigcaption>
        <LocationText>Location: {location}</LocationText>
      </Figure>
      <Link href={`places/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  );
}
