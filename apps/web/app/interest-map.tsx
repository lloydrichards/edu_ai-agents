"use client";
import { generateMapCoordinate } from "@agent/ai/struct";
import { LoaderCircle } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Map, { MapRef, Marker, Popup } from "react-map-gl/maplibre";

interface Coord {
  lat: number;
  lon: number;
  name: string;
  description: string;
}

export const InterestingMap = () => {
  const map = useRef<MapRef>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [question, setQuestion] = useState<string | null>(null);

  const [popupInfo, setPopupInfo] = useState<Coord | null>(null);
  const [coords, setCoords] = useState<Coord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!question) return;

      setLoading(true);
      const result = await generateMapCoordinate(question);
      setLoading(false);
      map.current?.flyTo({
        center: [result.center.lon, result.center.lat],
        zoom: 2,
      });
      setCoords(result.coords);
    };
    fetchData();
  }, [question]);

  const pins = useMemo(
    () =>
      coords.map((place, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={place.lon}
          latitude={place.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(place);
          }}
        >
          <Pin />
        </Marker>
      )),
    [coords]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setQuestion(inputValue);
  };

  return (
    <div className="flex flex-col w-full h-160 items-stretch justify-center border-2 rounded-2xl p-2">
      <h1 className="text-4xl font-bold p-6">Interesting Map Bot</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mx-6 mb-4">
        <input
          type="text"
          placeholder="Ask me about somewhere..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-4 p-2 border rounded flex-grow"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ask
        </button>
      </form>
      <Map
        ref={map}
        reuseMaps
        initialViewState={{
          zoom: 0.5,
        }}
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lon)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div className="text-secondary">
              {popupInfo.name} | {popupInfo.description}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none",
};

function Pin({ size = 20 }: { size?: number }) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}
