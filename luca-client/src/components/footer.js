import styled from 'styled-components';
import { color, device, contentWidth } from '../styles';

const FooterContainer = styled.footer`
  z-index: 999;
  width: 100vw;
  background-color: ${color.white};
  border-top: 1px solid ${color.primaryDark};
  padding: 1rem;
  color: ${color.primary};
  @media ${device.laptop} {
    padding: 2rem 0;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    width: ${contentWidth};
    margin: 0 auto;
  }
`;

const LogoSection = styled.div`
  grid-column: 1 / span 2;
  border-bottom: 1px solid ${color.primaryBorder};
  img {
    padding-top: 18px;
  }
  p {
    color: ${color.primary};
    font-size: 0.85rem;
  }
  @media ${device.laptop} {
    grid-column: 1 / span 1;
    border-bottom: none;
  }
`;

const LinksContainer = styled.div`
  p {
    font-weight: bold;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  svg {
    transition: all 0.2s ease-in-out;
    margin-left: 0.25rem;
  }
  a:hover {
    color: ${color.primaryDark};
    svg {
      margin-left: 0.5rem;
    }
  }
  @media ${device.laptop} {
    border-left: 1px solid ${color.primaryBorder};
    padding-left: 1rem;
    ul {
      flex-direction: row;
      gap: 2rem;
    }
    a {
      word-break: keep-all;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <LogoSection>
          <img src="Luca_logo.png" height='32px' />
          <p>Copyright © 2022 Luca</p>
        </LogoSection>
        <LinksContainer>
          <p>About Luca</p>
          <ul>
            <li>
              <a href='https://github.com/codestates/luca'>Repository</a>
            </li>
            <li>
              <a href='https://github.com/codestates/luca/wiki'>Wiki</a>
            </li>
          </ul>
        </LinksContainer>
        <LinksContainer>
          <p>Contact</p>
          <ul>
            <li>
              <a href='https://github.com/codestates/luca'>김코딩</a>
            </li>
            <li>
              <a href='https://github.com/codestates/luca'>김코딩</a>
            </li>
            <li>
              <a href='https://github.com/codestates/luca'>김코딩</a>
            </li>
            <li>
              <a href='https://github.com/codestates/luca'>김코딩</a>
            </li>
          </ul>
        </LinksContainer>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;