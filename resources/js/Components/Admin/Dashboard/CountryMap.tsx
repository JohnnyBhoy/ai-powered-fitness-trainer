// react plugin for creating vector maps
import Loading from "@/Components/Loading";
import { useDashboardStore } from "@/stores/dashboardStore";
import { VectorMap } from "@react-jvectormap/core";
import { usAea } from "@react-jvectormap/unitedstates";
import { useEffect, useState } from "react";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

interface Marker {
  latLng: [number, number];
  name: string;
}

const openCageKey = import.meta.env.VITE_OPENCAGE_API_KEY as string;
const OPENCAGE_URL = import.meta.env.OPEN_CAGE_URL as string;

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  const { data } = useDashboardStore();
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    if (!data?.traineesPerStates || data.traineesPerStates.length === 0) return;

    const fetchCoordinates = async () => {
      try {
        const results = await Promise.all(
          data.traineesPerStates.map(async (item: { state: string; total: number }) => {
            const res = await fetch(
              `${OPENCAGE_URL}?q=${encodeURIComponent(item.state)},USA&key=${openCageKey}`
            );
            const json = await res.json();

            const geometry = json?.results?.[0]?.geometry;
            const formatted = json?.results?.[0]?.formatted;

            if (geometry && formatted) {
              return {
                latLng: [geometry.lat, geometry.lng],
                name: `${formatted} (${item.total} trainees)`,
              };
            }
            return null;
          })
        );

        const validMarkers = results.filter(Boolean);
        setMarkers(validMarkers);
      } catch (error) {
        console.error("Error fetching state coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [data, openCageKey]);

  if (markers?.length == 0) return (
    <div className="grid place-items-center w-full mt-[5rem]">
      <Loading text="Loading map..." />
    </div>
  );

  return (<VectorMap
    map={usAea}
    backgroundColor="transparent"
    markerStyle={{
      initial: {
        fill: "#465FFF",
        r: 6, // radius of markers
      } as any,
    }
    }
    markersSelectable={true}
    markers={
      markers.map((m) => ({
        ...m,
        style: {
          fill: "#465FFF",
          borderWidth: 1,
          borderColor: "white",
          stroke: "#383f47",
        },
      }))
    }
    zoomOnScroll={false}
    zoomMax={12}
    zoomMin={1}
    zoomAnimate={true}
    zoomStep={1.5}
    regionStyle={{
      initial: {
        fill: mapColor || "#D0D5DD",
        fillOpacity: 1,
        fontFamily: "Outfit",
        stroke: "none",
      },
      hover: {
        fillOpacity: 0.7,
        cursor: "pointer",
        fill: "#465fff",
        stroke: "none",
      },
      selected: { fill: "#465FFF" },
    }
    }
    regionLabelStyle={{
      initial: { fill: "#35373e", fontWeight: 500, fontSize: "13px" },
    }}
  />
  );
};

export default CountryMap;
