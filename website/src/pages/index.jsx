import React from 'react';
import {Home} from '../components';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styled from 'styled-components';
import Layout from '@theme/Layout';

const HeroExample = styled.div`
  background-image: url(images/hero.jpg);
  background-size: cover;
  background-position: center;
  height: 100%;
`;

const TextContainer = styled.div`
  max-width: 800px;
  padding: 64px 112px;
  width: 70%;
  font-size: 14px;

  h2 {
    font: bold 32px/48px;
    margin: 24px 0 16px;
    position: relative;
  }
  h3 {
    font: bold 16px/24px;
    margin: 16px 0 0;
    position: relative;
  }
  h3 > img {
    position: absolute;
    top: -4px;
    width: 36px;
    left: -48px;
  }
  hr {
    border: none;
    background: #e1e8f0;
    height: 1px;
    margin: 24px 0 0;
    width: 32px;
    height: 2px;
  }
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 48px 48px 48px 80px;
  }
`;

export default function IndexPage() {
  const baseUrl = useBaseUrl('/');

  return (
    <Layout title="Home" description="react-map-gl">
      <Home HeroExample={HeroExample}>
        <div style={{position: 'relative'}}>
          <TextContainer>
            <h2>
              react-map-gl makes using Mapbox GL JS in React applications easy.
            </h2>
            <hr className="short" />

            <h3>
              <img src={`${baseUrl}images/icon-react.svg`} />
              React Integration
            </h3>
            <p>
              Use Mapbox GL JS Map as a fully controlled reactive component.
            </p>

            <h3>
              <img src={`${baseUrl}images/icon-layers.svg`} />
              Extensible
            </h3>
            <p>
              Comes with additional React interfaces such as context and hooks
              to support custom components.
            </p>

            <h3>
              <img src={`${baseUrl}images/icon-high-precision.svg`} />
              Part of vis.gl's Framework Suite
            </h3>
            <p>
              Use together with e.g. <a
                href="https://deck.gl/"
                target="_blank"
                rel="noopener noreferrer">
                deck.gl</a> to render performant and compelling 2D and 3D
                WebGL visualizations on top of your Mapbox GL JS based maps.
            </p>
          </TextContainer>
        </div>
      </Home>
    </Layout>
  );
}
