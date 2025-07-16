import React from "react"
import { Transition } from "@headlessui/react"
import GoogleMapReact from 'google-map-react';

import Spinner from "../chrome/Spinner"
import SlideOver from "../slideOver/SlideOver"
import Heading from "../chrome/Heading"
import { Aggregation, Queryable } from "../types"

export default function SourceDetailsSideSheet({ data }: { data: any }) {
  const { id, name, tags = [] } = data as Queryable;
  const isAggregation = 'sources' in (data as Queryable);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <SlideOver title='Node'>
      <div className="w-full text-zinc-200">
        <Transition
          appear={true}
          show={true}
          enter="transition duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Heading size={1}>{name}</Heading>
          <p className='text-sm text-zinc-300'>
            {isAggregation ? `aggregation of ${(data as Aggregation).sources.length} sources` : 'source'}
          </p>

          <div>
            <Heading size={3}>Node</Heading>
            <div style={{ height: '300px', width: '300px' }} className="mx-10">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDTSx6zLbg5IR4CjypxLGYs6iDVZdnY37I" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <div
                  lat={59.955413}
                  lng={30.337844}
                >hello</div>
              </GoogleMapReact>
            </div>
          </div>
        </Transition>
      </div>
    </SlideOver>
  )
}

// const AnyReactComponent = ({ text }) => <div>{text}</div>;