import { visitListAtom } from "@/state/data/visit/visitListAtom"
import { Box } from "@mantine/core"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useAtomValue } from "jotai"

export const Map = () => {
    const visitList = useAtomValue(visitListAtom)

    const containerStyle = {
        width: '100%',
        height: '500px',
    };

    const center = {
        lat: 0, // Set default latitude
        lng: 0, // Set default longitude
    };

    const mapCenter = (visitList?.results && visitList.results.length > 0)
        ? { lat: Number(visitList.results[0].latitude), lng: Number(visitList.results[0].longitude) }
        : center;

    return (
        <Box>
            {visitList && (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
                        {visitList.results.map((visit, index) => (
                            <Marker key={index} position={{ lat: Number(visit.latitude), lng: Number(visit.longitude)}} />
                        ))}
                    </GoogleMap>
                </LoadScript>

            )}
        </Box>
    )
}