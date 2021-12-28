import * as React from 'react';

export type MapProps = {
  id: string;
};

export default function Map(props: MapProps) {
  return <div id={props.id} />;
}
